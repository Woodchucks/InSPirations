var express         = require("express"),
    router          = express.Router(),
    Photography     = require("../models/photography");
    
router .get("/photography", function(req, res) {
    Photography.find({}, function(err, photographies){
       if(err) {
           console.log(err);
       } else {
            res.render("photography", {photography: photographies});
       }
    });
});
module.exports= router;


// maybe for laster use

// Photography.findOne({name: "arcade"}, function(err, photography){
//   if(err){
//       console.log(err);
//   } else {
//       Photography.comments.push({
//           author:  "Sansa",
//           text:    "Beautiful picture!"
//       });
//       photography.save(function(err, photography){
//           if(err){
//               console.log(err);
//           } else {
//               console.log(photography);
//           }
//       });
//   }
// });

// Comment.create(
//     {
//       author:      "Sandra",
//       comment:     "Wow, what a great site!"
        
//     },  function(err, comment){
//             Photography.findOne({name: "arcade"}, function(err, foundPhotography){
//                 if(err){
//                     console.log(err);
//                 } else {
//                     foundPhotography.comments.push(comment);
//                     foundPhotography.save(function(err, data){
//                         if(err){
//                             console.log(err);
//                         } else{
//                             console.log(data);
//                         }
//                     });
//                 }
//             });
//         }
// );

// var photography = [
//     {image: "/media/images/arcade.JPG", name: "arcade"},
//     {image: "/media/images/reflection.JPG", name: "reflection"},
//     {image: "/media/images/tenement_house.JPG", name: "tenement hause"},
//     {image: "/media/images/backyard.JPG", name: "backyard"},
//     {image: "/media/images/door.JPG", name: "door"},
//     {image: "/media/images/passage_2.JPG", name: "passage"}
// ];