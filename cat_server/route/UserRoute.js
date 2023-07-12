import { Router } from "express"
import {
    register,
    login,
    checkauth,
    logout,
    reset_password
} from '../controller/UserController.js'

const userRoute = Router()

userRoute.post('/register', register)
userRoute.post('/login',login)
userRoute.get('/checkauth', checkauth)
userRoute.delete('/logout', logout)
userRoute.put('/reset_password', reset_password)

export default userRoute