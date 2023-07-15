"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
const auth = passport_1.default.authenticate('jwt', { session: false });
router.get('/users', auth, user_controller_1.getUsers);
router.get('/users/:id', auth, user_controller_1.getUser);
router.post('/users', auth, user_controller_1.createUser);
router.put('/users/:id', auth, user_controller_1.updateUser);
router.delete('/users/:id', auth, user_controller_1.deleteUser);
exports.default = router;
