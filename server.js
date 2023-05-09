const express = require('express');
const app = express();
const user = require('./routes/User');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
     
const options = {
  definition:{
    openapi:"3.0.0",
    info: {
      title:"library Api",
      version:"1.0.0",
      description:"a simple express library api",

    },
    servers:[
      {
        url:"http://localhost:4000"
      },
    ],
  },
  apis:["./routes/*.js"]
 
};   

const specs=swaggerJsDoc(options)
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(specs))


      // apply them
      
      app.use(bodyParser.urlencoded({ extended: true }));
      
   
      const cors=require('cors');
      
      mongoose.connect('mongodb+srv://root:root@cluster0.lv4bqbh.mongodb.net/SOA', { useNewUrlParser: true });
      //mongoose.connect('mongodb://localhost:27017/SOA', { useNewUrlParser: true });
      app.options('*',cors());

      app.use(express.json());
      app.use(cors({
        origin:'http://localhost:3000'
      }));
const PORT = 4000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.use('/api', user);
