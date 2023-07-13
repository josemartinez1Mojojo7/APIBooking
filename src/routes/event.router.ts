import { Router } from 'express';
import { getEvents, getEvent, createEvent, updateEvent, deleteEvent } from '../controllers/event.cotroller'
import passport from 'passport';

const router = Router()
const auth = passport.authenticate('jwt', { session: false })

router.get('/events', getEvents)
router.get('/events/:id', getEvent)
router.post('/events', auth, createEvent)
router.put('/events/:id', auth, updateEvent)
router.delete('/events/:id', auth, deleteEvent)

export default router