const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
let Movie=require('../models/MovieModel');

router.route('/add').post(function (req,res) {
    let  movie = new Movie(req.body);
        Movie.findOne({imdbID : movie.imdbID}).then(item =>{
            if(item==null){
                movie.save()
                    .then(sup=>{
                        res.status(200).json({'movie':'successful'});
                    }).catch(err=>{
                    res.status(400).send('unexpected error');});
            }

        })

});

router.get("/getMovies",function (req,res) {
    Movie.find( ).exec().then(movie => {
        res.status(200).json(movie)
    })
        .catch(err => {
            res.status(500).json(err);
        });
});
module.exports = router;