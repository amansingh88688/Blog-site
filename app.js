//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { truncate } = require("lodash");

const homeStartingContent = "Hello all, Myself Aman Singh. I am currently a 2nd year undergraduate student at Indian Institute of Technology Madras pursuing B.Tech in the department of Chemical Engineering. This is just a blog page. You create your own blog by";
const aboutContent = "This page was developed by Aman Singh. Aman Singh is a 2nd year undergraduate student at Indian Institute of Technology Madras pursuing B.Tech in the department of Chemical Engineering. It is simply a blog page.";
const contactContent = "Name - Aman Singh, E-mail : amankrj12345@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//array to store posts in /compose site...     for line 35
let posts = [];


app.get("/", function(req, res){
  res.render("home.ejs", {
    StartingContent : homeStartingContent,
    posts : posts
  });
});





app.get("/about", function(req, res){
  res.render("about.ejs", {about : aboutContent} );
}); 

app.get("/contact", function(req, res){
  res.render("contact.ejs", {contact : contactContent} );
});


app.get("/compose", function(req, res){
  res.render("compose.ejs");
});


app.post("/compose", function(req, res){

  const post = {
    title : req.body.postTitle,
    content : req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});


app.get("/posts/:postname", function(req, res){

  const str1 = _.lowerCase(req.params.postname);

  posts.forEach(function(post){     //this is a kind of loop
    const str2 = _.lowerCase(post.title);

    if(str1 === str2)  {

      res.render("post", {
        title : post.title,
        content : post.content
      });

    }
  });

});





app.listen(3000, function() {
  console.log("Server started on port 3000");
});

