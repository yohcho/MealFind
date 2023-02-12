const express = require('express')
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const cors = require('cors')

const subscriptionRoutes = require('./apis/subscriptionRoutes')
const dataRoutes = require('./apis/dataRoutes')

const app = express()
app.use(express.json())
dotenv.config()
mongoose.connect(process.env.DB_URI)
app.use(cors({origin:'*'}));
app.use('/api', subscriptionRoutes)
app.use('/api', dataRoutes)

app.listen(5000, () => {});