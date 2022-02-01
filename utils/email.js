const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = class Email {
  constructor(user, url = '', company = '') {
    this.user = user;
    this.to = user.email;
    this.url = url;
    this.company = company;
    this.fromEmail = 'hunter@leappage.com';
    this.fromName = 'Hunter at LeapPage';
    this.address = '4217 Pine Heights Drive NE';
    this.city = 'Atlanta';
    this.state = 'GA';
    this.zip = '30324';
  }

  async sendInvite() {
    const mailOptions = {
      to: this.to,
      from: {
        email: this.fromEmail,
        name: this.fromName,
      },
      asm: {
        group_id: 18266,
      },
      templateId: 'd-8a9042aa54ef4059bba6a751e6e38369',
      dynamic_template_data: {
        company: this.company,
        url: this.url,
        name: this.user.name,
      },
    };

    await sgMail.send(mailOptions).then(() => {}, console.error);
  }

  async sendWelcome() {
    const mailOptions = {
      to: this.to,
      from: {
        email: this.fromEmail,
        name: this.fromName,
      },
      asm: {
        group_id: 18266,
      },
      templateId: 'd-d9263a9146264a3aa12f656f35f7cd28',
      dynamic_template_data: {
        name: this.user.name,
      },
    };

    await sgMail.send(mailOptions).then(() => {}, console.error);
  }
};
