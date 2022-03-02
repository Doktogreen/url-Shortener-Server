import { UrlModel } from '../../src/models/url.model'
import request from 'supertest'
import server from '../../src/index'


describe ('Url Encodng service /url ', ()=>{

    beforeEach(()=>{ server })
    afterEach(()=>{server.close})


    describe('POST / ', ()=>{
        
        it('should return a 400 Error if request body or URL is not valid', async ()=>{
            const res = await request(server)
                .post('/url/encode')
                .send({originalUrl:'hps://google.com'})

            expect(res.status).toBe(400)
        })

        it('should SAVE genres if url is valid', async ()=>{
            const res = await request(server)
                .post('/url/encode')
                .send({originalUrl:'https://google.com'})

            expect(res.status).toBe(200)
        })
    })

    describe('POST /', ()=>{
        it('should return 404 error if the short URL does not exist or request body is not valid', async()=>{
            const res = await request(server)
                .post('/url/decode')
                .send({shortUrl:'http://localhost:4000/wrong_path'})
            expect(res.status).toBe(404)
        })

        it('should return 200 response if the shortUrl exists in the DB', async()=>{
            const res = await request(server)
                .post('/url/decode')
                .send({shortUrl:'http://localhost:4000/AZChPtccW'})
            expect(res.status).toBe(200)
        })
    })

    describe('GET /:urlId', ()=>{
        it('should return a 404 error if an invalid urlId is passed', async ()=>{
           
            const res = await request(server).get(`/url/wrong_id`)
            expect(res.status).toBe(404)
        })

        it('should redirect to the original Url if the shortUrl is valid', async ()=>{

            const res = await request(server).get(`/url/AZChPtccW`)
            expect(res.status).toBe(302)
        })
    })

    describe('GET /:urlId', ()=>{
        it('should return a 400 error if an invalid urlId is passed', async ()=>{ 
            const res = await request(server).get(`/url/statistic/wrong_id`)
            expect(res.status).toBe(400)
        })
        it('should return a 200 response (url stats) if valid urlId is passed', async ()=>{
            const res = await request(server).get(`/url/statistic/AZChPtccW`)
            expect(res.status).toBe(200)
        }) 

    })

    


})