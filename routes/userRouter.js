const userRouter = require("express").Router();
const user = require("../controllers/user");
const auth = require("../middleware/auth");
const vendor = require("../controllers/vendorControler");

// const swagger = require("swagger.json")
// const upload = require("../middleware/multer")

 /**
 * @swagger
 * /app/v1/user/signup:
 *   post:
 *     tags: 
 *       - User      
 *     description: Signup api Docs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName                
 *         description: 
 *         in: formData
 *         required: true,      
 *     responses:
 *       200:
 *         description: Sign Up successfully
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal Server Error
 */
 userRouter.post("/signup", user.signUp);

 /**
 * @swagger
 * /app/v1/user/login:
 *   post:
 *     tags: 
 *       - User      
 *     description: Login api Docs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName                
 *         description: 
 *         in: formData
 *         required: true,      
 *     responses:
 *       200:
 *         description: Login successfully
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal Server Error
 */
userRouter.post("/login", user.logIn);

 /**
 * @swagger
 * /app/v1/user/otpverification:
 *   post:
 *     tags: 
 *       - User      
 *     description: Otp Verification api Docs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email                
 *         description: 
 *         in: formData         
 *         required: true, 
 *       - name: otp                
 *         description: 
 *         in: formData
 *         required: true,       
 *     responses:
 *       200:
 *         description: OTP Verification successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
userRouter.post("/otpverification", user.OtpVerification);


 /**
 * @swagger
 * /app/v1/user/update/:id:
 *   patch:
 *     tags: 
 *       - User      
 *     description: Update Password api Docs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName                
 *         description: 
 *         in: formData
 *         required: true,      
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal Server Error
 */
userRouter.patch("/update/:id", user.updatePassword);


 /**
 * @swagger
 * /app/v1/user/resetpassword:
 *   put:
 *     tags: 
 *       - User      
 *     description: Reset Password api Docs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName                
 *         description: 
 *         in: formData
 *         required: true,      
 *     responses:
 *       200:
 *         description:  successfull 
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal Server Error
 */
userRouter.put("/resetpassword", user.resetPassword);


 /**
 * @swagger
 * /app/v1/user/forgot-password:
 *   post:
 *     tags: 
 *       - User      
 *     description: Forgot Password api Docs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName                
 *         description: 
 *         in: formData
 *         required: true,      
 *     responses:
 *       200:
 *         description: Reset successfully
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal Server Error
 */
userRouter.post("/forgot-password", user.forgotpassword);


 /**
 * @swagger
 * /app/v1/user/resendotp:
 *   post:
 *     tags: 
 *       - User      
 *     description: Resend OTP api Docs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName                
 *         description: 
 *         in: formData
 *         required: true,      
 *     responses:
 *       200:
 *         description: Successfull
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal Server Error
 */
userRouter.post("/resendotp", user.resendOtp);


 /**
 * @swagger
 * /app/v1/user/Userlist:
 *   get:
 *     tags: 
 *       - User      
 *     description: User List api Docs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName                
 *         description: 
 *         in: formData
 *         required: true,      
 *     responses:
 *       200:
 *         description: Successfull
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal Server Error
 */
userRouter.get("/Userlist",user.Userlist);


 /**
 * @swagger
 * /app/v1/user/editProfile:
 *   post:
 *     tags: 
 *       - User      
 *     description:Edit Profile api Docs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName                
 *         description: 
 *         in: formData
 *         required: true,      
 *     responses:
 *       200:
 *         description: Successfull
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal Server Error
 */
userRouter.post("/editProfile", auth.verifyToken,user.editProfile);

userRouter.get("/paginate",user.paginate);
userRouter.get("/QRCode",user.QRCode);


 /**
 * @swagger
 * /app/v1/user/adminlogin:
 *   post:
 *     tags: 
 *       -  Admin      
 *     description:Admin Login api Docs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName                
 *         description: 
 *         in: formData
 *         required: true,      
 *     responses:
 *       200:
 *         description: Successfull
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal Server Error
 */
userRouter.post("/adminlogin", user.adminLogin); 

 /**
 * @swagger
 * /app/v1/user/adminEditProfile:
 *   put:
 *     tags: 
 *       - Admin      
 *     description:Admin Edit Profile api Docs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName                
 *         description: 
 *         in: formData
 *         required: true,      
 *     responses:
 *       200:
 *         description: Successfull
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal Server Error
 */
userRouter.put("/adminEditProfile", auth.verifyToken,user.adminEditProfile);


 /**
 * @swagger
 * /app/v1/user/vendorPendingList:
 *   get:
 *     tags: 
 *       - Admin      
 *     description:Vendor Pending List api Docs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName                
 *         description: 
 *         in: formData
 *         required: true,      
 *     responses:
 *       200:
 *         description: Successfull
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal Server Error
 */
userRouter.get("/vendorPendingList", auth.verifyToken,user.vendorPendingList);

 /**
 * @swagger
 * /app/v1/user/vendorPendingApproval:
 *   post:
 *     tags: 
 *       - Admin      
 *     description:Vendor Pending Approval api Docs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName                
 *         description: 
 *         in: formData
 *         required: true,      
 *     responses:
 *       200:
 *         description: Successfull
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal Server Error
 */
userRouter.post("/vendorPendingApproval", auth.verifyToken,user.vendorPendingApproval); 
userRouter.get('/userlistApi',user.userlistApi)



userRouter.post('/vendorCreate', vendor.vendorCreate);
userRouter.post('/vendorLogin',vendor.vendorLogin)
userRouter.put("/vendorEditPassword", auth.verifyToken, vendor.vendorEditPassword);
// userRouter.post('/vendorPopulate', vendor.vendorPopulate); 

/**
components:
  schema:
    Order:
      type: object
      properties:
        id:
          type: integer
          format: int64
          example: 10       
        status:
          type: string
          description: Order Status
          example: approved
          enum:
            - placed
            - approved
            - delivered
        complete:
          type: boolean
 */



userRouter.post("/User", user.User);
const multer= require('multer');
const path= require('path');
const {CloudinaryStorage} = require("multer-storage-cloudinary")

var bodyParser = require('body-parser');
userRouter.use(bodyParser.urlencoded({ extended: true }));
userRouter.use(bodyParser.json());
const cloudinary = require("cloudinary").v2

cloudinary.config({
  cloud_name: "dyjr7uu2w",
  api_key: "428354248675467",
  api_secret: "XXbxFALkCag_RPCijDy5xpsLgR0",
  secure: true,
});

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: "DEV",
//     },
//   });

//   const upload = multer{storage:storage}

  const upload = multer({ 
    storage:new CloudinaryStorage({
            cloudinary: cloudinary,
            params: {
              folder: "DEV",
            },
          })
});


// multer setup
// const upload = multer({ 
//     storage:multer.diskStorage({
//         destination:function(req,file,cb)
//         {
//             cb(null,path.join(__dirname, "../uploads"))
//         },
//         filename:function (req,file,cb) {
//             cb(null,file.filename+ "-" +Date.now()+ file.originalname)            
//         }  ,   
    
// })
// });


userRouter.post("/upload",upload.array("file"),(req,res)=>{
    return res.json({ picture: req.file.path });
})



//  cloudinary setup

const fileupload = require("express-fileupload")
userRouter.use(fileupload({
  useTempFiles:true
}))
userRouter.post("/fileupload",user.fileupload)







module.exports = userRouter;
