var express     = require("express"),
    app         = express(),
    path        = require("path"),
    serveStatic = require('serve-static'),
    bodyParser  = require('body-parser'),
	mongoose	= require('mongoose');
    
mongoose.connect('mongodb+srv://Woodchucks:<password>@cluster0-fxq0o.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connected to DB');	
}).catch(err => {
	console.log('Error from DB:', err.message);	
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(serveStatic(path.join(__dirname, "public")));

var PhotographyComments = [];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/photography", function(req, res) {
   res.render("photography"); 
});

app.post("/photography", function(req, res) {
   var author = req.body.author;
   var comment = req.body.comment;
   var newComment = {author: author, comment: comment}
   PhotographyComments.push(newComment);
   res.render("photography");
});

app.get("/photography/new", function(req, res) {
   res.render("new"); 
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

app.listen(3000, process.env.IP, function(){
   console.log("Server running"); 
});
