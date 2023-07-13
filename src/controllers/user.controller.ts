import { Request, Response } from 'express'
import { User } from '../entities/User';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message})
    }
  }
}
export const getUser = async (req:Request, res:Response) => {
  try {
    const { id } = req.params
    const user = await User.findOneBy({id:parseInt(id)})
    if(!user) 
      return res.status(404).json({messagge:'User Not Found'})
    return res.status(200).json(user)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message})
    }
  }
}
export const createUser = async (req:Request, res:Response) => {
  const { username, password } = req.body  
  try {    
    const user = new User()
    user.username = username
    user.password = password
    await user.save()
    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message})
    }
  }
}
export const updateUser = async (req:Request, res:Response) => {
  const {id} = req.params
  try {
    const user=await User.findOneBy({id:parseInt(id)})
    if(!user) 
      return res.status(404).json({messagge: 'User Not Found'})
    await User.update({id: parseInt(id)}, req.body)
    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message})
    }
  }
}
export const deleteUser = async (req:Request, res:Response) => {
  const {id} = req.params
  try {
    const result=await User.delete({id:parseInt(id)})
    if(result.affected === 0) 
      return res.status(404).json({messagge: 'User Not Found'})
    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message})
    }
  }
}