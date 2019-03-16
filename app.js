/*=========================package/schema imports=============================*/

var bodyParser            = require("body-parser"),
    express               = require("express"),
    app                   = express();
/*==================================app config================================*/

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

/*====================================routing=================================*/

app.get("/", function(req, res){
    res.render("home");
});

app.get("/exercise/:id", function(req, res){
    var question = "Write a while loop to find love in a hopeless place"
    res.render("exercise", { no: req.params.id, question: question })
});

app.listen(3000, function(){
    console.log("Successfully connected to server.");
});

