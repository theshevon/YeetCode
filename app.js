/*=========================package/schema imports=============================*/

var bodyParser            = require("body-parser"),
    express               = require("express"),
    app                   = express();
    pp                    = require("./routes/pythonprocessing");

/*==================================app config================================*/

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

/*====================================routing=================================*/

var questions = ["Write a while loop to print \"Hello\" 5 times",
                 "",
                 "",
                 "",
                 ""];

app.get("/", function(req, res){
    res.render("home");
});

app.get("/exercise/:id", function(req, res){
    var q_no = req.params.id;
    res.render("exercise", {
                                no: q_no,
                                question: questions[q_no],
                                render: true
                            });
});

app.post("/exercise/:id", function(req, res){
    // req.params.id is the question number (indexed from 0)
    // req.body.code is the user's code
    var q_no = req.params.id;
    var code = req.body.code;

    // verify that the script is syntactically correct
    pp.save_script(req.body.code);
    pp.run_script(console.log);
    if (pp.verify_script(req.params.id)) {
        console.log("verified")
    }else{
        console.log(req.params.id)
        console.log("yeet")
    }

    // verify that the logic is correct

    // if so pass the JSON object as parameters for the renderer and refresh
    // with the users data


    // consider adding 'clear all' button to delete all code that has currently
    // been entered

    res.render("exercise", {
                                no: q_no,
                                question: questions[q_no],
                                render: false // may be true if all is well
                            });

});

app.listen(3000, function(){
    console.log("Successfully connected to server.");
});
