'use client'; // Only if you're using App Router

import React from 'react';

export default function Home() {
    const handleSend = async (toMail, emailContent, subject, attachmentLink) => {
  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: toMail,
        content: emailContent,
        subject,
        attachment: attachmentLink,
      }),
    });

    const data = await response.json(); // <-- Will now work safely

    if (response.ok) {
      alert('Email sent successfully!');
    } else {
      alert('Failed to send email: ' + JSON.stringify(data));
    }
  } catch (err) {
    alert('Unexpected error: ' + err.message);
  }
};


  return (
    <div>
      <h1>Send Welcome Email</h1>
     
    <button
  onClick={() =>
     handleSend(
      'Ashishlohakare.2@gmail.com',
      'Hello this is a test mail', 
      'Welcome to Our App!',
      'https://pdfobject.com/pdf/sample.pdf' // or null if no attachment
    )
  }
>
  Send Email
</button>

    </div>
  );
}
