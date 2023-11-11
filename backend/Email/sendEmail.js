const nodemailer = require("nodemailer");
require('dotenv').config();
//const fs = require("fs");
const sendEmail = async (email, subject, text,pdf,data) => {
	try {
		const transporter = nodemailer.createTransport({
			service:"gmail",
			auth:{
				user:process.env.USER,
				pass:process.env.PASS
			}
		  });
		  if(!pdf){

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: text,
		});
	}else{
		//const file=data.tofile("certificate.pdf")
		//console.log(data);
		//attachment = fs.readFileSync(data).toString("base64");
		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: data+" "+subject,
			text: text,
			attachments: [
				{
					filename: 'Certificate.pdf',
					path:"C:/Users/NADA HEGAZY/Downloads/Course Certificate.pdf", //data
					//contentType: 'application/pdf',
					//encoding: 'base64'
				}
			]
		});

	}
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};
module.exports=sendEmail;