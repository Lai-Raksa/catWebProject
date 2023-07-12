import { Router } from "express"
import upload_blogs_image from "../controller/UploadController.js"

const uploadRoute = Router()


uploadRoute.post('/blogs_image', upload_blogs_image)

export default uploadRoute