import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export interface PromModuleOptions {
  // [key: string]: any;

  /**
   * Enable default metrics
   * Under the hood, that call collectDefaultMetrics()
   */
  withDefaultsMetrics?: boolean;

  /**
   * Enable internal controller to expose /metrics
   * Caution: If you have a global prefix, don't forget to prefix it in prom
   */
  withDefaultController?: boolean;

  /**
   * Create automatically http_requests_total counter
   */
  useHttpCounterMiddleware?: boolean;

  /**
   * Eanble or not the global interceptor
   * Usefull to catch exception thrown by your app
   */
  withGlobalInterceptor?: boolean;

  registryName?: string;
  prefix?: string;

  /**
   * Set the defaults labels
   */
  defaultLabels?: {
    [key: string]: string|number,
  };

  customUrl?: string;
}

export interface TypeOrmOptionsFactory {
  createTypeOrmOptions(
    connectionName?: string,
  ): Promise<PromModuleOptions> | PromModuleOptions;
}

export interface PromModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<TypeOrmOptionsFactory>;
  useClass?: Type<TypeOrmOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<PromModuleOptions> | PromModuleOptions;
  inject?: any[];
}
