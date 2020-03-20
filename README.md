# RunningDinner
App RunningDinner

Deploy Ionic app to Github pages 

1. Run: npm run gh-pages

Metodo Manuale:

1. Navigate in the terminal to your project directory and execute ionic build --prod -- --base-href https://karamy.github.io/RunningDinner/, what will create the www folder, which is comparable to the dist folder for Angular. It also sets your github page domain as base href in index.html. 
2. Then run the plugin: npx angular-cli-ghpages --dir=www . The flag at the end points to the www folder, where the index.html file is located that will be displayed at https://karamy.github.io/RunningDinner/. The plugin will create a branch called "gh-pages" in your project that contains all files which are located in your www folder.

----------------------------------------------------------------------------------------------------

Per evitare problemi di CORS con le API installare l'estensione Moesif Orign & CORS Changer

----------------------------------------------------------------------------------------------------

CAPACITOR

La prima volta occorre lanciare il comando 'npx cap add android' per creare la cartella base del progetto Android

Per buildare con Capacitor:
- fare 'ionic build' in modo da creare i sorgenti web (cartella www)
- fare 'npx cap copy android' o 'npx cap copy ios' per copiare i sorgenti nelle cartelle android/ios
- fare 'npx cap open android' o 'npx cap open ios' per aprire l'ide che punta già al progetto
- fare la build o run con l'ide (Android Studio o XCode)

Metodo rapido:
npm run build-android -> effettua build e copia file per Android
npm run run-android -> effettua build, copia file e apertura ide per Android

TODO:

* CC
    - refresh token lato server
    - test permessi su ios

*PZ

*AS