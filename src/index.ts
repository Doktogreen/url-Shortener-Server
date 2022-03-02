import express from 'express'
const app = express()
import mongoose from 'mongoose'
import cors from 'cors'
import {CONFIG}  from './config/index'
const config = CONFIG()
import url from './routes/url.route'



if(!config.JWT_SECRET){
    console.log('No Jwt key provided');
    process.exit(1)  
}


if(process.env.NODE_ENV==="test"){
    mongoose.connect(`mongodb://localhost/urlShortener_test`)
    .then(()=>console.log('connection established'))
    .catch(()=>console.log('Failed to establish connection'))
}else{
    mongoose.connect(config.DATABASE_URL as string)
    .then(()=>console.log(`connection established: ${config.DATABASE_URL}`))
    .catch(()=>console.log('Failed to establish connection'))
}



app.use(cors())
app.use(express.json())
app.use('/url', url)


const server = app.listen(config.PORT, ()=>console.log(`Listening to port ${config.PORT}`))
export default server 
