import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Recipient {
  email: string;
  name?: string;
  domain?: string;
}

interface RecipientUploaderProps {
  recipients: Recipient[];
  setRecipients: (recipients: Recipient[]) => void;
}

export const RecipientUploader = ({ recipients, setRecipients }: RecipientUploaderProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddRecipient = () => {
    const emails = inputValue.split(',').map(email => email.trim()).filter(email => email);
    const newRecipients = emails.map(email => {
      // Extract domain from email
      const domain = email.split('@')[1];
      return { email, domain };
    });
    setRecipients([...recipients, ...newRecipients]);
    setInputValue('');
  };

  return (
    <div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter emails, comma separated"
          className="border border-gray-300 rounded-lg px-3 py-2 flex-grow"
        />
        <Button onClick={handleAddRecipient}>Add</Button>
      </div>
      <ul className="mt-4">
        {recipients.map((recipient, index) => (
          <li key={index} className="flex justify-between items-center py-2 border-b">
            <span>{recipient.email}</span>
            <Button 
              variant="destructive"
              size="sm"
              onClick={() => setRecipients(recipients.filter((_, i) => i !== index))}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
