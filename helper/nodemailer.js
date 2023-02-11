const nodemailer = require("nodemailer")

module.exports={

    mailSend()  {   

      nodemailer
        .createTransport({
          service: "Gmail",
          auth: {
            user: "kshubh8604@gmail.com",
            pass: "ssruulevuyoniehi",
          },
        })       
    }

}