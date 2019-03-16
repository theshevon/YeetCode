/*=========================package/schema imports=============================*/

var bodyParser            = require("body-parser"),
    express               = require("express"),
    app                   = express();
<<<<<<< HEAD
    pp                    = require("./routes/pythonprocessing");
=======
    pp                    = require("./routes/pythonprocessing")
>>>>>>> aa68b88eb25da9132eb7bbb588ff8229c76bf915
/*==================================app config================================*/

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

/*====================================routing=================================*/

app.get("/", function(req, res){
    res.render("home");
});

app.get("/exercise/:id", function(req, res){
    var question = "Write a while loop that prints out \"Hello World\" 5 times";
    res.render("exercise", { no: req.params.id, question: question })
});

app.post("/exercise/:id", function(req, res){
    // req.params.id is the question number (indexed from 0)
    // req.body.code is the user's code
    console.log(req.params.id);
    console.log(req.body.code);
    pp.save_script(req.body.code);
    pp.run_script(console.log);


});

app.listen(3000, function(){
    console.log("Successfully connected to server.");
});
