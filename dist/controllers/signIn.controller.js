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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const User_1 = require("../entities/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = 'somesecrettoken';
const createToken = (user) => {
    const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1200s' });
    return {
        token
    };
};
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ msg: "Please. Send your username and password" });
    }
    const user = yield User_1.User.findOneBy({ username: req.body.username });
    if (user) {
        return res.status(400).json({ msg: "The User already Exists" });
    }
    const newUser = new User_1.User();
    newUser.username = req.body.username;
    newUser.password = req.body.password;
    yield newUser.save();
    return res.status(201).json(newUser);
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ msg: "Please. Send your username and password" });
    }
    const user = yield User_1.User.findOneBy({ username: req.body.username });
    if (!user) {
        return res.status(400).json({ msg: "The User does not exists" });
    }
    if (user.password == req.body.password) {
        return res.json({ credentials: createToken(user) });
    }
    return res.status(400).json({
        messagge: "The username or password are incorrect"
    });
});
exports.signIn = signIn;
