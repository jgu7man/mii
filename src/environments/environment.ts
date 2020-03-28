// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import * as firebaseKey from './agentemii-firebase-adminsdk-dorkj-2f2bc75f9f.json'

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAcS__2e4K6ouok1SP2Z6IpbLXeqN90suE",
    authDomain: "agentemii.firebaseapp.com",
    databaseURL: "https://agentemii.firebaseio.com",
    projectId: "agentemii",
    storageBucket: "agentemii.appspot.com",
    messagingSenderId: "683912406589",
    appId: "1:683912406589:web:8e5dc87c4feb09e81e2c54"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
