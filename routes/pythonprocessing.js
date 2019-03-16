const {PythonShell} = require('python-shell')
const fs = require('fs')
const file_path = 'public/scripts/python/';
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

module.exports = {
    save_script,
    run_script,
    //
    //verify_script,
    ast_json
}
