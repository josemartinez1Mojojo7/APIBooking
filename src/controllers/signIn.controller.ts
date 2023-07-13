import { Request, Response } from 'express'
import { User } from '../entities/User'
import jwt from "jsonwebtoken"

const jwtSecret = 'somesecrettoken'
const createToken = (user: User) => {
  const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, {expiresIn: '1200s'});
  return {
    token
  }
}

export const signUp = async (req: Request, res: Response ): Promise<Response> => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ msg: "Please. Send your username and password" })
  }
  const user = await User.findOneBy({ username: req.body.username })
  if (user) {
    return res.status(400).json({ msg: "The User already Exists" })
  }
  const newUser = new User();
  newUser.username = req.body.username
  newUser.password = req.body.password
  await newUser.save()
  return res.status(201).json(newUser)
}

export const signIn = async (req: Request, res: Response): Promise<Response> => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ msg: "Please. Send your username and password" });
  }
  const user = await User.findOneBy({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ msg: "The User does not exists" });
  }
  if (user.password==req.body.password) {
    return res.json({ credentials: createToken(user) });
  }
  return res.status(400).json({
    messagge: "The username or password are incorrect"
  });
}