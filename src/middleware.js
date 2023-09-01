/**
 * This backend works as a reverse proxy for the frontend
 * This backend is required in order to avoid CORS issues
 */

import express from 'express'
import request from 'request'
import cors from 'cors'

const app = express()
app.use(express.json())

let groupID = 0

const corsOptions = {
    origin: (origin, callback) => {
        callback(null, true)
    },
}
app.options('*', cors(corsOptions))
app.use(cors())

app.use('/canvas-all', cors(corsOptions), (req, res) => {
    const request_url = `https://vt.instructure.com/api/v1/appointment_groups/?access_token=4511~ANBuOoWGbFZFzUNNmXtqOod8pxkDVpyHahwBGPZAhJ72LtYmgyAZrnl2IhSZ48vY&include_past_appointments=true&scope=manageable&per_page=1000&page=1`
    req.pipe(request(request_url)).pipe(res)
});

app.use('/printer', cors(corsOptions), (req, res) => {
    const request_url = `https://script.google.com/macros/s/AKfycbyN22oZdeTkunq8VZRNIK8ehjFLZPHbeikhVhzEqe5L7ZJEzlcMTVXuU5R1KMX714J5/exec`
    req.pipe(request(request_url)).pipe(res)
});

app.post('/canvas-set', (req, res) => {
    groupID = req.body.groupID
    console.log(`set appointment ID to ${groupID}`)
    res.send(req.body)
})

app.use('/canvas-get', (req, res) => {
    const request_url = `https://vt.instructure.com/api/v1/appointment_groups/${groupID}?access_token=4511~ANBuOoWGbFZFzUNNmXtqOod8pxkDVpyHahwBGPZAhJ72LtYmgyAZrnl2IhSZ48vY&include_past_appointments=true&scope=manageable&per_page=1000&page=1`
    req.pipe(request(request_url)).pipe(res)
})

app.use('/attendance', cors(corsOptions), (req, res) => {
    const request_url = 'https://script.googleusercontent.com/a/macros/vt.edu/echo?user_content_key=nKWY4qLTx0vTQeWSnPyjAnRAhARb95XzyLkixuwTb7MOjqiG0MwakvjqBJW59r7PqOY1Pa6_YtKcDSpGYUzl1-54F0uTllM3OJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKAarhBb2BfrXVl-rd9Uyy2sFYpSTzj3t-tXwmuVYFupTB6mg3L5aTj8PALN_4z9aVoSDNru01_t1P0AP2J_hiI9hrX0EYVkvTVYPnlpXWt4fo96t4mNCBQCpmJWaOKqYVLBA4WohCEJxpAIMwEjH-l4LgANXR6ofjBFY23qEmEmfsxUCojZ7NL_&lib=MtiAyd25s3XO9h02zx9o2nfYkWc0nwg2q'
    req.pipe(request(request_url)).pipe(res)
})

app.listen(3100, () => console.log("Hosted middleware on port 3100"))
