let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoDb = require('./database/db');

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected successfull  !!")
},
    error => {
        console.log('Database error:' + error);
    }
)


//create port and server
const bookRoute = require("./node-backend/routes/book.route");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}
));

app.use(cors());

//create static path
app.use(express.static(path.join(__dirname, 'dist/Bookstore')));
//API root
app.use('/api', bookRoute);
//PORT create
const port = process.env.port || 8000;
app.listen(port, () => {
    console.log('listening port on :' + port);
})

//404 error handler...
app.use((req,res,next)=>{
    next(createError(404));
});

//Base Route
app.get('/',(req,res)=>{
    res.send('invalid endpoint')
});
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/Bookstore/index.html'));
});
app.use(function(err,req,res,next){
    console.log(err.message);
    if(!err.statusCode)err.statusCode=500;
    res.status(err.statusCode).send(err.message);
});









