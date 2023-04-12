const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/weather', (req, res) => {
    const loc = req.query.loc
    const options = {
        method:'GET',
        url: `https://api.openweathermap.org/data/2.5/weather?zip=${loc},US&appid=${process.env.WEATHER_API_KEY}`,
      }
  
      axios.request(options).then((response)=>{
        console.log(response)
        res.json(response.data)
      }).catch((error)=>{
        console.log(error)
      })

});

app.listen(port, ()=>{
    console.log(`listening on ${port}`)
})