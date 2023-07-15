"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEvent = exports.getEvents = void 0;
const Event_1 = require("../entities/Event");
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield Event_1.Event.find();
        return res.status(200).json(events);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ messagge: error.message });
        }
    }
});
exports.getEvents = getEvents;
const getEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const event = yield Event_1.Event.findOneBy({ id: parseInt(id) });
        if (!event)
            return res.status(404).json({ messagge: 'Event Not Found' });
        return res.status(200).json(event);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ messagge: error.message });
        }
    }
});
exports.getEvent = getEvent;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, descripcion, lugar, fechaHora, gps, precio, limite, tipoEvento } = req.body;
    try {
        const event = new Event_1.Event();
        event.nombre = nombre;
        event.descripcion = descripcion;
        event.lugar = lugar;
        event.fechaHora = new Date(fechaHora);
        event.gps = gps;
        event.precio = precio;
        event.limite = limite;
        event.tipoEvento = tipoEvento;
        yield event.save();
        return res.status(201).json(event);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ messagge: error.message });
        }
    }
});
exports.createEvent = createEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const event = yield Event_1.Event.findOneBy({ id: parseInt(id) });
        if (!event)
            return res.status(404).json({ messagge: 'Event Not Found' });
        const eventAux = new Event_1.Event();
        eventAux.nombre = req.body.nombre;
        eventAux.descripcion = req.body.descripcion;
        eventAux.lugar = req.body.lugar;
        if (req.body.fechaHora)
            eventAux.fechaHora = new Date(req.body.fechaHora);
        eventAux.gps = req.body.gps;
        eventAux.precio = req.body.precio;
        eventAux.limite = req.body.limite;
        eventAux.tipoEvento = req.body.tipoEvento;
        yield Event_1.Event.update({ id: parseInt(id) }, eventAux);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ messagge: error.message });
        }
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield Event_1.Event.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ messagge: 'Event Not Found' });
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ messagge: error.message });
        }
    }
});
exports.deleteEvent = deleteEvent;
