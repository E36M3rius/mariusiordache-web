const express = require('express')
const app = express()
const path = require('path')
const nodemailer = require('nodemailer')
const bodyparser = require('body-parser')

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());

// handle contact form
app.post('/', function(req, res) {
	var smtpTransport = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
      auth: {
          user: '',
          pass: ''
      }
  });

	var mailOptions = {
   to : req.body.to,
   subject : req.body.subject,
   text : "FROM: "+req.body.name+"\n\nMESSAGE: \n\n"+req.body.text,
  }

	smtpTransport.sendMail(mailOptions, function(error, response) {
		if (error) {
			console.log(error);
			res.end("error".error.message);
		} else {
			// console.log("Message sent: " + response.message);
			res.end("sent");
		}
	});
});

// load static assets
app.use(express.static('public'))

app.listen(3001, function() {
	console.log('Listening on port 3001');
});
