import nodemailer from "nodemailer";
export const sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abdoyoyo14@gmail.com",
      pass: "Abdoyoyo@1234",
    },
  });

  async function main() {
    const info = await transporter.sendMail({
      from: '"yoyo 👻" <abdoyoyo14@gmail.com>', // sender address
      to: "drabdo10100@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      html: "<b>Hello world?</b>", // html body
    });
  }
  console.log("Message sent: %s");
};
