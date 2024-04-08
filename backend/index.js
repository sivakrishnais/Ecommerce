const port=4000;
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const path=require("path");

const cors=require("cors");
const exp = require("constants");

app.use(express.json());
app.use(cors());
//database connection with mongodb
mongoose.connect("mongodb+srv://sivakrishna:siva123@cluster0.skjdbjr.mongodb.net/e-commerce");
//API creation
app.get("/",(req,res)=>{
          res.send("Express App is Running our learn the channel sivakrishna")
})


// image store engine
const storage =multer.diskStorage({
       destination:'./upload/images',
       filename:(reg,file,cb)=>{
              return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
       }
})
const upload=multer({
       storage:storage
})
//creating uploading endpoint for images
app.use('/images',express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});




// Schema for creating products
const Product=mongoose.model("product",{
        id:{
            type:Number,
            required:true,

        },
        name:{
             type:String,
             required:true,
        },
        image:{
             type:String,
             required:true
        },
        category:{
             type:String,
             required:true,
        },
        new_price:{
            type:Number,
            required:true,
        },
        old_price:{
              type:Number,
              required:true,
        },
        date:{
            type:Date,
            default:Date.now,
             
        },
        available:{
             type:Boolean,
             default:true,
        },
})
app.post('/addproduct', async (req, res) => {
    try {
        // Fetch all products from the database
        let products = await Product.find({});
        
        // Initialize id
        let id;

        // If there are existing products, calculate the id for the new product
        if (products.length > 0) {
            // Get the last product in the array
            let last_product = products[products.length - 1];

            // Ensure that the id of the last product is a valid number
            if (!isNaN(last_product.id)) {
                id = last_product.id + 1;
            } else {
                // If the id is not a number, set id to a default value
                id = 1;
            }
        } else {
            // If there are no existing products, set id to 1
            id = 1;
        }

        // Create a new product instance
        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        // Save the new product to the database
        await product.save();

        // Log success message
        console.log("Product saved successfully");

        // Send a success response to the client
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        // If an error occurs, log the error and send an error response to the client
        console.error("Error:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

//creating api for deleting products
app.post('/removeproduct',async (req,res)=>{
          await Product.findOneAndDelete({id:req.body.id});
          console.log("Removed");
          res.json({
              success:true,
              name:req.body.name
          })
})

//creating api for the getting all products
app.get('/allproducts',async (req,res)=>{
         let products=await Product.find({});
         console.log("all Products Fetch");
         res.send(products);
})
//schem creating for user model
const Users=mongoose.model("users",{
       name:{
          type:String,
          
       },
       email:{
         type:String,
         unique:true,
       },
       password:{
           type:String,
            
       },
       cartData:{
           type:Object,
       },
       date:{
          type:Date,
          default:Date.now()
       }
});
//creating endpoint for registering the user 
app.post("/signup",async (req,res)=>{
    let check = await Users.findOne({ email: req.body.email });
    
    
     if(check){
         return res.status(400).json({success:false,errors:"existing users found withe same email id"});
     }
     let cart={};
     for(let i=0;i<300;i++){
           cart[i]=0;
     }
     const user=new Users({
           name:req.body.username,
           email:req.body.email,
           password:req.body.password,
           cartData:cart,

     })
     await user.save();

    const data={
         user:{
            id:user.id
         }
    }

   const token=jwt.sign(data,'secret_ecom');
   res.json({
       success:true,token
   });
   

})
//creating the endpoint for the login puprpose;
app.post('/login',async (req,res)=>{
     let user=await Users.findOne({email:req.body.email});
     if(user){
          const passCompare =req.body.password===user.password;
          if(passCompare){
            const data={
                  user:{
                      id:user.id
                  }
            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
          }
          else{
               res.json({success:false,error:"wrong password"});
          }
     }
     else{
           res.json({success:false,error:"wrong email id"});
     }
})

//creating the end point of the  new collections product
app.get("/newcollections",async (req,res)=>{
         let products=await Product.find({});
         let newCollection=products.slice(1).slice(-8);
         console.log("new collection is fetced");
         res.send(newCollection);
})
//creating the end point for the populat in women section
app.get('/popularinwomen',async (req,res)=>{
      let products=await Product.find({category:"women"});
      let popularInWomen=products.slice(0,4);
      console.log("popular women fetched");
      res.send(popularInWomen);



});
//creating middelware to fetch user
const fetchUser=async (req,res,next)=>{
       const token=req.header('auth-token');
       if(!token){
            res.status(401).send({
                   errors:"please authenticate using valid token"
            })
       }
       else{

           try{
              const data=jwt.verify(token,'secret_ecom');
              req.user=data.user;
              next(); //that we hava pass paramer

           }catch(error){
                res.status(401).send({
                       errors:"please authenticate "
                })
           }
       }
}

app.post('/addtocart',fetchUser,async (req,res)=>{
        let userData=await Users.findOne({
               _id:req.user.id
        });
        userData.cartData[req.body.itemId]+=1;
        await Users.findOneAndUpdate({
                _id:req.user.id
        },{cartData:userData.cartData});
        res.send("Added");




})
//creating endpoint to get cartdata
app.post("/getcart",fetchUser,async (req,res)=>{
         console.log("getCart");
         let userData=await Users.findOne({
                _id:req.user.id
         });
         res.json(userData.cartData);

})
app.post("/removefromcart",fetchUser,async (req,res)=>{
     console.log("removed",req.body.itemId);
    let userData=await Users.findOne({
        _id:req.user.id
 });
 if(userData.cartData[req.body.itemId]>0){
    
 userData.cartData[req.body.itemId]-=1;
 await Users.findOneAndUpdate({
         _id:req.user.id
 },{cartData:userData.cartData});
 res.send("Removed");
 }

})

app.listen(port,(error)=>{
    if(!error){
         console.log("Server Running on Port "+port);
    }
    else{
        console.log("Error :"+error)
    }
});




