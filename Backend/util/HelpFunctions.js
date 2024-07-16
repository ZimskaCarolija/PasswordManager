const Crypto = require('crypto');
console.log(process.env.KEY)
module.exports.randomString = (size = 21) => {
    return Crypto
        .randomBytes(size)
        .toString('base64')
        .slice(0, size);
};

module.exports.encrypt = (text,iv) => {
    const cipher = Crypto.createCipheriv('aes-256-cbc', Buffer.from(process.env.KEY, 'hex'), Buffer.from(iv, 'hex'));
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

module.exports.decrypt = (encryptedText,iv) => {
    const decipher = Crypto.createDecipheriv('aes-256-cbc', Buffer.from(process.env.KEY, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
module.exports.createIv=()=>{
  return Crypto.randomBytes(16).toString('hex');
}
module.exports.createSecToken=()=>{
    return Crypto.randomBytes(8).toString('hex');

}
