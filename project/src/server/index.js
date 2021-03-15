require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

//NASA mars rover curiosity API call
app.get('/curiosity', async (req, res) => {
    try {
        //date lastest rover picture
      const maxdate = (await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${process.env.API_KEY}`)
          .then(res => res.json())).rovers[0].max_date
        console.log(maxdate)
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos&api_key=${process.env.API_KEY}`)
            .then(res => res.json())  //https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${process.env.API_KEY}
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})
//NASA mars rover spirit API call
app.get('/spirit', async (req, res) => {
    try {
        //date lastest rover picture
      const maxdate = (await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${process.env.API_KEY}`)
          .then(res => res.json())).rovers[1].max_date
        console.log(maxdate)
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?earth_date=${maxdate}&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})
//NASA mars rover opportunity API call
app.get('/opportunity', async (req, res) => {
    try {
      //date lastest rover picture
      const maxdate = (await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${process.env.API_KEY}`)
          .then(res => res.json())).rovers[2].max_date
        console.log(maxdate)
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?earth_date=${maxdate}&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})

// example API call
app.get('/apod', async (req, res) => {
    try {
        console.log("Test")
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
