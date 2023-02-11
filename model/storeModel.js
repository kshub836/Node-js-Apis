const { Schema, model } = require("mongoose");

const store = new Schema({  
    
    storeName:{
      type:String,  
      
   },
    logo:{
      type:String,  

   },
    business_email:{
        type:String,
     },  
     password:{
      type:String,
   },          
    address: {
        type: String,      
        
      },
    pincode:{
        type:String,    
        
      },
    
      approvalStatus:{
        type:String,
        enum:["Approve", "Pending", "Reject"],
        default:"Pending"
      },
     userType:{
        type:String,      
        default:"Vendor"
      },
      location: {
        type: {type: String,required:true},
        coordinates:[]        
         
       },    

},
{timestamps:true}
)
store.index({location:"2dsphere"});
module.exports = model("store", store);