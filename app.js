var express     = require("express"),
    app         = express(),
    path        = require("path"),
    serveStatic = require('serve-static');
    
app.set("view engine", "ejs");
app.use(serveStatic(path.join(__dirname, "public")));

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/about", function(req, res){
   res.render("about");
});

app.get("/twitter", function(req, res){
   res.render("twitter");
});

app.get("/send_eMail", function(req, res) {
    res.render("/send_eMail");
})

app.get("/travel", function(req, res){
   res.render("travel");
});
    

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server running"); 
});