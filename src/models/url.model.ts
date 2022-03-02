import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
      },
      shortUrl: {
        type: String,
        required: true,
      },
      urlId:{
        type: String,
        required: true,
      },
      clicks: {
        type: Number,
        required: true,
        default: 0,
      }
}, {timestamps:true})

export const UrlModel = mongoose.model('url', urlSchema) 