const {PythonShell} = require('python-shell')
const fs = require('fs')
const file_path = 'public/scripts/python/';

// stores regex tests for each challenge by index
const regex_list = [
    new RegExp(/[\s\S]*if[ \(].*:[\s\S]*print[ (][\s\S]*else *:[\s\S]*/),
    new RegExp(/[\s\S]*=[ (]*[0-9]{1,}[\s\S]*while[ (]{1,}[\s\S]{1,}:[\s\S]*print[ (]{1,}[\s\S]*/),
    new RegExp(/[\s\S]*=[ (]*[0-9]{1,}[\s\S]*while[ (]{1,}[\s\S]{1,}:[\s\S]*if[ \(]*[ \S]*:[\s\S]{1,}print[ (]{1,}[\s\S]*else:[\s\S]{1,}print[ (]{1,}[\s\S]*/)
];

// save python script
const save_script = (script) => fs.writeFileSync(file_path+'script.py',script);

// run the script saved in the text editor
const run_script = (callback) => {
    const syntax_check = PythonShell.checkSyntaxFile(file_path+'script.py')

    // check the syntax, if there is no error, then we can proceed to run the code
    syntax_check.then( (result)=>{

        return true;

        // get the ast and convert to a json object -- accessible via
        // callback
        const obj = ast_json((obj) => {
            callback(undefined,obj,undefined);
        });


        // run the script
        const pyshell = new PythonShell(file_path+'script.py');


        // run the script and return the output as an object
        pyshell.on('message', (message)=>callback(message,undefined,undefined));

        pyshell.end((err,code,sig) => {
            if(err){
                callback(undefined,undefined,err)
            }
        });

        
    }, (err) => {
        // if there is an error, we need to do something
        callback(err,undefined,undefined);
    })
}

// convert the py program to a json ast used for rendering
// to use, you need to provide a callback function to access the output
const ast_json = (callback) => {

    // run the python script to convert the python script to
    // a json ast -- used to render the flow chart to the screen
    const pyshell = new PythonShell(file_path+'astjson.py')
    let message = ''

    pyshell.on('message',(data)=>{
        // then we want to aggregate the entire message
        console.log(data)
        message+=data
    })
    
    // when we have reached the end of the message, we can then convert
    // to json
    pyshell.end((err,code,sig) => {
        if(err){
            callback(err)
        }
        console.log(message)
        json_ast = JSON.parse(message);

        callback(json_ast.body)
    })

}

const verify_output = () => {
    // verify the output of the terminal
}

// verify the semantics of the script
const verify_sem_script = (challenge_index) => {
    const script = fs.readFileSync(file_path+'script.py').toString('utf-8');
    console.log('----------')
    console.log(script)
    console.log('----------')
    const regex = new RegExp(regex_list[challenge_index]);
    return script.match(regex);
}

module.exports = {
    save_script,
    run_script,
    verify_sem_script,
    verify_output,
    ast_json
}
