"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_cotroller_1 = require("../controllers/event.cotroller");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
const auth = passport_1.default.authenticate('jwt', { session: false });
router.get('/events', event_cotroller_1.getEvents);
router.get('/events/:id', event_cotroller_1.getEvent);
router.post('/events', auth, event_cotroller_1.createEvent);
router.put('/events/:id', auth, event_cotroller_1.updateEvent);
router.delete('/events/:id', auth, event_cotroller_1.deleteEvent);
exports.default = router;
