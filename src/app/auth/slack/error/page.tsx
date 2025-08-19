'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { XCircle, RefreshCw, ArrowLeft, AlertTriangle, HelpCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Error Icon */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
            <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {error.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {error.description}
          </p>
        </div>

        {/* Error Details Card */}
        {(errorMessage || error.action) && (
          <Card className="p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-red-200 dark:border-red-800">
            {errorMessage && (
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  Error Details
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md font-mono">
                  {errorMessage}
                </p>
              </div>
            )}
            
            {error.action && (
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  What to do next
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {error.action}
                </p>
              </div>
            )}
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {isRetryable && (
            <ConnectSlackButton
              size="lg"
              className="w-full"
              onConnect={() => {
                console.log('Retrying Slack connection...');
              }}
              onError={(error) => {
                console.error('Retry failed:', error);
              }}
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </ConnectSlackButton>
          )}
          
          <Button 
            onClick={handleGoBack}
            variant="outline" 
            size="lg" 
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>

        {/* Help Links */}
        <div className="text-center space-y-2">
          {needsSupport && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              If this error persists, please{' '}
              <a 
                href="/support" 
                className="text-red-600 dark:text-red-400 hover:underline font-medium"
              >
                contact our support team
              </a>
            </p>
          )}
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help?{' '}
            <a 
              href="/docs/troubleshooting" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              View troubleshooting guide
            </a>
            {' '}or{' '}
            <a 
              href="/docs/slack-permissions" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              learn about permissions
            </a>
          </p>
        </div>

        {/* Error Code Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
            <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}