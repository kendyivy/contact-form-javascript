const express = require('express');
const mailer = require('express-mailer');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
app.use (bodyParser.json())
app.set('views',__dirname + '/views');
app.set('view engine','pug')


const auth = {

user:'2aa17b346f73e8',
pass: '5e4f72fb89f289'


}
const options = {
	from:"kendyivy@gmail.com",
	host:"smtp.mailtrap.io",
	port:25,
	auth: auth,
	transportMethod: 'SMTP'

}

mailer.extend(app, options);
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type, Accept");	
  next();
});

app.post('/contacts', (req, res) => {
	 
	 const recepient = {
	 	to:"785c3e9e9c-22e95e@inbox.mailtrap.io",
	 	subject: req.body.subject,
	 	name: req.body.name,
	 	message: req.body.message
	 }

	 app.mailer.send('email',recepient, (error) => {
	 	console.log(error)
	 });
	res.send('NodeJs Application')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
