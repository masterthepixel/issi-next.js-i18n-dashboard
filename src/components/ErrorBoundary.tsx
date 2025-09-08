
"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error | null;
  errorInfo?: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <IntlProvider locale="en" messages={{
          "common.error.boundary.title": "Something went wrong",
          "common.error.boundary.message": "We're sorry, but this part of the application has encountered an error."
        }}>
          <div className="flex flex-col items-center justify-center h-full p-8 bg-destructive/10 border border-destructive/20 rounded-lg">
            <h2 className="text-destructive mb-2">
              <FormattedMessage id="common.error.boundary.title" defaultMessage="Something went wrong" />
            </h2>
            <p className="text-destructive/80">
              <FormattedMessage id="common.error.boundary.message" defaultMessage="We're sorry, but this part of the application has encountered an error." />
            </p>
            {this.state.error && (
              <pre className="text-xs text-left text-destructive/80 mt-4 overflow-x-auto max-w-2xl whitespace-pre-wrap">
                {this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            )}
          </div>
        </IntlProvider>
      );
    }

    // Return children directly without React.Children.only to avoid errors
    // This allows multiple children to be rendered safely
    return this.props.children;
  }
}

export default ErrorBoundary;
