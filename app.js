var express = require('express'),
    app = express(),
    config = require('./config')(),
    router = require('./router');


app.configure(function(){
 app.use('/static',express.static(__dirname + '/public'));

 if(config.mode=='local'){
 	app.use(express.logger());
 }

app.set('views', __dirname + '/protected/views');
app.engine('html', require('ejs').renderFile);



});


app.get('*',addHeaders);

app.get('/',router.home);


function addHeaders(req,res,next){

	res.statusCode = 200;
	res.contentType("text/html");	
	next();
}


app.listen(process.env.PORT ||config.port);