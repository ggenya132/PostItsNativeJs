let userGeneratedPostItContentArray = [];

const nodeMailer = require('nodemailer');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.use(express.static('public'));


//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.render('index');
});

app.post('/email', function(req,res){

    const email = req.body.email;
    sendEmail(email);
});

app.post('/userPostIts', function(req,res){
    userGeneratedPostItContentArray = req.body;
    console.log(userGeneratedPostItContentArray);
    
});

function sendEmail(email){
     const userGeneratedContent = generateContentFromPostItArray(userGeneratedPostItContentArray);
  let transporter = nodeMailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'postitmailer@gmail.com',
        pass: 'ThisIsASpecialPassWord'
    }
      

});
    
          const mailOptions = {
  from: 'postitmailer@gmail.com', // sender address
  to: email, // list of receivers
  subject: 'All your favorite PostIts!', // Subject line
  html:userGeneratedContent// plain text body
};
    transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});
    
} 

function generateContentFromPostItArray(array){
 const mappedArray = array.map( postIt => `<li>${postIt}</li>`);
    const content = `<h3>You generated the following Post-Its:</h3><ul>${mappedArray.join(' ').trim()}</ul>`;
    return content;
}


app.listen(process.env.PORT || 3000, ()=> console.log('app starting!', process.env.PORT));