const express = require('express')
const cors =require('cors')
const dotenv = require('dotenv')
const connectDB = require('./db/mongodb')
const app = express();
const routes = require('./routes/routes')


dotenv.config();
connectDB();

app.use(cors())
app.use(express.json())
app.use('/',routes)


app.listen(3000,()=>{
    console.log("서버시작")
})


