const express = require('express');
const morgan = require('morgan');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/thanks', (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'astenhfuller@gmail.com',
        from: 'astenhfuller@gmail.com',
        subject: `${req.body.firstName} ${req.body.lastName} has requested to contact you`,
        html: `<strong>${req.body.email}</strong>`,
      };
      sgMail.send(msg)
        .then(() => {}, console.error);
    res.render('thank', { contact: req.body });
});

module.exports = app;