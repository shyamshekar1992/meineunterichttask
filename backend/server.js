const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const PORT=4000;
const mongoose=require('mongoose');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/movieDb?retryWrites=true&w=majority", {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function () {
    console.log('mongoDB database Connections extablished Successfully')
});

app.listen(PORT, function () {
    console.log("Server is running on PORT: " + PORT);
});

const movieRoute=require('./routes/MovieRoute');
app.use('/api/v1/movie',movieRoute);