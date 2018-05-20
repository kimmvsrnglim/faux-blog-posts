var express = require('express');
var router = express.Router();

// load in to read/write files
const fs = require('fs');
// load in to use promisify
const util = require('util');
// load in to call promisify on the readfile function
const readFile = util.promisify(fs.readFile);

/* GET home page. */
router.get('/', function(req, res, next) {
  // read the blog posts from the file
  readFile('blog-posts.json')
    .then((data) => {
      // take the data passed into function
      // parse string into an object
      const blogPosts = JSON.parse(data);

      let dataObject = { 
        title: 'Panda Express',
        myName: 'kim limmmm',
        dogs: ['nekko', 'norie'],
        posts: blogPosts
      };
      // by using JSON.parse() - needs to return object
      return dataObject;

    })
    .then((templateData) => {
      // kick off the res.render of the data to the client
      res.render('index', templateData)
    }).catch(err => {
      // catch any errors and print to console
      console.log(err);
    })
});

/* GET blog post id */
router.get('/:postId', (req, res, next) => {
  readFile('blog-posts.json')
    .then((data) => {
      // parse the data to an object
      const blogPosts = JSON.parse(data);
      // set the id that's mapped to the route parameter
      // example: /user/:name 
      const id = req.params.postId;
      // set thePost to the object that matches the id
      // renders single selected post to client 
      const thePost = blogPosts[id];
      // print id from the params to the console
      console.log("the id is: " + id);
      // transform thePost object to a string 
      // print the single post to the console
      console.log("here is the post: " + JSON.stringify(thePost));

      return thePost; 
    })
    .then((blogPostData) => {
      // kick of the res.render()
      // render in the blog-post.hbs view
      res.render('blog-post', blogPostData);
    }).catch(err => {
      console.log(err); 
    })
});

module.exports = router;
