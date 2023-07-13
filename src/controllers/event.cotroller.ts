import { Request, Response } from 'express'
import { Event } from '../entities/Event';

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find()
    return res.status(200).json(events)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message})
    }
  }
}
export const getEvent = async (req:Request, res:Response) => {
  try {
    const { id } = req.params
    const event = await Event.findOneBy({id:parseInt(id)})
    if(!event) 
      return res.status(404).json({messagge:'Event Not Found'})
    return res.status(200).json(event)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message})
    }
  }
}
export const createEvent = async (req:Request, res:Response) => {
  const { nombre, descripcion, lugar, fechaHora,
          gps, precio, limite, tipoEvento } = req.body  
  try {    
    const event = new Event()
    event.nombre = nombre
    event.descripcion = descripcion
    event.lugar = lugar
    event.fechaHora = new Date(fechaHora)
    event.gps = gps
    event.precio = precio
    event.limite = limite
    event.tipoEvento = tipoEvento
    await event.save()
    return res.status(201).json(event)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message})
    }
  }
}
export const updateEvent = async (req:Request, res:Response) => {
  const {id} = req.params
  try {
    const event=await Event.findOneBy({id:parseInt(id)})
    if(!event) 
      return res.status(404).json({messagge: 'Event Not Found'})
    const {fechaHora}=req.body
    if(fechaHora){
      const event = new Event()
      event.fechaHora=new Date(req.body.fechaHora)
      await Event.update({id: parseInt(id)}, event)
      return res.sendStatus(204)
    }  
    await Event.update({id: parseInt(id)}, req.body)
    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message})
    }
  }
}
export const deleteEvent = async (req:Request, res:Response) => {
  const {id} = req.params
  try {
    const result=await Event.delete({id:parseInt(id)})
    if(result.affected === 0) 
      return res.status(404).json({messagge: 'Event Not Found'})
    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message})
    }
  }
}