const express = require('express');
const path = require('path')

const app = express()
const jsonParser = express.json()
app.use(express.static(path.join(__dirname, 'client')))

app.post('/coordinates', jsonParser, (req, res) => {
  if (!req.body) res.sendStatus(400);
  const {lat1, lon1, lat2, lon2} = req.body;

  const radius = 6371;
  const dLat = (lat2-lat1) * (Math.PI/180);
  const dLon = (lon2-lon1) * (Math.PI/180);
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos((lat1)* (Math.PI/180)) * Math.cos((lat2)* (Math.PI/180)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = radius * c;

  const result = {distance: distance}
  const data = JSON.stringify(result)
  res.send(data)
})

app.listen(5000,()=>{
  console.log('App started...')
})