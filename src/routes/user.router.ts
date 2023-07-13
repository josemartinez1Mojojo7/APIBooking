import { Router } from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/user.controller'
import passport from 'passport'

const router = Router()
const auth = passport.authenticate('jwt', { session: false })

router.get('/users', auth, getUsers)
router.get('/users/:id', auth, getUser)
router.post('/users', auth, createUser)
router.put('/users/:id', auth, updateUser)
router.delete('/users/:id', auth, deleteUser)

export default router