// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  /**for running localy on our machine */
 // apiUrl:'https://localhost:8080/'
 /**for running services from azure */
  //apiUrl: 'https://waytlessserver.azurewebsites.net/'
  // If you need to test with OAuth use the url below.
//  apiUrl : 'https://waytlessv1.azurewebsites.net/' 
  /**for deploying on azure  */
  apiUrl:''
};
