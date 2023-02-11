const userModel = require("../model/user");

const nodemailer = require("nodemailer");
const otp = require("../helper/common");
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";
const bcrypt = require("bcrypt");
const { hashSync } = require("bcrypt");
const Joi = require("joi");



module.exports = {
  vendorCreate: async (req, res) => {
    const schema = {
      vendorName:Joi.string().require()
    }

    try {
      let validBody = await Joi.Validate(req.body,schema);
      const userData = await userModel.findOne({ email: validBody.email });
      if (userData) {
        // return res.send(errorCode.Internal_Server_Error());
        // console.log(userData);
        return res.status(200).send({
          responseMessage: "This vendor is already exist..",
          responseCode: 200,
        });
      } else {
        validBody.otp = otp.generateOTP();

        /* Adding Curent Time for OTP Verification...*/
        validBody.otpTime = Date.now() + 180000;

        let mailDetails = {
          from: "Shubham.kumar@mailinator.com",
          to: req.body.email,
          subject: "Vendor signup successfully",
          text: "Thank You For contacting us. We will back Soon",
        };
        nodemailer
          .createTransport({
            service: "gmail",
            auth: {
              user: "kshubh8604@gmail.com",
              pass: "ssruulevuyoniehi",
            },
          })
          .sendMail(mailDetails, (err) => {
            if (err) {
              return console.log("error", err);
            } else {
              return console.log("Mail  sent! ");
            }
          });

        const user_data = await userModel(validBody).save();
        if (user_data) {
          return res.status(200).send({
            responseMessage: "Vendor Created Successfully",
            responseCode: 200,
            data: user_data,
          });
        } else {
          // console.log(err1);
          return res.status(500).send({
            responseMessage: "Internal server error",
            responseCode: 500,
            error: [],
          });
        }
      }
    } catch (error) {
      console.log(error.message);
      return res.status(501).send({
        responseMessage: "Not Implemented",
        responseCode: 501,
        error: error,
      });
    }
  },

  //vendor Otp verification

  // OtpVerification: (req, res) => {
  //   try {
  //     userModel.findOne({ business_email: req.body.business_email }, (err, result) => {
  //       if (err) {
  //         // console.log("Email is not in Database..!!");
  //         // return res.send(errorCode.Not_Found());
  //         return res.status(404).send({
  //           responseMessage: "business_email is not in database..!!",
  //           responseCode: 404,
  //         });
  //       } else {
  //         if (result.otp == req.body.otp) {
  //           /* Compair OTP at real time...!! */
  //           if (result.otpTime >= Date.now()) {
  //             if (result.OtpVerification == false) {
  //               userModel.findByIdAndUpdate(
  //                 { _id: result.id },
  //                 { OtpVerification: true },
  //                 async (err) => {
  //                   if (err) {
  //                     // return res.send(errorCode.Not_Found());
  //                     return res.status(500).send({
  //                       responseMessage: "failed",
  //                       responseCode: 500,
  //                       err: err,
  //                     });
  //                   } else {
  //                     // return res.send(errorCode.Success() );
  //                     return res.status(200).send({
  //                       responseMessage: "success",
  //                       responseCode: 200,
  //                       result,
  //                     });
  //                   }
  //                 }
  //               );
  //             } else {
  //               return res.status(401).send({
  //                 responseMessage: "Otp verified already..!!",
  //                 responseCode: 401,
  //               });
  //             }
  //           } else {
  //             return res.status(401).send({
  //               responseMessage: "Otp time expired..!!",
  //               responseCode: 401,
  //             });
  //           }
  //         } else {
  //           return res.status(401).send({
  //             responseMessage: " Invalid Otp!!",
  //             responseCode: 401,
  //           });
  //         }
  //       }
  //     });
  //   } catch (error) {
  //     return res.status(500).send({
  //       responseMessage: "Internal server error",
  //       responseCode: 500,
  //       result: {},
  //     });
  //   }
  // },

  // vendorPopulate: (req, res) => {
  //   userModel
  //     .find({ _id: req.body.vendor_id }, (err, store) => {
  //       if (!store) {
  //         return res.status(404).send({
  //           responseMessage: "Vendor not found",
  //           responseCode: 404,
  //           err,
  //         });
  //       } else {
  //         // console.log(user)
  //         res.status(200).send({
  //           responseMessage: "Vendor Details",
  //           responseCode: 200,
  //           store,
  //         });
  //       }
  //     })
  //     .populate("vendor_id");
  // },

  // // Vendor Login

  vendorLogin: async (req, res) => {
    try {
      const userData = await userModel.findOne({ email: req.body.email });
      // console.log(userData);
      if (userData) {
        if ((approvalStatus = "Approve")) {
          var check = bcrypt.compareSync(req.body.password, userData.password);
          if (check == false) {
            return res.status(403).send({
              responseCode: 403,
              responseMessage: "Incorrect Password.",
            });
          } else {
            token = jwt.sign(
              { _id: userData._id, email: userData.email },
              "secretKey",
              { expiresIn: "1H" }
            );
            return res.status(200).send({
              responseMessage: "Login Success",
              responseCode: 200,
              token,
              userData,
            });
          }
        } else {
          return res.status(401).send({
            responseCode: 401,
            responseMessage: "Approval Status pending....!!",
          });
        }
      } else {
        return res.status(501).send({
          responseCode: 501,
          responseMessage: "Enter valid Email Id !!",
        });
      }
    } catch (error) {
      // console.log(error.message)
      return res.status(501).send({
        responseCode: 501,
        responseMessage: "Something went wrong",
        error: error,
      });
    }
  },

  // // Vendor prassword update

  vendorEditPassword: async (req, res) => {
    try {
      let vendorData = await userModel.findOne({ _id: req.userId });
      if (!vendorData) {
        return res.status(404).send({
          responseMessage: "Vendor not In the Database..!!",
          responseCode: 404,
        });
      } else {
        if (req.body.password != req.body.confirmPassword) {
          return res.status(403).send({
            responseMessage: " Password and Confirm password doesn't matched  ",
            responseCode: 403,
          });
        }
        let check = bcrypt.compareSync(req.body.password, vendorData.password);
        if (check == true) {
          return res.status(402).send({
            responseMessage: " Password is Same As Proivous Password",
            responseCode: 402,
          });
        } else {
          var hashpass = hashSync(req.body.password, 10);
          req.body.password = hashpass;
          let vendor_data = await userModel.findByIdAndUpdate(
            { _id: vendorData._id },
            { password: req.body.password },
            { new: true }
          );
          if (!vendor_data) {
            return res.status(404).send({
              responseMessage: "user not found",
              responseCode: 404,
            });
          } else {
            return res.status(200).send({
              responseMessage: "success",
              responseCode: 200,
              Data: vendor_data,
            });
          }
        }
      }
    } catch (error) {
      console.log(error.message);
      return res
        .status(501)
        .send({ responseCode: 501, responseMessage: "Something went wrong" });
    }
  },
};
