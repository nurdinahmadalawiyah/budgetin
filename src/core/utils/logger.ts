import {
  consoleTransport,
  logger,
  type LoggerInstance,
  type configLoggerType,
  type transportFunctionType,
} from 'react-native-logs';

type LogLevelName = 'debug' | 'info' | 'warn' | 'error';

type AppLogger = LoggerInstance<LogLevelName>;

const levels: Record<LogLevelName, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const configuredSeverity = process.env.EXPO_PUBLIC_LOG_LEVEL;

function getSeverity(): LogLevelName {
  if (
    configuredSeverity === 'debug' ||
    configuredSeverity === 'info' ||
    configuredSeverity === 'warn' ||
    configuredSeverity === 'error'
  ) {
    return configuredSeverity;
  }

  return __DEV__ ? 'debug' : 'info';
}

const transportOptions: configLoggerType<transportFunctionType<object>, LogLevelName>['transportOptions'] =
  {
    colors: {
      debug: 'white',
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
    extensionColors: {
      app: 'greenBright',
      api: 'cyanBright',
      database: 'magentaBright',
      store: 'yellow',
      ui: 'blue',
    },
  };

export const appLogger: AppLogger = logger.createLogger({
  async: true,
  dateFormat: 'time',
  enabled: true,
  fixedExtLvlLength: true,
  levels,
  printDate: true,
  printLevel: true,
  severity: getSeverity(),
  transport: consoleTransport,
  transportOptions,
});

export function createModuleLogger(namespace: string): AppLogger {
  return appLogger.extend(namespace);
}

export const apiLogger = createModuleLogger('api');
export const databaseLogger = createModuleLogger('database');
export const storeLogger = createModuleLogger('store');
