"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Component, ErrorInfo, ReactNode } from "react";
import { useIntl } from "react-intl";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error | null;
    retryCount: number;
}

class APIErrorBoundary extends Component<Props, State> {
    private retryTimeout: NodeJS.Timeout | null = null;

    public state: State = {
        hasError: false,
        error: null,
        retryCount: 0,
    };

    public static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
            retryCount: 0
        };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("API Error Boundary caught an error:", error, errorInfo);

        // Check if it's an API-related error
        const isAPIError = error.message.includes('API') ||
            error.message.includes('fetch') ||
            error.message.includes('network') ||
            error.message.includes('Failed to fetch');

        if (isAPIError && this.state.retryCount < 3) {
            // Auto-retry API errors up to 3 times with exponential backoff
            const delay = Math.pow(2, this.state.retryCount) * 1000; // 1s, 2s, 4s
            this.retryTimeout = setTimeout(() => {
                this.handleRetry();
            }, delay);
        }
    }

    public componentWillUnmount() {
        if (this.retryTimeout) {
            clearTimeout(this.retryTimeout);
        }
    }

    private handleRetry = () => {
        this.setState(prevState => ({
            hasError: false,
            error: null,
            retryCount: prevState.retryCount + 1
        }));
    };

    private handleManualRetry = () => {
        this.setState({ retryCount: 0 }); // Reset retry count for manual retry
        this.handleRetry();
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <APIErrorFallback
                    error={this.state.error}
                    retryCount={this.state.retryCount}
                    onRetry={this.handleManualRetry}
                />
            );
        }

        return this.props.children;
    }
}

// Separate component for the fallback UI to use hooks
function APIErrorFallback({
    error,
    retryCount,
    onRetry
}: {
    error: Error | null | undefined;
    retryCount: number;
    onRetry: () => void;
}) {
    const intl = useIntl();

    const isAPIError = error?.message.includes('API') ||
        error?.message.includes('fetch') ||
        error?.message.includes('network') ||
        error?.message.includes('Failed to fetch');

    const isRateLimited = error?.message.includes('429') ||
        error?.message.includes('rate limit') ||
        error?.message.includes('too many requests');

    return (
        <div className="space-y-6">
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="font-medium mb-1">
                            {isRateLimited
                                ? intl.formatMessage({
                                    id: "api.error.rateLimited",
                                    defaultMessage: "Too many requests - please wait"
                                })
                                : isAPIError
                                    ? intl.formatMessage({
                                        id: "api.error.connection",
                                        defaultMessage: "Connection error - unable to load data"
                                    })
                                    : intl.formatMessage({
                                        id: "api.error.general",
                                        defaultMessage: "An error occurred while loading data"
                                    })
                            }
                            <div className="mt-2 text-xs text-muted-foreground">
                                {intl.formatMessage({
                                    id: "api.error.help",
                                    defaultMessage: "Please check your internet connection and try again."
                                })}
                            </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {retryCount > 0 && (
                                <span>
                                    {intl.formatMessage({
                                        id: "api.error.retryAttempt",
                                        defaultMessage: "Retry attempt: {count}"
                                    }, { count: retryCount })}
                                </span>
                            )}
                            {process.env.NODE_ENV === 'development' && error?.message && (
                                <div className="mt-1 text-xs font-mono bg-muted p-2 rounded">
                                    {error.message}
                                </div>
                            )}
                            {isRateLimited && (
                                <div className="mt-1">
                                    {intl.formatMessage({
                                        id: "api.error.rateLimited.message",
                                        defaultMessage: "The server is receiving too many requests. Please wait a moment before trying again."
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onRetry}
                        className="ml-4 flex items-center gap-2"
                    >
                        <RefreshCw className="h-3 w-3" />
                        {intl.formatMessage({
                            id: "common.retry",
                            defaultMessage: "Retry"
                        })}
                    </Button>
                </AlertDescription>
            </Alert>
        </div>
    );
}

export default APIErrorBoundary;
