require('dotenv').config(); //for contact form email

const express = require('express')
const nodemailer = require('nodemailer'); //for contact form email
const bodyParser = require('body-parser'); //for contact form email

const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true })); //for contact form email
app.use(bodyParser.json());

app.use(express.static('public'))
app.set("views", './views')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/welcome', (req, res) => {
    res.sendFile(__dirname + '/views/welcome.html')
})

app.get('/experience', (req, res) => {
    res.sendFile(__dirname + '/views/experience.html')
})

app.get('/projects', (req, res) => {
    res.sendFile(__dirname + '/views/projects.html')
})

app.get('/links', (req, res) => {
  res.sendFile(__dirname + '/views/links.html')
})

app.get('/connect', (req, res) => {
    res.sendFile(__dirname + '/views/connect.html')
  })

  app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/views/test.html')
  })

// contact form email - form submission
app.post('/submit', (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log('Received Data:', req.body);

// contact form email - creates transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    },
    authMethod: 'PLAIN'
});

// contact form email - sets up email data
  const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,    
      subject: 'New Form Submission',
      text: `
          Name: ${name}\n
          Email: ${email}\n
          Phone: ${phone}\n
          Message: ${message}
      `
  };

// contact form email - send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('message sent: %s', info.messageId);
  });
});

app.listen(port, () => console.log(
  `Server is running at http://localhost:${port}. Press Ctrl-C to terminate.`))