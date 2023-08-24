import express from 'express'
import request from 'request'
import cors from 'cors'

const app = express()

const corsOptions = {
    origin: (origin, callback) => {
        callback(null, true)
    },
}
app.options('*', cors(corsOptions))

app.use('/canvas', cors(corsOptions), (req, res) => {
    const request_url = `https://vt.instructure.com/api/v1/appointment_groups/?access_token=4511~ANBuOoWGbFZFzUNNmXtqOod8pxkDVpyHahwBGPZAhJ72LtYmgyAZrnl2IhSZ48vY&include_past_appointments=true&scope=manageable&per_page=1000&page=1`
    req.pipe(request(request_url)).pipe(res)
});

app.use('/printer', cors(corsOptions), (req, res) => {
    const request_url = `https://script.google.com/macros/s/AKfycbyN22oZdeTkunq8VZRNIK8ehjFLZPHbeikhVhzEqe5L7ZJEzlcMTVXuU5R1KMX714J5/exec`
    req.pipe(request(request_url)).pipe(res)
});

app.listen(3100, () => console.log("Hosted middleware on port 3100"))
