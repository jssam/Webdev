// input 
let input = process.argv.slice(2);
// node mycli.js view <dirname> tree
// node mycli.js view <dirname> flat
// node mycli.js organize <dirname> 
// node mycli.js help
let cmd = input[0];
switch (cmd) {
    case "view":
        view(dirpath, mode);

        break;
    case "organize":
        console.log("organize command implemented");
        break;
    case "help":
        console.log(`List of all the commands  
        1. node mycli.js view <dirname> tree
        2. node mycli.js view <dirname> flat
        3. node mycli.js organize <dirname>
        4. node mycli.js help
        `
        );
        break;
    default:
        console.log("Wrong command :( type help to see the list of all the commands");
}

function view(dirpath, mode) {
    if (mode == "tree") {
        console.log("Tree is working")
    } else if (mode == "flat") {

        console.log("Flat is working")
    } else {
        console.log("Wrong mode");
    }

}