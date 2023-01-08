const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const router = require('./routes/index.routes')
dotenv.config()

const app = express()
app.use(express.json())
router(app)
const PORT = process.env.PORT || 9000
const MONGODB = process.env.MONGO_URI

app.get('/', (req, res) => {
  res.send({
    msg: 'Hi'
  })
})
// connection db
mongoose
  .connect(MONGODB)
  .then(() => console.log('connected'))
  .catch((error) => console.error(error))

app.listen(PORT, () => {
  console.log('Server is running | ', PORT)
})
