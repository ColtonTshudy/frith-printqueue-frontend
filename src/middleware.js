/**
 * This backend works as a reverse proxy for the frontend
 * This backend is required in order to avoid CORS issues
 * Otherwise I wouldn't have made it...
 */

import express from 'express'
import request from 'request'
import cors from 'cors'

import apiKeys from './rsc/api_keys.json' assert { type: "json" };
const canvas_api_key = apiKeys.canvas

const app = express()
app.use(express.json())

let groupIDs = []

const corsOptions = {
    origin: (origin, callback) => {
        callback(null, true)
    },
}
app.options('*', cors(corsOptions))
app.use(cors())

app.use('/canvas-all', cors(corsOptions), (req, res) => {
    groupIDs = []
    // console.log("reset id list")
    const request_url = `https://vt.instructure.com/api/v1/appointment_groups/?access_token=${canvas_api_key}&include_past_appointments=true&scope=manageable&per_page=1000&page=1`
    req.pipe(request(request_url, function (error, response, body) {
        if (error !== null) {
            console.log("ERROR: canvas retrieval error")
            res.status(400).send({ message: 'error' })
        }
    })).pipe(res)
});

app.use('/printer', cors(corsOptions), (req, res) => {
    const request_url = 'https://script.googleusercontent.com/macros/echo?user_content_key=RZOUxeoS90dlhWev3jVJZD0M98fYn67SM3VrCixCLB4uUoGWVih0zAgTZb_7Linq6hlCPCiujeH1QV5ea5Zli26gVE2BHwk_m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnLdAkI7g5aE5l__QuqoY5dKjpxa4TqY9U6LiVKyfzOd9N-jsd70CjqHp8hMtcqa33lBZs9UrBGMIZcESPA3sI2Qdne8WSg0yIw&lib=Md_aIkyzuLDBrvWy2AFXFRS8iU2Jo7_id'
    req.pipe(request(request_url, function (error, response, body) {
        if (error !== null) {
            console.log("ERROR: gs 3D printer retrieval error")
            res.status(400).send({ message: 'error' })
        }
    })).pipe(res)
});

app.post('/canvas-set', (req, res) => {
    groupIDs.push(req.body.groupID)
    // console.log(`canvas appointment id set: ${groupIDs}`)
    res.send(req.body)
})

app.use('/canvas-get', (req, res) => {
    const groupID = groupIDs.pop()
    // console.log(`canvas appointment id requested, popped ${groupID}. id list: [${groupIDs}]`)
    const request_url = `https://vt.instructure.com/api/v1/appointment_groups/${groupID}?access_token=4511~ANBuOoWGbFZFzUNNmXtqOod8pxkDVpyHahwBGPZAhJ72LtYmgyAZrnl2IhSZ48vY&include_past_appointments=true&scope=manageable&per_page=1000&page=1`
    req.pipe(request(request_url, function (error, response, body) {
        if (error !== null) {
            console.log("ERROR: canvas retrieval error")
            res.status(400).send({ message: 'error' })
        }
    })).pipe(res)
})

app.use('/attendance', cors(corsOptions), (req, res) => {
    const request_url = 'https://script.googleusercontent.com/a/macros/vt.edu/echo?user_content_key=nKWY4qLTx0vTQeWSnPyjAnRAhARb95XzyLkixuwTb7MOjqiG0MwakvjqBJW59r7PqOY1Pa6_YtKcDSpGYUzl1-54F0uTllM3OJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKAarhBb2BfrXVl-rd9Uyy2sFYpSTzj3t-tXwmuVYFupTB6mg3L5aTj8PALN_4z9aVoSDNru01_t1P0AP2J_hiI9hrX0EYVkvTVYPnlpXWt4fo96t4mNCBQCpmJWaOKqYVLBA4WohCEJxpAIMwEjH-l4LgANXR6ofjBFY23qEmEmfsxUCojZ7NL_&lib=MtiAyd25s3XO9h02zx9o2nfYkWc0nwg2q'
    req.pipe(request(request_url, function (error, response, body) {
        if (error !== null) {
            console.log("ERROR: gs attendance retrieval error")
            res.status(400).send({ message: 'error' })
        }
    })).pipe(res)
})

app.use('/open-hours', cors(corsOptions), (req, res) => {
    const request_url = 'https://script.googleusercontent.com/macros/echo?user_content_key=QwVJIye0oHhIMO3FjoMwXrqrqqvjdVld1bR2dsO-UA--A3-X1r_YaefKW62Y391BdJmDtABJlLq-Gzn7FGPWZGWnNIi2drsfm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPVf_-Al0YE8OXrzXVzotOgPyAlzyPAVeloKbD4TKIjhVX4EKBqa6YbMpmjvbLUG8vs2KmjEu9Wz8IKsW5Dcpq4LmsjpyXY9rw&lib=MBMmZsxNgODjHPdmBv-QF1i8iU2Jo7_id'
    req.pipe(request(request_url, function (error, response, body) {
        if (error !== null) {
            console.log("ERROR: gs operating hours retrieval error")
            res.status(400).send({ message: 'error' })
        }
    })).pipe(res)
})


app.listen(3100, () => console.log("Hosted middleware on port 3100"))
