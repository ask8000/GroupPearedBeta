const sendEmail = async () => {
  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': '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', // Replace with your Brevo API key
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: {
          name: 'Sender Alex',
          email: 'pearedco@gmail.com'
        },
        to: [
          {
            email: 'yannathan274@gmail.com',
            name: 'John Doe'
          }
        ],
        subject: 'Hello world',
        htmlContent: '<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Brevo.</p></body></html>'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    console.log('Email sent successfully:', data);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};

sendEmail();