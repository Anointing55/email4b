// frontend/src/components/GmailAccountSelector.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GmailAccount {
  id: string;
  email: string;
}

interface GmailAccountSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

// Mock accounts — replace with API fetch later
const mockAccounts: GmailAccount[] = [
  { id: "1", email: "user1@gmail.com" },
  { id: "2", email: "user2@gmail.com" },
];

export const GmailAccountSelector: React.FC<GmailAccountSelectorProps> = ({
  value,
  onChange,
}) => {
  const accounts = mockAccounts; // later: load dynamically

  return (
    <Card className="mb-4 border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-indigo-800">Select Gmail Account</CardTitle>
      </CardHeader>
      <CardContent>
        {accounts.length === 0 ? (
          <p className="text-sm text-gray-500">No Gmail accounts available.</p>
        ) : (
          <div className="space-y-2">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
              >
                <span className="text-gray-700">{account.email}</span>
                <Button
                  variant={value === account.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => onChange(account.id)}
                >
                  {value === account.id ? "Selected" : "Select"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
