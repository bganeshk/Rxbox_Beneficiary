// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: '',
  noti: 	'assets/mockdata/pointsdata.json',
  notiread: 'assets/mockdata/pointsdata.json',
  helpContent: 'assets/help/',
  errorLog: 'api/error',
  cities:  'assets/mockdata/pointsdata.json',
  otherAddress: 'assets/mockdata/pointsdata.json',
  primAddress: 'assets/mockdata/pointsdata.json',
  beeAuth: '/api/v1/bauth/pwd',
  beePwdUpdate: '/api/v1/user/pwdupdate',
  tempRecord:'assets/mockdata/pointsdata.json',
  prescription:'assets/mockdata/pointsdata.json',
  patientProfile:'assets/mockdata/pointsdata.json',
  consent:'assets/mockdata/consentdata.json'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
