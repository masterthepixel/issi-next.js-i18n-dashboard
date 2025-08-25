"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { FormattedMessage } from "react-intl";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 bg-destructive/10 border border-destructive/20 rounded-lg">
          <h2 className="text-xl font-bold text-destructive mb-2">
            <FormattedMessage id="common.error.boundary.title" defaultMessage="Something went wrong" />
          </h2>
          <p className="text-destructive/80">
            <FormattedMessage id="common.error.boundary.message" defaultMessage="We're sorry, but this part of the application has encountered an error." />
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
