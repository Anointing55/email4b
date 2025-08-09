"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GmailAccountSelector } from "@/components/GmailAccountSelector";
import { RecipientUploader } from "@/components/RecipientUploader";
import { Loader2 } from "lucide-react";

export default function SendPage() {
  const router = useRouter();
  const [gmailAccountId, setGmailAccountId] = useState("");
  const [recipients, setRecipients] = useState<string[]>([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gmailAccountId || recipients.length === 0 || !subject || !body) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gmailAccountId,
          recipients,
          subject,
          body,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create campaign");
      }

      router.push("/history");
    } catch (error) {
      console.error(error);
      alert("Failed to send campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto shadow-lg rounded-xl border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b p-6">
            <CardTitle className="text-xl font-semibold text-indigo-800">
              Create New Campaign
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Gmail Account
                </label>
                <GmailAccountSelector
                  value={gmailAccountId}
                  onChange={setGmailAccountId}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Recipients
                </label>
                <RecipientUploader
                  recipients={recipients}
                  setRecipients={setRecipients}
                />
                {recipients.length > 0 && (
                  <p className="mt-1 text-sm text-gray-500">
                    {recipients.length} recipients added
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter email subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Body
                </label>
                <Textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={8}
                  placeholder="Write your email message..."
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Campaign"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
