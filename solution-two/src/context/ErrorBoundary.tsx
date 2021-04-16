import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorPage from 'next/error';

import { ErrorContext } from './ErrorContext';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public static contextType = ErrorContext;

  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.context.callLogger({
      logEventName: 'Uncaught error:',
      logError: error,
      logMessage: error.message,
      logErrorInfo: errorInfo,
    });
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorPage statusCode={500} title="Something went wrong." />;
    }

    return this.props.children;
  }
}
