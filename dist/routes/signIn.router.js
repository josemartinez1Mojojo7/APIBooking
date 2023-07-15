"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signIn_controller_1 = require("../controllers/signIn.controller");
const router = (0, express_1.Router)();
router.post('/signup', signIn_controller_1.signUp);
router.post('/signin', signIn_controller_1.signIn);
exports.default = router;
