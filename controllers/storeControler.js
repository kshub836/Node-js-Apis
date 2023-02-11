// const storeModel = require("../model/storeModel");

// const nodemailer = require("nodemailer");
// const otp = require("../helper/common");

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const secretKey = "secretKey";


// module.exports = {
//     createStore: async (req, res) => {
//         try {
//           storeModel.findOne({ business_email: req.body.business_email, storeName:req.body.storeName}, async (err, result) => {
//             if (!result) {
//               if (!req.body.latitude || !req.body.longitude) {
//                 return res.status(402).send({ responseMessage: "latitude and longitude is required.", responseCode: 402, err });
//               } else {
//                 const vendorData = await storeModel.findOne({ business_email: req.body.business_email });
//                 if (vendorData) {
//                   return res.status(200).send({ responseMessage: "This vendor is already created a store.", responseCode: 200, err });
//                 } else {

//                     let mailDetails = {
//                         from: "Shubham.kumar@mailinator.com",
//                         to: req.body.business_email,
//                         subject: "Store signup successfully",
//                         text:"Thank You For contacting us. We will back Soon After the Documentation verification!!"
                          
//                       };
          
//                       nodemailer
//                         .createTransport({
//                           service: "gmail",
//                           auth: {
//                             user: "lokendra.chandravanshi@indicchain.com",
//                             pass: "bgxsgvbbmlacmvno",
//                           },
//                         })
//                         .sendMail(mailDetails, (err) => {
//                           if (err) {
//                             return console.log("error", err);
//                           } else {
//                             return console.log("Mail  sent! ");
//                           }
//                         });
//                   const storedata = storeModel({
//                     storeName: req.body.storeName,
//                     business_email: req.body.business_email,
//                     address: req.body.address,
//                     Image: req.files.Image,
//                     pin: req.body.pin,
//                     location: {
//                       type: "Point",
//                       coordinates: [
//                         parseFloat(req.body.latitude),
//                         parseFloat(req.body.longitude),
    
//                       ],
//                     },
//                   });
//                   storedata.save(async (err1, res1) => {
//                     if (err1) {
//                       console.log(err1);
//                       return await res.status(500).send({ responseMessage: "Internal server error", responseCode: 500, error: err1 });
//                     } else {
//                       return await res.status(200).send({ responseMessage: "Store Created Successfully", responseCode: 200, res: res1 });
//                     }
//                   });
//                 }
//               }
//             } else {
//               return res.status(403).send({ responseMessage: "Store already  exist..!", responseCode: 403, err });
//             }
//           });
//         } catch (error) {
//           return await res.status(501).send({ responseMessage: "Not Implemented", responseCode: 501, error: error });
//         }
//       },


      
// // Store Login

// //   storeLogin: (req, res) => {
// //     try {
     
// //       storeModel.findOne({ business_email:req.body.business_email},
// //         (err, result) => {  
// //           console.log(result)      
// //           if (result) {
// //             // console.log(result)
// //             if (approvalStatus == "Approve") {
// //               var check = bcrypt.compareSync( req.body.password, result.password);
// //               if (check == false) {
// //                 return res.status(403).send({
// //                   responseCode: 403,
// //                   responseMessage: "Incorrect Password.",
// //                 });
// //               } else {
// //                 token = jwt.sign(
// //                   { _id: result._id, business_email: result.business_email },
// //                   "secretKey",
// //                   { expiresIn: "1H" }
// //                 );
// //                 return res.status(200).send({
// //                   responseMessage: "Login Success",
// //                   responseCode: 200,
// //                   token,
// //                   result,
// //                 });
// //               } 
// //             } else {
// //               return res.status(401).send({
// //                 responseCode: 401,
// //                 responseMessage: "Approval Status pending....!!",
// //               });
// //             }        
// //           } else {
// //             return res.status(404).send({
// //               responseCode: 404,
// //               responseMessage: "User Not found...!!",
// //             });
// //           }
// //         }
// //       );
// //     } catch (error) {    
// //       return res.status(501).send({
// //         responseCode: 501,
// //         responseMessage: "Something went wrong",
// //         error: error,
// //       });
// //     }
// //   },
  
//   // Vendor prassword update
  
//   editPassword: (req, res) => {
//     try {
//       userModel.findOne({ _id: req.userId }, (err, result) => {
//             if (!result) {
               
//                 return res.status(404).send({ responseMessage: "user is not In the Database..!!", responseCode: 404 });
//             }
//             else if (result) {
//                 if (req.body.password != req.body.confirmPassword) {
//                     return res.status(403).send({ responseMessage: " Password and Confirm password doesn't matched  ", responseCode: 403 });
//                 }
  
//                 let check = bcrypt.compareSync(req.body.password, result.password);
//                 if (check == true) {
//                     return res.status(402).send({ responseMessage: " Password is Same As Proivous Password", responseCode: 402, result: {} });
//                 }
//                 else {
//                     var hashpass = hashSync(req.body.password, 10)
//                     req.body.password = hashpass
//                     userModel.findByIdAndUpdate(
//                         { _id: result._id },
//                         { password: req.body.password },
//                         { new: true },
//                         (err, result4) => {
//                             if (err) {
//                                 return res.status(404).send({ responseMessage: "user not found", responseCode: 404, err: err });
//                             } else {
//                                 return res.status(200).send({ responseMessage: "success", responseCode: 200, res: result4, });
//                             }
//                         }
//                     );
//                 }
  
//             }
//         });
//     } catch (error) {
//         return res.status(501).send({ responseCode: "Something_went_wrong" });
  
//     }
//   },
  


// };