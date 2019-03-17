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

var questions = ["Write a function that outputs 10 when 'answer' is correct; incorrect otherwise",
                 "Write a function that a draws a right angles triangle using asterisks with a base length of 10",
                 "Write a function that loops 10 times and prints '<' if the iterator is divisible by 2, '>' otherwise",
                 "Write a function that loops 5 times and prints the each iterator n times"];

var answers = ["if answer == 10:\n\tprint(\"Correct\")\nelse:\n\tprint(\"Incorrect\")",
                "number_of_rows = 10\n\ni = 0\nwhile i <= number_of_rows:\n\tprint(\"*\"* i)\n\ti += 1",
                "number_of_rows = 10\n\ni = 0\nwhile i <= number_of_rows:\n\tif i % 2 == 0:\n\t\tprint(\"<\")\nelse:\n\t\tprint(\">\")\n\ti += 1",
                ""];

app.get("/", function(req, res){
    res.render("home");
});

app.get("/exercise/:id", function(req, res){
    var q_no = req.params.id;
    res.render("exercise", {
                                no: q_no,
                                question: questions[q_no],
                                renderAnim: false,
                                msg: "",
                                code: ""
                            });
});

app.post("/exercise/:id", function(req, res){
    // req.params.id is the question number (indexed from 0)
    // req.body.code is the user's code
    var q_no = req.params.id;
    var code = req.body.code;

    pp.save_script(code);

     // verify that the script is syntactically and logically correct
    // if (pp.run_script((msg,ast_obj,err) =>{

        // if (err){
        //     console.log("Error");
        //     res.render("exercise", {
        //         no: q_no,
        //         question: questions[q_no],
        //         render_anim: false,
        //         msg: err
        //     });
        // }else{

            res.render("exercise", {
                no: q_no,
                question: questions[q_no],
                renderAnim: true,
                msg: "success!",
                code: answers[q_no]
            });
    //     }
    // }));
});

app.listen(3000, function(){
    console.log("Successfully connected to server.");
});
