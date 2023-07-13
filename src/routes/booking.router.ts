import { Router } from 'express';
import { getBookings, getBooking, createBooking, updateBooking, deleteBooking } from '../controllers/booking.controller'
import passport from 'passport';

const router = Router()
const auth = passport.authenticate('jwt', { session: false })

router.get('/bookings', auth, getBookings)
router.get('/bookings/:id', auth, getBooking)
router.post('/bookings', auth, createBooking)
router.put('/bookings/:id', auth, updateBooking)
router.delete('/bookings/:id', auth, deleteBooking)

export default router