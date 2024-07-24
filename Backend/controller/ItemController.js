const Item = require('../models/Item');
const Sequelize = require('sequelize');
const {encrypt,decrypt,createIv} = require('../util/HelpFunctions')
const Validator = require('../util/validation')
class ItemController{
    static returnAllFromUser=async(id)=>{   

        let result = await Item.findAll({attributes:['name','id'],where:{UserId:id}});
        console.log("Items " + result);
        if(result.length<1)
            result = []
        return result
    }

   static ItemInsert = async (req, res) => {
        console.log(req.body)
       console.log(req.user)
        try {
            const id = parseInt(req.user);
            
            let name = req.body.name;
            let iv = createIv().toString();
            console.log("IV je "+iv)
            console.log("Email "+req.body.email +" Password "+req.body.password);
            let email = encrypt(req.body.email,iv);
            let password = encrypt(req.body.password,iv);
            console.log(name+ " "+ email +" " + password+" "+iv)
            if (name === "" || email === "" || password === "" || isNaN(id)) {
                throw new Error("Invalid request");
            }
    
            const created = await Item.create({ name: name, email: email, password: password,iv:iv,UserId:id });
    
            let result =await this.returnAllFromUser(id);
            res.json(result);
        } catch (ex) {
            console.log("Item insert "+ ex.message)
            res.status(400).send([]);
        }
    };
    static ItemReturnAllName = async (req, res) => {
        
        try {   
            const id = parseInt(req.user);     
            let result =await this.returnAllFromUser(id);
    
            res.json(result);
        } catch (ex) {
            console.log("ItemReturnAllName "+ ex.message)
            res.status(400).send([]);
        }
    };
    static ItemReturnId = async (req, res) => {
        try {       
            let id = req.params.id;
            Validator.isNumber(id); 
            id = parseInt(id);         
            let result = await Item.findByPk(id);  
            if (!result) {
                return res.status(404).json({ error: 'Item not found' });
            } 
            console.log("IV je " + result.iv);
            result.email = decrypt(result.email, result.iv);
            result.password = decrypt(result.password, result.iv);
             result.iv = "";
            res.json(result);
        } catch (ex) {
            console.log("ItemReturnId error: " + ex.message);
            res.status(500).json({ error: 'Error retrieving item' });
        }
    };
    static ItemDeleteId = async (req, res) => {
        try {
            let id = req.params.id;
            let UserId = req.user;
            Validator.isNumber(id);
            id = parseInt(id);
    
            let numDeletedRows = await Item.destroy({
                where: {
                    id: id
                }
            });
    
            if (numDeletedRows === 1) {
                console.log(`Item with id ${id} successfully deleted.`);
                let result =await this.returnAllFromUser(UserId);
                res.json(result);
            } else {
                throw new Error(`Item with id ${id} not found or not deleted.`);
            }
        } catch (ex) {
            console.error("ItemDeleteId error: ", ex.message);
            res.status(400).json([]);
        }
    };
}
module.exports = ItemController;