import multer from 'multer'
import storage_blogs from "../multer.js"

const upload_blogs_image = async (req, res) => {
    let upload = multer({storage: storage_blogs}).any('image')
    upload(req, res, () => {
        return res.send(req.files)
    })
}


export default upload_blogs_image
