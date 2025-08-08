import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const GmailAccountSelector = ({ 
  value, 
  onChange 
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  // Mock data - replace with real data from your app
  const accounts = [
    { id: '1', email: 'user1@gmail.com' },
    { id: '2', email: 'user2@gmail.com' },
  ];

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Select Gmail Account</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {accounts.map(account => (
            <div key={account.id} className="flex items-center justify-between">
              <span>{account.email}</span>
              <Button 
                variant={value === account.id ? 'default' : 'outline'}
                onClick={() => onChange(account.id)}
              >
                {value === account.id ? 'Selected' : 'Select'}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
