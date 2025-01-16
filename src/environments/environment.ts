
// This file can be replaced during build by using the fileReplacements array.
// ng build --prod replaces environment.ts with environment.prod.ts.
// The list of file replacements can be found in angular.json.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'REPLACE_WITH_REAL_KEY',
    authDomain: 'REPLACE_WITH_REAL_AUTH_DOMAIN',
    projectId: 'REPLACE_WITH_REAL_PROJECT_ID',
    storageBucket: 'REPLACE_WITH_REAL_BUCKET',
    messagingSenderId: 'REPLACE_WITH_REAL_SENDER_ID',
    appId: 'REPLACE_WITH_REAL_APP_ID'
  },
  googleApiKey: 'REPLACE_WITH_REAL_GOOGLE_API_KEY'
};



/*
  * For easier debugging in development mode, you can import the following file
  * to ignore zone related error stack frames such as zone.run, zoneDelegate.invokeTask.
  *
  * This import should be commented out in production mode because it will have a negative impact
  * on performance if an error is thrown.
  */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.