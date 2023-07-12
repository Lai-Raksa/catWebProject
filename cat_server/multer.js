import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log(__dirname)

const storage_blogs = multer.diskStorage({
    destination: path.join(__dirname, '/public/', 'blogs_image'),
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
})

export default storage_blogs
