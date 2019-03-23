declare module '@hellroot/config' {
  interface IConfig {
    /**
     * Flag that enables additional logging and inspecting
     */
    debug: boolean;

    /**
     * Application version (e.g. dev, 1.1.0, 98ef454)
     */
    version: string;

    /**
     * Environment usually set by NODE_ENV (e.g. local, development, production)
     */
    environment: string;

    /**
     * Settings for backend
     */
    backend: {
      /**
       * API url prefix (e.g. https://api.weather.yandex.ru/v1/)
       */
      baseUrl: string;
    };

    /**
     * NodeJS server options
     */
    server: {
      /**
       * Port to listen on
       */
      port: number;
    };
  }

  type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };
  export type IConfigPart = RecursivePartial<IConfig>;

  const config: IConfig;
  export default config;
}
