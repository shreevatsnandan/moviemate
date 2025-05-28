import * as React from 'react';

interface EmailTemplateProps {
  emailContent: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  emailContent,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
    <p>{emailContent}</p>
  </div>
);
