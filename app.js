var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    path            = require("path"),
    serveStatic     = require('serve-static'),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    Comment         = require("./models/comment"),
    Photography     = require("./models/photography");
    
var photoRoutes     = require("./routes/photographies"),
    commentRoutes   = require("./routes/comments"),
    indexRoutes     = require("./routes/index");
    

mongoose.connect("mongodb://localhost/inspirations", { useNewUrlParser: true });    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(serveStatic(path.join(__dirname, "public")));

app.use(require("express-session")({
    secret: "Lena is the cutest baby in the world",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});
            
app.get("/about", function(req, res){
   res.render("about");
});

app.get("/twitter", function(req, res){
   res.render("twitter");
});

app.get("/travel", function(req, res){
   res.render("travel");
});

app.use(indexRoutes);
app.use(photoRoutes);
app.use("/photography/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server running"); 
});