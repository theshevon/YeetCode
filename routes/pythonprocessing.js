const {PythonShell} = require('python-shell')
const fs = require('fs')
const file_path = 'public/scripts/python/';

// stores regex tests for each challenge by index
const regex_list = ["[\s\S]*if[ \(].*:[\s\S]*print[ (][\s\S]*else *:[\s\S]*",
                    "[\s\S]*=[ (]*[0-9]{1,}[\s\S]*while[ (]{1,}[\s\S]{1,}:[\s\S]*print[ (]{1,}[\s\S]*",
                    "[\s\S]*=[ (]*[0-9]{1,}[\s\S]*while[ (]{1,}[\s\S]{1,}:[\s\S]*if[ \(]*[ \S]*:[\s\S]{1,}print[ (]{1,}[\s\S]*else:[\s\S]{1,}print[ (]{1,}[\s\S]*"
                    ];

// stores output tests for each challenge by index
const output_test_list = [
    "Correct",
    "*\n*\n*\n*\n*\n*\n*\n*\n*\n*\n",
    ""
];

// save as a python script
const save_script = (script) => fs.writeFileSync(file_path+'script.py',script);

const run_script = (callback) => {
    const syntax_check = PythonShell.checkSyntaxFile(file_path+'script.py')

    // check the syntax, if there is no error, then we can proceed to run the code
    syntax_check.then( (result)=>{

        // get the ast and convert to a json object -- accessible via
        // callback
        const obj = ast_json(console.log)

        return

        // run the script
        const pyshell = new PythonShell(file_path+'script.py')


        // run the script and return the output as an object
        pyshell.on('message', (message)=>callback(message))
        pyshell.end((err,code,sig) => {
            if(err){
                callback(err)
            }
        })

    }, (err) => {
        // if there is an error, we need to do something
        callback(err);
    })
}

const ast_json = (callback) => {
    // run the python script to convert the python
    const pyshell = new PythonShell(file_path+'astjson.py')
    let message = ''

    pyshell.on('message',(data)=>{
        // then we want to aggregate the entire message
        //console.log(data)
        message+=data
    })

    pyshell.end((err,code,sig) => {
        if(err){
            callback(err)
        }
        json_ast = JSON.parse(message);
        console.log(json_ast.body)
        callback(json_ast)
    })

}

//returns true if test is passed
const verify_output = (output, challenge_index) => {
    if (output === output_test_list[challenge_index]) {
        return true;
    }
    else {
        return false;
    }
}

const verify_script = (challenge_index) => {
    const script = fs.readFileSync(file_path+'script.py').toString();
    const regex = new RegExp(regex_list[challenge_index]);
    return script.match(regex);
}

module.exports = {
    save_script,
    run_script,
    verify_output,
    verify_script,
    ast_json
}
