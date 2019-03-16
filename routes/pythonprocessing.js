const {PythonShell} = require('python-shell')
const fs = require('fs')
const file_path = 'public/scripts/python/script.py';
// save as a python script
const save_script = (script) => fs.writeFileSync(file_path,script);

const run_script = (callback) => {
    const syntax_check = PythonShell.checkSyntaxFile(file_path)

    // check the syntax, if there is no error, then we can proceed to run the code
    syntax_check.then( (result)=>{

        const pyshell = new PythonShell(file_path)


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

module.exports = {
    save_script,
    run_script
    //
    //verify_script,
}
