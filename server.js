const express = require('express')
const app = express()
const path = require('path')

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

// handle contact form
app.post('/', function(req, res) {
	var smtpTransporter = nodemailer.createTransport({
      service: 'gmail',
			host: 'smtp.gmail.com',
      auth: {
          user: '',
          pass: ''
      }
  });

	var mailOptions = {
   to : req.query.to,
   subject : req.query.subject,
   text : "FROM: "+req.query.name+"\n Message: \n"+req.query.text,
  }

	smtpTransport.sendMail(mailOptions, function(error, response) {
		if (error) {
			// console.log(error);
			res.end("error");
		} else {
			// console.log("Message sent: " + response.message);
			res.end("sent");
		}
});

// load static assets
app.use(express.static('public'))

app.listen(3001, function() {
	console.log('Listening on port 3001');
});
