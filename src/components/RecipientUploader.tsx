import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export const RecipientUploader = ({ 
  recipients, 
  setRecipients 
}: {
  recipients: any[];
  setRecipients: (recipients: any[]) => void;
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddRecipient = () => {
    const emails = inputValue.split(',')
      .map(email => email.trim())
      .filter(email => email);
    
    const newRecipients = emails.map(email => ({
      email,
      domain: email.split('@')[1] || ''
    }));
    
    setRecipients([...recipients, ...newRecipients]);
    setInputValue('');
  };

  const removeRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Enter emails, separated by commas"
          className="border border-gray-300 rounded-lg px-3 py-2 flex-1"
        />
        <Button onClick={handleAddRecipient}>Add</Button>
      </div>
      
      <div className="max-h-60 overflow-y-auto">
        {recipients.map((recipient, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b">
            <span>{recipient.email}</span>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => removeRecipient(index)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
