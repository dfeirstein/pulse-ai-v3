'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, ArrowRight, Settings, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SlackIcon } from '@/components/icons/slack-icon';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceId, setWorkspaceId] = useState('');
  
  useEffect(() => {
    const name = searchParams.get('workspace_name');
    const id = searchParams.get('workspace_id');
    
    if (name) setWorkspaceName(decodeURIComponent(name));
    if (id) setWorkspaceId(id);
  }, [searchParams]);

  const handleContinue = () => {
    // Navigate to dashboard or channel selection page
    if (workspaceId) {
      router.push(`/dashboard?workspace=${workspaceId}`);
    } else {
      router.push('/dashboard');
    }
  };

  const handleSetupChannels = () => {
    // Navigate to channel configuration
    if (workspaceId) {
      router.push(`/settings/channels?workspace=${workspaceId}`);
    } else {
      router.push('/settings/channels');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Success Icon */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Successfully Connected!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Pulse AI is now connected to your Slack workspace
            {workspaceName && (
              <span className="inline-flex items-center gap-1 mt-1">
                <SlackIcon className="w-4 h-4 text-purple-600" />
                <strong>{workspaceName}</strong>
              </span>
            )}
          </p>
        </div>

        {/* Next Steps Card */}
        <Card className="p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-green-200 dark:border-green-800">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-green-600" />
            Next Steps
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 text-sm font-medium">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Choose channels to monitor
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Select which Slack channels you&apos;d like Pulse AI to analyze for team sentiment
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 text-sm font-medium">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  View your team insights
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Start seeing real-time sentiment analysis and team health metrics
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleSetupChannels}
            size="lg" 
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
          >
            <Settings className="w-4 h-4" />
            Set Up Channel Monitoring
            <ArrowRight className="w-4 h-4" />
          </Button>
          
          <Button 
            onClick={handleContinue}
            variant="outline" 
            size="lg" 
            className="w-full"
          >
            <BarChart3 className="w-4 h-4" />
            View Dashboard
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Need help? Check out our{' '}
          <a 
            href="/docs/getting-started" 
            className="text-green-600 dark:text-green-400 hover:underline"
          >
            getting started guide
          </a>
          {' '}or{' '}
          <a 
            href="/support" 
            className="text-green-600 dark:text-green-400 hover:underline"
          >
            contact support
          </a>
        </p>
      </div>
    </div>
  );
}

export default function SlackSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}