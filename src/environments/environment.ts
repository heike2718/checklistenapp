// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  version: '1.2.0',
  envName: 'Development',
  apiUrl: 'http://localhost:9300/checklisten-api',
  authUrl: 'http://localhost:4300',
  assetsUrl: 'assets',
  isDebugMode: true,
  clientId: 'WLJLH4vsldWapZrMZi2U5HKRBVpgyUiRTWwX7aiJd8nX',
  signinRedirectUrl: 'http://localhost:4200',
  loginRedirectUrl: 'http://localhost:4200#/listen',
};
