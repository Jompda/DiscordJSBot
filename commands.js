module.exports.get = () => {
    const {readdirSync} = require("fs");
    let tempArr = [];
    readdirSync("./cmd").forEach(f => {
        if(!f.endsWith(".js")){
            readdirSync("./cmd/" + f).forEach(ff => {
                if(ff.endsWith(".js")){
                    let js = require("./cmd/" + f + "/" + ff);
                    if(js instanceof require("./commandClass")){
                        tempArr.push(js);
                    } else {
                        console.log("Non-command file in folder " + f + ": " + ff);
                    }
                } else {
                    console.log("Non-command file in folder " + f + ": " + ff);
                }
            });
        } else {
            console.log("JS files in the cmd folder, why???");
        }
    });
    return tempArr;
}