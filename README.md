# RunningDinner

App RunningDinner

----------------------------------------------------------------------------------------------------
Deploy Ionic app to Github pages

1. Run: npm run gh-pages

Metodo Manuale:

1. Navigate in the terminal to your project directory and execute ionic build --prod -- --base-href https://karamy.github.io/RunningDinner/, what will create the www folder, which is comparable to the dist folder for Angular. It also sets your github page domain as base href in index.html.
2. Then run the plugin: npx angular-cli-ghpages --dir=www . The flag at the end points to the www folder, where the index.html file is located that will be displayed at https://karamy.github.io/RunningDinner/. The plugin will create a branch called "gh-pages" in your project that contains all files which are located in your www folder.

---------------------------------------------------------------------------------------------------

Per evitare problemi di CORS con le API installare l'estensione Moesif Orign & CORS Changer

---------------------------------------------------------------------------------------------------

CAPACITOR

La prima volta occorre lanciare il comando 'npx cap add android' per creare la cartella base del progetto Android (e uguale per ios)

Per buildare con Capacitor:

- fare 'ionic build' in modo da creare i sorgenti web (cartella www)
- fare 'npx cap copy android' o 'npx cap copy ios' per copiare i sorgenti nelle cartelle android/ios
- fare 'npx cap open android' o 'npx cap open ios' per aprire l'ide che punta già al progetto
- fare la build o run con l'ide (Android Studio o XCode)

Metodo rapido:
npm run build-android -> effettua build e copia file per Android
npm run run-android -> effettua build, copia file e apertura ide per Android
npm run build-ios -> effettua build e copia file per iOS
npm run run-ios -> effettua build, copia file e apertura ide per iOS

---------------------------------------------------------------------------------------------------

Problemi Ionic Build --prod

Se durante la build l'app da un errore del tipo "Could not find plugin "proposal-numeric-separator". Ensure there is an entry in ./available-plugins.js for it" occorre fare i seguenti step:
  
  delete node_modules and package-lock.json
  add "resolutions": { "@babel/preset-env": "^7.8.7" } to package.json
  npm install npm-force-resolutions --save-dev
  npm install
  npx npm-force-resolutions
  npm install again
  npm run build

---------------------------------------------------------------------------------------------------

TODO:

- CC
  - refresh token lato server --> https://angular-academy.com/angular-jwt/#authservice
  - test app su android x firebase
  - registrazione lato server con immagine
  - servizio per fare query in automatico su heroku
  - corso app

- PZ
  - permessi con plugin su ios

- AS
