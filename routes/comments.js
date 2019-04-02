var express         = require("express"),
    router          = express.Router({mergeParams: true}),
    Photography     = require("../models/photography"),
    Comment         = require("../models/comment"),
    User            = require("../models/user");

router.get("/new", isLoggedIn, function(req, res) {
    Photography.findById(req.params.id, function(err, foundPhotograph){
        if(err){
           console.log(err);
        } else{
         res.render("new", {photography: foundPhotograph});   
    }
    });
});

router.get("/", function(req, res) {
    Photography.findById(req.params.id).populate("comments").exec(function(err, foundPhotograph){
       if(err){
           console.log(err);
       } else{
         res.render("show", {photography: foundPhotograph});   
       }
    });
});

router.post("/", isLoggedIn, function(req, res) {
    Photography.findById(req.params.id, function(err, foundPhotograph){
        if(err){
            console.log(err);
            res.redirect("/photography");
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundPhotograph.comments.push(comment);
                    foundPhotograph.save();
                    res.redirect("/photography/" + foundPhotograph._id + "/comments");
                }
            });
        }
    });
});

router.get("/:comment_id/edit", function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err){
           res.redirect("back");
       } else {
            res.render("edit", {photography_id: req.params.id, comment: foundComment});          
       }
    });
});

router.put("/:comment_id", function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/photography/" + req.params.id );
      }
   });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports= router;