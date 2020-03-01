const aesjs = require('aes-js');
//const bcrypt = require('bcryptjs');
//const  pbkdf2  = require ( 'pbkdf2' ) ; 
const helpers = {};
let key = [1, 2, 3,4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
//let key = pbkdf2.pbkdf2Sync('password', 'salt', 1, 128 / 8, 'sha512');
helpers.encrypt = (text) => {
    
    // Convert text to bytes
    
    var textBytes = aesjs.utils.utf8.toBytes(text);

    // The counter is optional, and if omitted will begin at 1
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);

    // To print or store the binary data, you may convert it to hex
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
}

helpers.decrypt = (encryptedHex) => {
    var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

    // The counter mode of operation maintains internal state, so to
    // decrypt a new instance must be instantiated.
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);

    // Convert our bytes back into text
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
}

/* helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async (password , savedPassword) => {
    try{
       return  await bcrypt.compare(password, savedPassword);
    }catch(e){
        console.log(e);
    }
}; */

module.exports = helpers;