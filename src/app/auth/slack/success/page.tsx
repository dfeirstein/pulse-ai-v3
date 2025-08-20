'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, ArrowRight, Settings, BarChart3, Sparkles, Star } from 'lucide-react';
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
    <div className="min-h-screen bg-background-warm relative overflow-hidden flex items-center justify-center p-4">
      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-turquoise/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-orange/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-pink/10 rounded-full blur-xl animate-float" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Floating Icons */}
        <div className="absolute top-32 right-1/4 text-purple/20 animate-float">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="absolute bottom-1/3 left-32 text-turquoise/20 animate-float" style={{ animationDelay: '1.5s' }}>
          <Star className="w-6 h-6" />
        </div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Success Icon with Animation */}
        <div className="text-center animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-turquoise/20 rounded-full mb-6 relative">
            <CheckCircle className="w-10 h-10 text-turquoise animate-fade-in-up" style={{ animationDelay: '0.3s' }} />
            <div className="absolute inset-0 bg-turquoise/10 rounded-full animate-ping"></div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            <span className="font-handwritten text-turquoise">Successfully</span> Connected!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Pulse AI is now connected to your Slack workspace
          </p>
          {workspaceName && (
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200">
              <SlackIcon className="w-5 h-5 text-purple" />
              <strong className="text-gray-900">{workspaceName}</strong>
            </div>
          )}
        </div>

        {/* Next Steps Card */}
        <Card className="card-culture backdrop-blur-sm bg-white/80 border-gray-200 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="font-semibold text-gray-900 mb-6 flex items-center gap-2 text-xl">
            <Settings className="w-6 h-6 text-purple" />
            <span className="font-handwritten text-purple">Next Steps</span>
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-turquoise/20 rounded-full flex items-center justify-center text-turquoise text-sm font-bold">
                1
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">
                  Choose channels to monitor
                </p>
                <p className="text-sm text-gray-600">
                  Select which Slack channels you&apos;d like Pulse AI to analyze for team sentiment
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple/20 rounded-full flex items-center justify-center text-purple text-sm font-bold">
                2
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">
                  View your team insights
                </p>
                <p className="text-sm text-gray-600">
                  Start seeing real-time sentiment analysis and team health metrics
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button 
            onClick={handleSetupChannels}
            size="lg" 
            className="w-full bg-black text-white hover:bg-gray-800 rounded-full font-semibold px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 transform"
          >
            <Settings className="w-5 h-5" />
            Set Up Channel Monitoring
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <Button 
            onClick={handleContinue}
            variant="outline" 
            size="lg" 
            className="w-full border-2 border-gray-300 text-gray-900 hover:border-gray-400 rounded-full font-semibold px-8 py-4 transition-all duration-200 active:scale-95 transform"
          >
            <BarChart3 className="w-5 h-5" />
            View Dashboard
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-gray-500 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          Need help? Check out our{' '}
          <a 
            href="/docs/getting-started" 
            className="text-purple hover:underline font-medium"
          >
            getting started guide
          </a>
          {' '}or{' '}
          <a 
            href="/support" 
            className="text-purple hover:underline font-medium"
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
      <div className="min-h-screen bg-background-warm flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-turquoise/20 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-turquoise" />
          </div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}