import { ErrorInfo, useCallback } from 'react';

/* eslint-disable no-console */
export enum ELogLevel {
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  INFORMATION = 'INFORMATION',
}

interface ILoggerInfo {
  logEventName?: string;
  logTime?: boolean;
  logMessage: string;
  logLevel?: ELogLevel;
  logError?: Error;
  logErrorInfo?: ErrorInfo;
}

export type LoggerType = (loggerInfo: ILoggerInfo) => void;

export const useLogger = (): LoggerType => {
  const callLogger: LoggerType = useCallback(
    ({ logEventName = '', logLevel = ELogLevel.INFORMATION, logMessage, logTime = false }) => {
      if (logTime) {
        const time = new Date();
        console.log(`${time.getSeconds()}:${time.getMilliseconds()}`);
      }

      console.log(`${logLevel}${logEventName ? ` -` : ''} ${logEventName}: ${logMessage}`);
    },
    [],
  );

  return callLogger;
};
