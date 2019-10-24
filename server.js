if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 8080 ;
const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY
const axios = require('axios')
const express = require('express');
const app = express();

app.use(express.json())
app.use(express.static('public'))



app.post('/weather', (req, res) => {
  const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${req.body.latitude},${req.body.longitude}`
  console.log(`${req.body.latitude} - latitude`);
  console.log(`${req.body.longitude} - longitude`)
  axios({
      url: url,
      responseType: 'json'
  }).then(data => res.json(data.data.currently))
console.log(DARKSKY_API_KEY);

})

app.listen(PORT, () => {
  console.log(`server has started on ${PORT}`);
})
