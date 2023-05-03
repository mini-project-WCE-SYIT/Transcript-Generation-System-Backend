const nodemailer = require("nodemailer");

const sendEmail = () => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });
  
  let mailOptions = {
    from: process.env.SENDER_EMAIL, 
    to: "prajwal.shah@walchandsangli.ac.in", 
    subject: "Your Transcript request has been received",
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>College Transcript Request Confirmation</title>
        <style>
          /* Add some basic styling to the email */
          body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            color: #333333;
            line-height: 1.5;
          }
    
          h2 {
            font-size: 24px;
            margin-top: 20px;
            margin-bottom: 20px;
          }
    
          h4 {
            font-size: 18px;
            margin-top: 30px;
            margin-bottom: 10px;
          }
    
          p {
            margin-top: 0;
            margin-bottom: 20px;
          }
    
          a {
            color: #0072c6;
            text-decoration: none;
          }
    
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h2>Thank you for submitting your college transcript request</h2>
        <h4>Hello,</h4>
        <p>We have received your request to generate your college transcript, and our team is working on it.</p>
        <p>Please allow <strong>3-5 business days</strong> for processing. We will send you another email with the download link to your transcript once it is ready.</p>
        <p>If you have any questions or concerns, please don't hesitate to <a href="mailto:transcripts@walchand.edu">contact us</a>.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>Walchand College of Engineering</strong></p>
      </body>
    </html>
    

    `,
  };
  
  let mailOptions2 = {
    from: process.env.SENDER_EMAIL, 
    to: "prajwalshah.2003@gmail.com", 
    subject: "New Transcript Request for Exam Cell Review",
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            color: #333333;
          }
          .container {
            margin: 20px auto;
            max-width: 600px;
            border: 1px solid #dddddd;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
          }
          h2 {
            font-size: 28px;
            color: #007bff;
            margin: 0;
          }
          h4 {
            font-size: 20px;
            color: #333333;
            margin: 0;
          }
          p {
            margin: 10px 0;
          }
          .signature {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>New Transcript Request for Exam Cell Review</h2>
          <p>Dear Exam Cell Team,</p>
          <p>
            I hope this email finds you well. I am writing to notify you that a new
            applicant has requested a college transcript. We kindly ask that you
            review this request and process it as soon as possible.
          </p>
          <p>The applicant's information is as follows:</p>
          <ul>
            <li>Name: Prajwal Shah</li>
            <li>Student ID: 123456789</li>
            <li>Program: Computer Science Engineering</li>
            <li>Batch: 2018-2022</li>
          </ul>
          <p>
            Please let us know if you require any additional information or
            documentation from the applicant. Once the transcript has been processed,
            we will send an email notification to the applicant with the download
            link to their transcript.
          </p>
          <p>
            Thank you for your attention to this matter. If you have any questions or
            concerns, please don't hesitate to contact us.
          </p>
          <p class="signature">Best regards,</p>
          <p>Walchand College of Engineering Exam Cell Team</p>
        </div>
      </body>
    </html>
    `,
  };
  
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });
  transporter.sendMail(mailOptions2, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendEmail;

