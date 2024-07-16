const jwt = require('jsonwebtoken');
const User = require("../models/User")
const {returnById} = require("../controller/UserController")
class Validator{
    static isEmpty=(val)=>{
        if (val == null || val == '' || val == undefined)
            throw new Error('is Empty');
        return val;
    }
    static isNumber = (val)=>{
        if(isNaN(val))
            throw new Error('is Not a Number');
        return val;
    }
    static verifyToken = (req, res, next) => {
        console.log("Request headers: ", req.headers);
        const token = req.headers.jwt;
        console.log("Token is " + token);
    
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    
        jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Forbidden' });
            }
    
            req.user = decoded.id.id; 
            next(); 
        });
    };
    static verifyTokenId=(req, res, next)=> {//to see if token i user is same as in params not finsihed 
        const token = req.user;
        if(token.id != req.params.id)
            return res.status(401).json({ message: ' Invalid User id' });
        next();
    }
    static verifySecurityTime=async(req, res, next)=> { 
        const token = req.user; 
        try {
            const result = await returnById(token);
    
            if (!result) {
                return res.status(404).json({ error: 'User not found' });
            }
            const securityTime = result.securityTime;
            const currentTime = Date.now();
            const expirationTime = 360 * 1000; 
    
            if (securityTime + expirationTime > currentTime) {
                return res.status(403).json({ error: 'Forbidden: Token has expired' });
            }
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error token time' });
        }
        next();
    }
    static verifyCode =async (req, res, next) => {
        console.log("Request headers: ", req.headers);
        const token = req.user;
        console.log("Token is " + token);
        const code = req.headers.code;
        try
        {
        if (!code) {
            return res.status(401).json({ error: 'Security code' });
        }
        const result = await returnById(token);
        if(result.securityToken != code)
            throw new Error("Code invalid");
        }
        catch(error)
        {
            console.log(error.message)
            return res.status(500).json({ error: 'Error code' });
        }
            next(); 
       
    };
    
}
module.exports = Validator