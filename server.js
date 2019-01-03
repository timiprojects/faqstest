const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const dbUri = require('./config/keys')
const cors = require('cors')


const app = express()

mongoose.connect(dbUri, { useNewUrlParser: true })

app.use(cors())

app.use(express.urlencoded({ extended: false}))

app.use(expressLayouts)
app.set('view engine', 'ejs');


//SET ROUTES
app.use('/', require('./routes/site'))




const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});