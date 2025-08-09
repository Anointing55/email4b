"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, Mail, History, LogOut } from 'lucide-react';
import { GmailAccountCard } from '@/components/GmailAccountCard';
import { useAuth } from '@/lib/auth';

export default function Dashboard() {
  const [gmailAccounts, setGmailAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/gmail/accounts');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setGmailAccounts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch Gmail accounts', error);
        setGmailAccounts([]); // fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchAccounts();
  }, [user?.email]);

  const handleConnectAccount = async () => {
    try {
      const response = await fetch('/api/gmail/auth');
      if (!response.ok) throw new Error('Failed to start OAuth flow');
      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      console.error(error);
      alert('Unable to start Gmail connection. Please try again.');
    }
  };

  const handleDisconnect = async (accountId: string) => {
    try {
      const res = await fetch(`/api/gmail/accounts/${accountId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to disconnect');
      setGmailAccounts((accounts) => accounts.filter((a) => a.id !== accountId));
    } catch (error) {
      console.error(error);
      alert('Unable to disconnect this account.');
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-500">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Outreach Pilot
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-indigo-700 font-medium">{user.email}</span>
            <Button
              onClick={logout}
              variant="outline"
              className="border-indigo-300 text-indigo-600 flex items-center"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Side Navigation */}
          <div className="w-full md:w-64">
            <Card className="bg-white border-0 shadow-lg rounded-xl">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Button className="w-full justify-start bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600">
                    <Mail className="mr-2 h-4 w-4" /> Gmail Accounts
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                    onClick={() => router.push('/send')}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> New Campaign
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                    onClick={() => router.push('/history')}
                  >
                    <History className="mr-2 h-4 w-4" /> History
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-indigo-900">Connected Gmail Accounts</h2>
              <Button
                onClick={handleConnectAccount}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white flex items-center"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Connect Account
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : gmailAccounts.length === 0 ? (
              <Card className="bg-white border-0 shadow-lg rounded-xl">
                <CardContent className="p-8 text-center">
                  <Mail className="mx-auto h-16 w-16 text-indigo-300" />
                  <h3 className="mt-4 text-xl font-medium text-gray-900">No connected accounts</h3>
                  <p className="mt-2 text-gray-500">
                    Connect your first Gmail account to start sending outreach campaigns
                  </p>
                  <Button
                    onClick={handleConnectAccount}
                    className="mt-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
                  >
                    Connect Gmail Account
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gmailAccounts.map((account) => (
                  <GmailAccountCard
                    key={account.id}
                    account={account}
                    onSend={() => router.push(`/send?account=${account.id}`)}
                    onDisconnect={() => handleDisconnect(account.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
