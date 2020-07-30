// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: '',
  noti: '/api/v1/pages/notification',
  notiread: '/api/v1/pages/notification/markRead',
  helpContent: 'assets/help/',
  errorLog: '/api/error',
  cities:  '/api/v1/prf/cities',
  otherAddress: '/api/v1/prf/otherAddress',
  primAddress: '/api/v1/prf/primAddress',
  beeAuth: '/api/v1/bauth/pwd',
  beeAuthLogin: '/api/v1/bauth/login',
  beePwdUpdate: '/api/v1/user/pwdupdate'
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
