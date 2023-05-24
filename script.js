// Add submit event listener to the form
contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
  
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const coverLetter = document.getElementById('cover-letter').checked;
    const resume = document.getElementById('resume').checked;
  
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.comcast.net', // Comcast SMTP server
      port: 587, // Port for SMTP
      secure: false, // Set to true if using a secure connection (e.g., TLS)
      auth: {
        user: 'scott-tuschl@comcast.net', // Your email address
        pass: 'GOOarmy1989!', // Your email account password
      },
    });
  
    // Compose the email message
    const emailMessage = `
      Name: ${name}
      Email: ${email}
      Mobile: ${mobile}
      Subject: ${subject}
      Message: ${message}
      Cover Letter Requested: ${coverLetter ? 'Yes' : 'No'}
      Resume Requested: ${resume ? 'Yes' : 'No'}
    `;
  
    // Send the email
    transporter.sendMail(
      {
        from: email, // Use the user's entered email as the 'from' field
        to: 'scott-tuschl@comcast.net',
        subject: 'New Contact Form Submission',
        text: emailMessage,
      },
      (error, info) => {
        if (error) {
          console.error(error);
          // Handle the error, e.g., show an error message to the user
        } else {
          console.log('Email sent:', info.response);
          // Handle the success, e.g., show a success message to the user
        }
      }
    );
  });
  transporter.debug = true;
