'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { XCircle, RefreshCw, ArrowLeft, AlertTriangle, HelpCircle, Heart, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ConnectSlackButton } from '@/components/ui/connect-slack-button';

interface SlackError {
  code: string;
  title: string;
  description: string;
  action?: string;
}

const SLACK_ERRORS: Record<string, SlackError> = {
  access_denied: {
    code: 'access_denied',
    title: 'Authorization Cancelled',
    description: 'You cancelled the Slack authorization process. No data was shared.',
    action: 'Try connecting again when you\'re ready to proceed.'
  },
  invalid_request: {
    code: 'invalid_request',
    title: 'Invalid Request',
    description: 'The OAuth request was malformed or missing required parameters.',
    action: 'Please try starting the connection process again.'
  },
  oauth_failed: {
    code: 'oauth_failed',
    title: 'Connection Failed',
    description: 'We couldn\'t complete the connection to your Slack workspace.',
    action: 'Please try again or contact support if the problem persists.'
  },
  invalid_code: {
    code: 'invalid_code',
    title: 'Invalid Authorization Code',
    description: 'The authorization code from Slack was invalid or expired.',
    action: 'Please start the connection process again.'
  },
  code_already_used: {
    code: 'code_already_used', 
    title: 'Authorization Code Already Used',
    description: 'This authorization code has already been used.',
    action: 'Please start a new connection process.'
  },
  invalid_redirect_uri: {
    code: 'invalid_redirect_uri',
    title: 'Configuration Error',
    description: 'There was a configuration issue with the OAuth redirect.',
    action: 'Please contact support to resolve this issue.'
  },
  insufficient_scope: {
    code: 'insufficient_scope',
    title: 'Missing Permissions',
    description: 'Pulse AI needs specific permissions to analyze your team\'s sentiment.',
    action: 'Please ensure you grant all requested permissions when connecting.'
  },
  default: {
    code: 'unknown_error',
    title: 'Connection Error',
    description: 'An unexpected error occurred while connecting to Slack.',
    action: 'Please try again or contact support if the problem continues.'
  }
};

function ErrorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<SlackError>(SLACK_ERRORS.default as SlackError);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  useEffect(() => {
    const errorCode = searchParams.get('error') || 'default';
    const message = searchParams.get('message');
    
    setError(SLACK_ERRORS[errorCode] || SLACK_ERRORS.default as SlackError);
    if (message) {
      setErrorMessage(decodeURIComponent(message));
    }
  }, [searchParams]);

  const handleGoBack = () => {
    router.push('/');
  };


  const isRetryable = !['invalid_redirect_uri', 'insufficient_scope'].includes(error.code);
  const needsSupport = ['invalid_redirect_uri', 'oauth_failed'].includes(error.code);

  return (
    <div className="min-h-screen bg-background-warm relative overflow-hidden flex items-center justify-center p-4">
      {/* Floating Decorative Elements - Softer for error page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple/5 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-pink/5 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-turquoise/5 rounded-full blur-xl animate-float" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Floating Icons */}
        <div className="absolute top-32 right-1/4 text-orange/15 animate-float">
          <Heart className="w-6 h-6" />
        </div>
        <div className="absolute bottom-1/3 left-32 text-purple/15 animate-float" style={{ animationDelay: '1.5s' }}>
          <Lightbulb className="w-5 h-5" />
        </div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Error Icon with Softer Design */}
        <div className="text-center animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange/20 rounded-full mb-6 relative">
            <XCircle className="w-10 h-10 text-orange animate-fade-in-up" style={{ animationDelay: '0.3s' }} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            <span className="font-handwritten text-orange">Oops!</span> {error.title}
          </h1>
          <p className="text-lg text-gray-600">
            {error.description}
          </p>
        </div>

        {/* Error Details Card */}
        {(errorMessage || error.action) && (
          <Card className="card-culture backdrop-blur-sm bg-white/80 border-gray-200 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {errorMessage && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                  <AlertTriangle className="w-5 h-5 text-orange" />
                  <span className="font-handwritten text-orange">Error Details</span>
                </h3>
                <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg font-mono border border-gray-100">
                  {errorMessage}
                </p>
              </div>
            )}
            
            {error.action && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                  <HelpCircle className="w-5 h-5 text-purple" />
                  <span className="font-handwritten text-purple">What to do next</span>
                </h3>
                <p className="text-gray-600">
                  {error.action}
                </p>
              </div>
            )}
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {isRetryable && (
            <ConnectSlackButton
              size="lg"
              className="w-full bg-black text-white hover:bg-gray-800 rounded-full font-semibold px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 transform"
              onConnect={() => {
                console.log('Retrying Slack connection...');
              }}
              onError={(error) => {
                console.error('Retry failed:', error);
              }}
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </ConnectSlackButton>
          )}
          
          <Button 
            onClick={handleGoBack}
            variant="outline" 
            size="lg" 
            className="w-full border-2 border-gray-300 text-gray-900 hover:border-gray-400 rounded-full font-semibold px-8 py-4 transition-all duration-200 active:scale-95 transform"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Button>
        </div>

        {/* Help Links */}
        <div className="text-center space-y-3 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {needsSupport && (
            <p className="text-sm text-gray-600">
              If this error persists, please{' '}
              <a 
                href="/support" 
                className="text-orange hover:underline font-medium"
              >
                contact our support team
              </a>
            </p>
          )}
          
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <a 
              href="/docs/troubleshooting" 
              className="text-purple hover:underline font-medium"
            >
              View troubleshooting guide
            </a>
            {' '}or{' '}
            <a 
              href="/docs/slack-permissions" 
              className="text-purple hover:underline font-medium"
            >
              learn about permissions
            </a>
          </p>
        </div>

        {/* Error Code Footer */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <p className="text-xs text-gray-400 bg-white/50 backdrop-blur-sm rounded-full px-3 py-1 inline-block border border-gray-200">
            Error Code: {error.code.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SlackErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background-warm flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange/20 rounded-full mb-6">
            <XCircle className="w-10 h-10 text-orange" />
          </div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}