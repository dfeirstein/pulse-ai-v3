'use client';

import { useState } from 'react';
import { Button } from './button';
import { SlackIcon } from '@/components/icons/slack-icon';
import { Loader2 } from 'lucide-react';

interface ConnectSlackButtonProps {
  /**
   * Button size variant
   */
  size?: 'default' | 'sm' | 'lg';
  /**
   * Custom class names
   */
  className?: string;
  /**
   * Button text override
   */
  children?: React.ReactNode;
  /**
   * Callback fired when OAuth flow starts
   */
  onConnect?: () => void;
  /**
   * Callback fired when OAuth flow fails to start
   */
  onError?: (error: string) => void;
  /**
   * Whether button should be disabled
   */
  disabled?: boolean;
}

export function ConnectSlackButton({
  size = 'default',
  className,
  children,
  onConnect,
  onError,
  disabled = false
}: ConnectSlackButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (isConnecting || disabled) return;
    
    try {
      setIsConnecting(true);
      onConnect?.();
      
      // Redirect to OAuth install endpoint
      window.location.href = '/api/auth/slack/install';
    } catch (error) {
      console.error('Failed to start Slack OAuth:', error);
      setIsConnecting(false);
      onError?.(error instanceof Error ? error.message : 'Failed to connect to Slack');
    }
  };

  return (
    <Button
      onClick={handleConnect}
      disabled={disabled || isConnecting}
      variant="primary"
      size={size}
      className={className}
    >
      {isConnecting ? (
        <Loader2 className="animate-spin" />
      ) : (
        <SlackIcon />
      )}
      {children || (isConnecting ? 'Connecting...' : 'Connect to Slack')}
    </Button>
  );
}

/**
 * Connect to Slack button with icon only
 */
export function ConnectSlackIconButton({
  className,
  onConnect,
  onError,
  disabled = false
}: Omit<ConnectSlackButtonProps, 'size' | 'children'>) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (isConnecting || disabled) return;
    
    try {
      setIsConnecting(true);
      onConnect?.();
      
      window.location.href = '/api/auth/slack/install';
    } catch (error) {
      console.error('Failed to start Slack OAuth:', error);
      setIsConnecting(false);
      onError?.(error instanceof Error ? error.message : 'Failed to connect to Slack');
    }
  };

  return (
    <Button
      onClick={handleConnect}
      disabled={disabled || isConnecting}
      variant="primary"
      size="icon"
      className={className}
      title={isConnecting ? 'Connecting to Slack...' : 'Connect to Slack'}
    >
      {isConnecting ? (
        <Loader2 className="animate-spin" />
      ) : (
        <SlackIcon />
      )}
    </Button>
  );
}

/**
 * Large call-to-action Connect to Slack button
 */
export function ConnectSlackCTA({
  className,
  onConnect,
  onError,
  disabled = false
}: Omit<ConnectSlackButtonProps, 'size' | 'children'>) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (isConnecting || disabled) return;
    
    try {
      setIsConnecting(true);
      onConnect?.();
      
      window.location.href = '/api/auth/slack/install';
    } catch (error) {
      console.error('Failed to start Slack OAuth:', error);
      setIsConnecting(false);
      onError?.(error instanceof Error ? error.message : 'Failed to connect to Slack');
    }
  };

  return (
    <Button
      onClick={handleConnect}
      disabled={disabled || isConnecting}
      variant="primary"
      size="lg"
      className={className}
    >
      {isConnecting ? (
        <Loader2 className="animate-spin size-6" />
      ) : (
        <SlackIcon className="size-6" />
      )}
      <span className="flex flex-col items-start">
        <span className="font-semibold">
          {isConnecting ? 'Connecting to Slack...' : 'Connect to Slack'}
        </span>
        <span className="text-sm opacity-90 font-normal">
          Start analyzing your team&apos;s sentiment
        </span>
      </span>
    </Button>
  );
}