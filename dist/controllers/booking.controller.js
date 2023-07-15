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
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBooking = exports.getBookings = void 0;
const Booking_1 = require("../entities/Booking");
const Event_1 = require("../entities/Event");
const User_1 = require("../entities/User");
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield Booking_1.Booking.find({
            relations: { user: true, event: true }
        });
        return res.status(200).json(events);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ messagge: error.message });
        }
    }
});
exports.getBookings = getBookings;
const getBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const booking = yield Booking_1.Booking.findOne({
            where: { id: parseInt(id) },
            relations: ['user', 'event']
        });
        if (!booking)
            return res.status(404).json({ messagge: 'Booking Not Found' });
        return res.status(200).json(booking);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ messagge: error.message });
        }
    }
});
exports.getBooking = getBooking;
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_user, id_event } = req.body;
    try {
        const event = yield Event_1.Event.findOneBy({ id: parseInt(id_event) });
        const user = yield User_1.User.findOneBy({ id: parseInt(id_user) });
        if (event && user) {
            const booking = new Booking_1.Booking();
            booking.user = user;
            booking.event = event;
            booking.precio = event.precio;
            booking.fechaHora = event.fechaHora;
            booking.lugar = event.lugar;
            booking.gps = event.gps;
            const listBooking = yield Booking_1.Booking.find({
                relations: { user: true, event: true },
                where: { event: { id: parseInt(id_event) } }
            });
            if (listBooking.length < event.limite || event.limite == 0) {
                yield booking.save();
                return res.status(201).json(booking);
            }
            else {
                return res.status(409).json({ messagge: 'Limite de Evento Superado' });
            }
        }
        else {
            return res.status(404).json({ messagge: 'User Not Exist or Event Not Exist' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ messagge: error.message });
        }
    }
});
exports.createBooking = createBooking;
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const booking = yield Booking_1.Booking.findOneBy({ id: parseInt(id) });
        if (!booking)
            return res.status(404).json({ messagge: 'Booking Not Found' });
        const { id_user, id_event } = req.body;
        if (id_user && !id_event) {
            const user = yield User_1.User.findOneBy({ id: parseInt(id_user) });
            if (!user)
                return res.status(404).json({ messagge: 'User Not Exist' });
            const booking = new Booking_1.Booking();
            booking.user = user;
            yield Booking_1.Booking.update({ id: parseInt(id) }, booking);
            return res.sendStatus(204);
        }
        if (id_event && !id_user) {
            const event = yield Event_1.Event.findOneBy({ id: parseInt(id_event) });
            if (!event)
                return res.status(404).json({ messagge: 'Event Not Exist' });
            const listBooking = yield Booking_1.Booking.find({
                relations: { user: true, event: true, },
                where: { event: { id: parseInt(id_event) } }
            });
            if (listBooking.length < event.limite || event.limite == 0) {
                const booking = new Booking_1.Booking();
                booking.event = event;
                booking.precio = event.precio;
                booking.fechaHora = event.fechaHora;
                booking.lugar = event.lugar;
                booking.gps = event.gps;
                yield Booking_1.Booking.update({ id: parseInt(id) }, booking);
                return res.sendStatus(204);
            }
            else {
                return res.status(409).json({ messagge: 'Limite de Evento Superado' });
            }
        }
        const user = yield User_1.User.findOneBy({ id: parseInt(id_user) });
        const event = yield Event_1.Event.findOneBy({ id: parseInt(id_event) });
        if (event && user) {
            const listBooking = yield Booking_1.Booking.find({
                relations: { user: true, event: true },
                where: { event: { id: parseInt(id_event) } }
            });
            if (listBooking.length < event.limite || event.limite == 0) {
                const booking = new Booking_1.Booking();
                booking.user = user;
                booking.event = event;
                booking.precio = event.precio;
                booking.fechaHora = event.fechaHora;
                booking.lugar = event.lugar;
                booking.gps = event.gps;
                yield Booking_1.Booking.update({ id: parseInt(id) }, booking);
                return res.sendStatus(204);
            }
            else {
                return res.status(409).json({ messagge: 'Limite de Evento Superado' });
            }
        }
        else {
            return res.status(404).json({ messagge: 'User Not Exist or Event Not Exist' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ messagge: error.message });
        }
    }
});
exports.updateBooking = updateBooking;
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const resutl = yield Booking_1.Booking.delete({ id: parseInt(id) });
        if (resutl.affected === 0)
            return res.status(404).json({ messagge: 'Booking Not Found' });
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ messagge: error.message });
        }
    }
});
exports.deleteBooking = deleteBooking;
