const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../Model/User');
router.use(express.json());

/* ------------------------------------------------------------------------------------------------------------------------- */
// Generate Random ID
/* ------------------------------------------------------------------------------------------------------------------------- */

function generateRandomString() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

/* ------------------------------------------------------------------------------------------------------------------------- */
// Add User
/* ------------------------------------------------------------------------------------------------------------------------- */
  /**
 * @swagger
 * /api/add:
 *   post:
 *    summary: Create New User
 *    tags: [Users]
 *    requestBody:
 *        required: true
 *        content: 
 *          application/json:
 *             schema:
 *               $ref : '#/components/schemas/User2'
 *         
 *    responses:
 *     200:
 *        description: The User was successfully created
 *        content:
 *         application/json: 
 *           schema:
 *               $ref : '#/components/schemas/User'
 *     500:
 *        description: Some Server Erreur
 *     300:
 *        description: User already exists
 *        
 */

router.post('/add', async function  (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    try{
        
    await User.find({email:req.body.email}).then(async(result) => {
        if(result.length!==0){
                        res.sendStatus(300);
                        console.log('Error user is trouve');
        }
        else {

                Users= new User({
                    id:generateRandomString(),
                    nom:req.body.nom,
                    prenom:req.body.prenom,
                    email:req.body.email,
                    password:bcrypt.hashSync(req.body.password,10),
                    phone:req.body.phone,
                    age:req.body.age,
                  
                  
                });
                await Users.save();
                res.send(Users)
            }});}
            catch(err){console.log(err)}
        });
/* ------------------------------------------------------------------------------------------------------------------------- */
// Connexion
/* ------------------------------------------------------------------------------------------------------------------------- */

/**
 * @swagger
 * /api/login:
 *   post:
 *    summary: Login
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content: 
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *     200:
 *        description: Connected  successfully 
 *        content:
 *         application/json: 
 *           schema:
 *               $ref : '#/components/schemas/User'
 *     404:
 *        description: Invalide Email or Password
 *     500:
 *        description: Some Server Erreur
 *     
 *        
 */

        router.post('/login', async function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            try{
                await User.find({email:req.body.email}).then(async(result) => {
                    if(result.length===0){

                        res.sendStatus(404);

                           }
                    else {

    await User.find({email:req.body.email}).then((result) => {

    bcrypt.compare(req.body.password, result[0].password, function(err, result) {
            if (result) {
                console.log('valide');
                 User.find({email:req.body.email}).then((result2) => {
                    res.send(result2);

                console.log(result2);});
            }
            else{
                console.log('invalide')
                res.sendStatus(404);

            }
})
    })

}});
             

}

 catch(err){console.log(err)}});

/* ------------------------------------------------------------------------------------------------------------------------- */
 // Get all Users
/* ------------------------------------------------------------------------------------------------------------------------- */

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Find All Users
 *    tags: [Users]
 *    responses:
 *     200:
 *        description: list of users
 *        content:
 *         application/json: 
 *           schema:
 *             type: array
 *             items:
 *               $ref : '#/components/schemas/User'
 */


 
        router.get('/users', async function (req, res) {
          
                await User.find().then((result) => {
                  res.send(result)});});
        
/* ------------------------------------------------------------------------------------------------------------------------- */
// Find User by ID
/* ------------------------------------------------------------------------------------------------------------------------- */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *    summary: Find User By ID
 *    tags: [Users]
 *    parameters:
 *        - in: path
 *          name: id
 *          schema:
 *           type: string
 *          required: true
 *          description: user id
 *    responses:
 *     200:
 *        description: find user by id
 *        content:
 *         application/json: 
 *           schema:
 *               $ref : '#/components/schemas/User'
 *     404:
 *        description: the user is not found
 *        
 */
router.get('/users/:id', async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
      const result = await User.find({ id: req.params.id });
      if (result.length === 0) {
        res.sendStatus(404); // send 404 status code when no result is found
      } else {
        res.send(result);
      }
    } catch (err) {
      console.log(err);
    }
  });
  
/* ------------------------------------------------------------------------------------------------------------------------- */
// Update User by ID
/* ------------------------------------------------------------------------------------------------------------------------- */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *    summary: Update User By ID
 *    tags: [Users]
 *    parameters:
 *        - in: path
 *          name: id 
 *          schema:
 *           type: string
 *          required: true
 *          description: user id
 *    requestBody:
 *        required: true
 *        content: 
 *          application/json:
 *             schema:
 *               $ref : '#/components/schemas/User2'
 *         
 *    responses:
 *     200:
 *        description: The User was successfully updated
 *        content:
 *         application/json: 
 *           schema:
 *               $ref : '#/components/schemas/User'
 *     500:
 *        description: Some Server Erreur
 *     404:
 *        description: User was not found
 *
 */
router.put('/users/:id', async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try{
        await User.find({id:req.params.id}).then(async(result) => {
            if(result.length===0){
                res.sendStatus(404);
            }
                else {
                    await User.updateOne({id:req.params.id},{nom:req.body.nom,prenom:req.body.prenom,email:req.body.email,password:bcrypt.hashSync(req.body.password,10),phone:req.body.phone,age:req.body.age,}).then(async(result2) => {
                       
                        await User.find({id:req.params.id}).then(async(result3) => {
res.send(`old:
${result} 
----------------------------------------------------------------------------------------------------------------
updated:
${result3}`)
                         })
                         })
}});
           }
        catch(err){console.log(err)}});

/* ------------------------------------------------------------------------------------------------------------------------- */
// Delete User By ID
/* ------------------------------------------------------------------------------------------------------------------------- */

        /**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *    summary: Delete User By ID
 *    tags: [Users]
 *    parameters:
 *        - in: path
 *          name: id
 *          schema:
 *           type: string
 *          required: true
 *          description: user id
 *    responses:
 *     200:
 *        description:   The User was successfully  deleted 
 *        content:
 *         application/json: 
 *           schema:
 *               $ref : '#/components/schemas/User'
 *     404:
 *        description: the user is not found
 *        
 */


router.delete('/users/:id', async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try{
        await User.find({id:req.params.id}).then(async(result) => {
            if(result.length===0){
                res.sendStatus(404);
            }
                else {
                    await User.deleteOne({id:req.params.id}).then((result) => {
                        res.send('The User was successfully  deleted ')
                         })
}});
           }
        catch(err){console.log(err)}});

/* ------------------------------------------------------------------------------------------------------------------------- */
// Swagger Components      
/* ------------------------------------------------------------------------------------------------------------------------- */

/**
 * @swagger
 * components:
 *  schemas:
 *     User:
 *       type: object
 *       required: true
 *       properties:
 *         id:
 *             type: string
 *             description: id
 *         nom:
 *             type: string
 *             description: nom
 *         prenom:
 *             type: string
 *             description: prenom
 *         email:
 *             type: string
 *             description: email
 *         password:
 *             type: string
 *             description: password
 *         phone:
 *             type: Number
 *             description: phone
 *         age:
 *             type: Number
 *             description: age
 *       example:
 *         id: d5ee_kk5   
 *         nom: Ali     
 *         prenom: Selmi   
 *         email: test@test.com   
 *         password: $2a$10$ZxG/C7AvTJP/5JAnyKnYTezed.ZhkaJXRlkdZ1KPnTIOwZ7RPfaZG   
 *         phone: 55874123   
 *         age: 22   
 
 *     User2:
 *       type: object
 *       required: true
 *       properties:
 *    
 *         nom:
 *             type: string
 *             description: nom
 *         prenom:
 *             type: string
 *             description: prenom
 *         email:
 *             type: string
 *             description: email
 *         password:
 *             type: string
 *             description: password
 *         phone:
 *             type: Number
 *             description: phone
 *         age:
 *             type: Number
 *             description: age
 *       example:
 *         nom: test     
 *         prenom: test   
 *         email: test@test.com   
 *         password: test   
 *         phone: 55874123   
 *         age: 22   
 */



/* ------------------------------------------------------------------------------------------------------------------------- */

module.exports = router;

/* ------------------------------------------------------------------------------------------------------------------------- */
