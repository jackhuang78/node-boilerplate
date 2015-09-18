import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import ejs from 'ejs';


var app = express();
var port = process.env.PORT || 9999;



// set static path
app.use(express.static('node_modules'));
app.use(express.static('build/client'));

// set parsers
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// set view and view engine
app.set('views', 'src/client');
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
	res.send('OK');
});

app.get('/index', (req, res) => {
	res.render('main', {react: 'Index'});
});


app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});