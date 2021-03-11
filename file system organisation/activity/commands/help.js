function helper(){
    console.log(`list of all commands are
    1. node mycli.js view <dir name> tree
    2. node mycli.js view <dir name> flat
    3. node mycli.js organise <diename> 
    4. node mycli.js help
    `);
}
module.exports = {
    helpfun : helper
}