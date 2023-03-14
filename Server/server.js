const express = require('express')
const Contact = require('./models/contacts')
const morgan = require('morgan')
const contactRouter = require('./routes/contact')
const mongoose = require('mongoose')

const app = express()

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.URI_MONGODB || 'mongodb://127.0.0.1/contactManager1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection
.once('open', () => console.log("Connected"))
.on('error', error => {
    console.log(error)
})

/*app.get('/', async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: 'desc' })
  res.render('/index', { contacts: contacts })
})*/

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HTTP request logger
app.use(morgan('tiny'));
app.use('/', contactRouter);

app.listen(PORT, () => {
    console.log(`We up boys at ${PORT}`)
})