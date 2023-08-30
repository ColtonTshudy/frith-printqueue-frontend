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
    console.log(groupID)
    res.send(req.body)
    // const request_url = `https://vt.instructure.com/api/v1/appointment_groups/${groupID}?access_token=4511~ANBuOoWGbFZFzUNNmXtqOod8pxkDVpyHahwBGPZAhJ72LtYmgyAZrnl2IhSZ48vY&include_past_appointments=true&scope=manageable&per_page=1000&page=1`
    // req.pipe(request(request_url)).pipe(res)
})

app.use('/canvas-get', (req, res) => {
    const request_url = `https://vt.instructure.com/api/v1/appointment_groups/${groupID}?access_token=4511~ANBuOoWGbFZFzUNNmXtqOod8pxkDVpyHahwBGPZAhJ72LtYmgyAZrnl2IhSZ48vY&include_past_appointments=true&scope=manageable&per_page=1000&page=1`
    req.pipe(request(request_url)).pipe(res)
})

app.listen(3100, () => console.log("Hosted middleware on port 3100"))
