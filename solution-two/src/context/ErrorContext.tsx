import React, { useContext, useMemo, useState } from 'react';

import { useLogger, LoggerType } from '@utils/useLogger';
import { noop } from '@utils/noop';

interface IErrorContext {
  callLogger: LoggerType;
}

const defaultValue: IErrorContext = {
  callLogger: noop,
};

export const ErrorContext = React.createContext<IErrorContext>(defaultValue);

export const ErrorContextProvider: React.FC = ({ children }) => {
  const callLogger = useLogger();

  const stateValue: IErrorContext = useMemo(
    () => ({
      callLogger,
    }),
    [callLogger],
  );

  return <ErrorContext.Provider value={stateValue}>{children}</ErrorContext.Provider>;
};

export const useErrorContext = () => useContext(ErrorContext);
