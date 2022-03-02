import { UrlModel } from '../models/url.model'
import validateUrl from '../utils/validate'
import shortid from 'shortid'
import moment from 'moment'
import {CONFIG} from '../config'
import { userInfo } from 'os'
const config = CONFIG()

export const EncodeURL = async (req:any, res:any, next:any)=>{

    const {originalUrl} = req.body

    if(!validateUrl(originalUrl)) return res.status(400).send('Invalid Url supplied') //validates the URL from the request body
    const urlId = shortid.generate()
    try{
        const url = await UrlModel.findOne({originalUrl}) //checks if the URL has alredy been shortened
     
        if(url){

            return res.json({
               status:'success',
               message:'URL fetched successfully',
               data:{
                   shortUrl:url.shortUrl,
                   originalUrl:url.originalUrl,
                   urlId:url.urlId,
                   clicks:url.clicks,
                    dateCreated: moment(url.createdAt).format('LLL'),
                    lastVisited: moment(url.updatedAt).format('LLL')
               }
           }) 
           
        }

      const shortUrl = `${config.BASE_URL}/${urlId}` 
      const newUrl = new UrlModel({
          originalUrl,
          shortUrl,
          urlId
      }) 

      const saveResp = await newUrl.save()

      res.json({
          status:'success',
          message:'URL saved successfully',
          data:{
            shortUrl:saveResp.shortUrl,
            originalUrl:saveResp.originalUrl,
            urlId:saveResp.urlId,
            clicks:saveResp.clicks,
            dateCreated: moment(saveResp.createdAt).format('LLL'),
            lastVisited: moment(saveResp.updatedAt).format('LLL')
          }
      })
     

    }catch(err){
        res.status(500).send('Server Error')
    }
    
}

export const DecodeURL = async (req:any, res:any, next:any)=>{
    
    const {shortUrl} = req.body
    // if(!validateUrl(shortUrl)) return res.status(400).send('Invalid Url supplied')

    const url = await UrlModel.findOne({shortUrl})
    if(!url) return res.status(404).send(`URL doesn't exist on our server`)

    res.json({
        status:'success',
        message:'Original URL  retrieved',
        data:{
            originalUrl: url.originalUrl
        }
    })

}

export const loadURL = async (req:any, res:any, next:any)=>{
    try{
        const url = await UrlModel.findOne({urlId:req.params.urlId})
        if(!url) return res.status(404).send('URL not found')

        url.clicks++
        url.save()
        return res.redirect(url.originalUrl)

    }catch(ex){
        res.status(500).send('Server Error')
    }
}

export const URLStatisctics = async (req:any, res:any, next:any)=>{
    const urlId = req.params.urlId
    try{
        const url = await UrlModel.findOne({urlId})
        if(!url) return res.status(400).send('Invalid urlId supplied')

        res.json({
            status:'success',
            messsage:'URL statistics retrieved successfully',
            data:{
                originalUrl: url.originalUrl,
                shorturl:url.shorturl,
                clicks:url.clicks,
                dateCreated: moment(url.createdAt).format('LLL'),
                lastVisited: moment(url.updatedAt).format('LLL')
            }
        })
    }catch(ex){
        res.status(500).send('Server Error')
    }
}
