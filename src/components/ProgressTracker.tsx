import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const ProgressTracker = ({ campaignId }: { campaignId: string }) => {
  const [progress, setProgress] = useState(0);
  const [sentCount, setSentCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('queued');

  useEffect(() => {
    const eventSource = new EventSource(`/api/campaigns/${campaignId}/progress`);
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSentCount(data.sentCount);
      setTotal(data.total);
      setStatus(data.status);
      
      // Calculate progress percentage
      if (data.total > 0) {
        setProgress(Math.round((data.sentCount / data.total) * 100));
      }
      
      // Close connection when campaign is complete
      if (data.status === 'completed') {
        eventSource.close();
      }
    };
    
    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      eventSource.close();
    };
    
    return () => {
      eventSource.close();
    };
  }, [campaignId]);

  const getStatusColor = () => {
    switch (status) {
      case 'queued': return 'bg-gray-500';
      case 'sending': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-white border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Campaign Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${getStatusColor()}`}></span>
              <span className="text-sm font-medium capitalize">
                {status === 'sending' ? 'In Progress' : status}
              </span>
            </div>
            <span className="text-sm text-gray-600">
              {sentCount} of {total} sent
            </span>
          </div>
          
          <Progress value={progress} className="h-3" />
          
          <div className="text-center text-sm text-gray-600">
            {status === 'sending' ? (
              <span>Sending emails with human-like delays to avoid detection...</span>
            ) : status === 'completed' ? (
              <span className="text-green-600 font-medium">Campaign completed successfully!</span>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
