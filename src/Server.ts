import App from './App'
import dotenv from 'dotenv'

dotenv.config({path: '.env'})

// @ts-ignore
const app = new App(process.env.PORT, process.env.MONGODB_URI)

app.listen()