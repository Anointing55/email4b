// frontend/src/components/RecipientUploader.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface Recipient {
  email: string;
  domain: string;
}

interface RecipientUploaderProps {
  recipients: Recipient[];
  setRecipients: (recipients: Recipient[]) => void;
}

export const RecipientUploader: React.FC<RecipientUploaderProps> = ({
  recipients,
  setRecipients,
}) => {
  const [inputValue, setInputValue] = useState("");

  const isValidEmail = (email: string) => {
    // Corrected email validation regex (escaped dot)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleAddRecipient = () => {
    const emails = inputValue
      .split(/[\s,]+/) // allow comma, space, or newline
      .map((email) => email.trim().toLowerCase())
      .filter((email) => email && isValidEmail(email));

    if (emails.length === 0) {
      alert("Please enter valid email addresses.");
      return;
    }

    const newRecipients: Recipient[] = emails
      .filter((email) => !recipients.some((r) => r.email === email)) // avoid duplicates
      .map((email) => ({
        email,
        domain: email.split("@")[1] || "",
      }));

    if (newRecipients.length === 0) {
      alert("All entered emails are already in the list.");
      return;
    }

    setRecipients([...recipients, ...newRecipients]);
    setInputValue("");
  };

  const removeRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Email Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter emails, separated by commas or spaces"
          className="border border-gray-300 rounded-lg px-3 py-2 flex-1 text-sm"
        />
        <Button onClick={handleAddRecipient}>Add</Button>
      </div>

      {/* Recipient List */}
      <div className="max-h-60 overflow-y-auto border rounded-lg divide-y">
        {recipients.length === 0 ? (
          <p className="text-gray-500 text-sm p-3">No recipients added yet.</p>
        ) : (
          recipients.map((recipient, index) => (
            <div
              key={`${recipient.email}-${index}`} // safer unique key
              className="flex justify-between items-center p-2"
            >
              <span className="text-sm">{recipient.email}</span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeRecipient(index)}
              >
                Remove
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
