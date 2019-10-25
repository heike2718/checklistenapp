// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  version: '4.3.3',
  envName: 'Development',
  apiUrl: 'http://localhost:9300/checklisten-api',
  authApiUrl: 'http://localhost:9000/authprovider',
  authUrl: 'http://localhost:4300',
  assetsUrl: 'assets',
  isDebugMode: true,
  signupRedirectUrl: 'http://localhost:4200',
  loginRedirectUrl: 'http://localhost:4200#/listen',
  jokesAPI: 'https://official-joke-api.appspot.com/jokes/random',
  consoleLogActive: true,
  serverLogActive: false,
  loglevel: 1
};
