"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HistoryPage() {
  let user;
  try {
    ({ user } = useAuth());
  } catch {
    // During build, AuthProvider isn't mounted — avoid crashing
    return null;
  }

  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/campaigns?search=${encodeURIComponent(searchTerm)}&date=${dateFilter}`
        );
        const data = await response.json();
        setCampaigns(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch campaigns", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchCampaigns();
  }, [user, searchTerm, dateFilter]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">
          Please log in to view your campaign history.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Campaign History</h1>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search campaigns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border rounded p-2"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="all">All Dates</option>
          <option value="last7">Last 7 Days</option>
          <option value="last30">Last 30 Days</option>
        </select>
        <Button onClick={() => setSearchTerm("")}>Clear</Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : campaigns.length === 0 ? (
        <p className="text-gray-500">No campaigns found.</p>
      ) : (
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <h2 className="text-xl font-semibold">{campaign.name}</h2>
              <p className="text-gray-600">
                Sent on: {new Date(campaign.sentAt).toLocaleString()}
              </p>
              <p>Recipients: {campaign.recipientCount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
