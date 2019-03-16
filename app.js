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
                                render_anim: false,
                                msg: ""
                            });
});

app.post("/exercise/:id", function(req, res){
    // req.params.id is the question number (indexed from 0)
    // req.body.code is the user's code
    var q_no = req.params.id;
    var code = req.body.code;

    pp.save_script(code);

     // verify that the script is syntactically and logically correct
    if (pp.run_script((msg,ast_obj,err) =>{

        if (err){
            console.log("Error 01");
            res.render("exercise", {
                no: q_no,
                question: questions[q_no],
                render_anim: false,
                msg: err
            });
        }else{
            if (pp.verify_sem_script(q_no)){
                console.log("working");
                res.render("exercise", {
                    no: q_no,
                    question: questions[q_no],
                    render_anim: true,
                    msg: msg
                });
            }else{
                console.log("Error 02");
                console.log(q_no, questions[q_no]);
                res.render("exercise", {
                    no: q_no,
                    question: questions[q_no],
                    render_anim: false,
                    msg: "Sorry, try again!"
                });
            }
        }
    }));
});

app.listen(3000, function(){
    console.log("Successfully connected to server.");
});
