"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Mail, Send, Trash2 } from "lucide-react";

export const GmailAccountCard = ({
  account,
  onSend,
  onDisconnect,
}: {
  account: any;
  onSend: () => void;
  onDisconnect: () => void;
}) => {
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${account.gmail_address}`;

  return (
    <Card className="bg-white border-0 shadow-lg rounded-xl overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-xl">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
        <div className="flex items-center">
          <div className="mr-3">
            <img
              src={avatarUrl}
              alt={account.gmail_address}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>
          <div>
            <h3 className="text-white font-semibold truncate">{account.gmail_address}</h3>
            <p className="text-indigo-100 text-sm">{account.label || "No label"}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex items-center text-gray-600">
          <Mail className="mr-2 h-4 w-4 text-indigo-500" />
          <span className="text-sm">
            Connected on {new Date(account.created_at).toLocaleDateString()}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 bg-gray-50 flex justify-between">
        <Button
          onClick={onSend}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white flex items-center"
        >
          <Send className="mr-2 h-4 w-4" /> Send Campaign
        </Button>
        <Button
          onClick={onDisconnect}
          variant="outline"
          className="border-red-300 text-red-600 hover:bg-red-50 flex items-center"
        >
          <Trash2 className="mr-2 h-4 w-4" /> Disconnect
        </Button>
      </CardFooter>
    </Card>
  );
};
