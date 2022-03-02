import express from 'express'
const router = express.Router()
import {EncodeURL, DecodeURL, URLStatisctics, loadURL} from '../controllers/url.controller'

router.get('/:urlId', loadURL)
router.post('/encode', EncodeURL)
router.post('/decode', DecodeURL)
router.get('/statistic/:urlId', URLStatisctics )

export default router 