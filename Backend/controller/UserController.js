const User = require("../models/User");
const jwt = require('jsonwebtoken');
const { createSecToken } = require('../util/HelpFunctions');
const sendeMail = require('../util/email')
const CreateJWT = async (data) => {
    const email = data.email;
    const acces_token = data.acces_token;
    const id = await User.findOne({attributes:['id'],where:{email:email}})
    if(id == null)
    {
       const user = await User.create({email:email,acces_token:acces_token})
       const id = await User.findOne({attributes:['id'],where:{email:email}})
       if(id == null)
        throw new Error("Uer not found")
    }
    const jwtPayload = {id:id,email:email,acces_token:acces_token}
    const jwtOptions = {
        expiresIn: '1d' // token duration
    };
    const token = jwt.sign(jwtPayload, process.env.jwtSecret, jwtOptions);
    return token
};

const CreateSecToken = async (req, res) => {
    try {
        const tokenTemp = createSecToken();
        const tokenJwt = req.user; 
        const user = await returnById(tokenJwt);
        console.log("USer " + user);
        const updated = await User.update(
            { securityToken: tokenTemp, securityTime: Date.now() },
            { where: { email:user.email } }
        );

        if (updated) {
            let text = "Your security code and is valid for 5 min  "+tokenTemp; 
            await sendeMail(user.email,"hello",text);
            res.status(200).json({ message: 'Security token updated successfully.' });
        } else {
            throw new Error("Security token not updated.");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Error updating token" });
    }
};
const returnById=async(id)=>{
    const result = await User.findOne({ where: { id: id } });
    return result
};
module.exports = { CreateJWT, CreateSecToken ,returnById};
