import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'

import userRoute from './route/UserRoute.js'
import blogRoute from './route/BlogRoute.js'
import uploadRoute from './route/UploadRoute.js'

const app = express();

const ads = [
  {title: 'Hello, world (again)!'}
];

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(__dirname + '/public'))

app.use(cookieParser())

// adding Helmet to enhance your Rest API's security
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false
  })
)

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json())

// enabling CORS for all requests
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));

// adding morgan to log HTTP requests
app.use(morgan('combined'));


// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send(ads);
});

// create api
app.use('/api/v1/user', userRoute)
app.use('/api/v1/blog', blogRoute)
app.use('/api/v1/upload', uploadRoute)

// starting the server
app.listen(3000, () => {
  console.log('listening on port 3000');
});


