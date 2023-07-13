import { Request, Response } from 'express'
import { Booking } from '../entities/Booking';
import { Event } from '../entities/Event';
import { User } from '../entities/User';

export const getBookings = async (req: Request, res: Response) => {
  try {
    const events = await Booking.find({
      relations: {
        user: true,
        event: true,
      },
    });
    return res.status(200).json(events)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message})
    }
  }
}
export const getBooking = async (req:Request, res:Response) => {
  try {
    const { id } = req.params
    const booking = await Booking.findOne({
      where: { id: parseInt(id)},
      relations: ['user','event']
      })
    if(!booking) 
      return res.status(404).json({messagge:'Booking Not Found'})
    return res.status(200).json(booking)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message})
    }
  }
}
export const createBooking = async (req:Request, res:Response) => {
  const { id_user, id_event } = req.body;
    
  try {
    const event = await Event.findOneBy({id:parseInt(id_event)})
    const user = await User.findOneBy({id:parseInt(id_user)})
    const booking = new Booking()
    if(event && user){
      booking.user = user
      booking.event = event
      booking.precio = event.precio
      booking.fechaHora = event.fechaHora
      booking.lugar = event.lugar
      booking.gps = event.gps
      const listBooking = await Booking.find({
        relations: {
          user: true,
          event: true,
        },
        where:{
          event:{
            id:parseInt(id_event)
          }
        }
        })
      if(listBooking.length < event.limite || event.limite == 0){
        await booking.save()
        return res.status(201).json(booking)
      }else{
        return res.status(409).json({messagge:'Limite de Evento Superado'})
      }
    }else{
      return res.status(404).json({messagge:'User Not Exist or Event Not Exist'})
    } 
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message})
    }
  }
}
export const updateBooking = async (req:Request, res:Response) => {
  const {id} = req.params
  try {
    const booking=await Booking.findOneBy({id:parseInt(id)})
    if(!booking) 
      return res.status(404).json({messagge: 'Booking Not Found'})
    const {id_user, id_event} = req.body
    if(id_user && !id_event){
      const user = await User.findOneBy({id:parseInt(id_user)})
      if(!user) 
        return res.status(404).json({messagge:'User Not Exist'})
      const booking = new Booking()
      booking.user=user
      await Booking.update({id: parseInt(id)}, booking)
      return res.sendStatus(204)
    }
    if(id_event && !id_user){
      const event = await Event.findOneBy({id:parseInt(id_event)})
      if(!event) 
        return res.status(404).json({messagge:'Event Not Exist'})
      const listBooking = await Booking.find({
        relations: {
          user: true,
          event: true,
        },
        where:{
          event:{
            id:parseInt(id_event)
          }
        }
        })
      if(listBooking.length < event.limite || event.limite == 0){
        const booking = new Booking()
        booking.event=event
        booking.precio=event.precio
        booking.fechaHora=event.fechaHora
        booking.lugar=event.lugar
        booking.gps=event.gps
        await Booking.update({id: parseInt(id)}, booking)
        return res.sendStatus(204)
      }else{
        return res.status(409).json({messagge:'Limite de Evento Superado'})
      }      
    }
    const user = await User.findOneBy({id:parseInt(id_user)})
    const event = await Event.findOneBy({id:parseInt(id_event)})
    if(event && user){
      const listBooking = await Booking.find({
        relations: {
          user: true,
          event: true,
        },
        where:{
          event:{
            id:parseInt(id_event)
          }
        }
        })
      if(listBooking.length < event.limite || event.limite == 0){
        const booking = new Booking()
        booking.user = user
        booking.event = event
        booking.precio = event.precio
        booking.fechaHora = event.fechaHora
        booking.lugar = event.lugar
        booking.gps = event.gps
        await Booking.update({id: parseInt(id)}, booking)
        return res.sendStatus(204)
      }else{
        return res.status(409).json({messagge:'Limite de Evento Superado'})
      }
    }else{
      return res.status(404).json({messagge:'User Not Exist or Event Not Exist'})
    } 

  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message})
    }
  }
}
export const deleteBooking = async (req:Request, res:Response) => {
  const {id} = req.params
  try {
    const resutl=await Booking.delete({id:parseInt(id)})
    if(resutl.affected === 0) 
      return res.status(404).json({messagge: 'Booking Not Found'})
    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message})
    }
  }
}