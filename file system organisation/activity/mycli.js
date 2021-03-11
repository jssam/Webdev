///input
let helpfile = require("./commands/help");
let viewf = require("./commands/view");
let orgff = require("./commands/organise");
let input = process.argv.slice(2);
let cmd = input[0];
switch(cmd){
  case "view":
     viewf.viewfile(input[1],input[2]);
     break;
  case "organise":
      orgff.organisefun(input[1]);
      break;
  case "help":
    helpfile.helpfun();
      break;
    default:
        console.log("Wrong command");
}
