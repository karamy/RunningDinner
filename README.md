# RunningDinner

App RunningDinner

Repo GDrive: https://drive.google.com/drive/u/0/folders/1UH0TRlFf0-ZpmZUsC7uzacQWe_u0UGxX
URL  GitHub: https://karamy.github.io/RunningDinner/auth
----------------------------------------------------------------------------------------------------

Deploy verso GitHub Pages

1. Run: npm run gh-pages

Metodo Manuale:

1. Navigate in the terminal to your project directory and execute ionic build --prod -- --base-href https://karamy.github.io/RunningDinner/, what will create the www folder, which is comparable to the dist folder for Angular. It also sets your github page domain as base href in index.html.
2. Then run the plugin: npx angular-cli-ghpages --dir=www . The flag at the end points to the www folder, where the index.html file is located that will be displayed at https://karamy.github.io/RunningDinner/. The plugin will create a branch called "gh-pages" in your project that contains all files which are located in your www folder.

----------------------------------------------------------------------------------------------------

Per evitare problemi di CORS con le API installare l'estensione Moesif Orign & CORS Changer

----------------------------------------------------------------------------------------------------

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

----------------------------------------------------------------------------------------------------

Problemi Ionic Build --prod

Se durante la build l'app da un errore del tipo "Could not find plugin "proposal-numeric-separator". Ensure there is an entry in ./available-plugins.js for it" occorre fare i seguenti step:

delete node_modules and package-lock.json (consigliato usare comando 'rm -rf ./node_modules')
add "resolutions": { "@babel/preset-env": "^7.8.7" } to package.json
npm install npm-force-resolutions --save-dev
npm install
npx npm-force-resolutions
npm install (seconda volta)
npm run build

----------------------------------------------------------------------------------------------------

Problemi utilizzo plugin Firebase Phone Authentication su Android

Se durante il run l'app crasha e dal LogCat su Android Studio l'errore è che la chiave SHA1 non è
stata registrata, su OSX occorre lanciare il seguente comando:

keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

L'output a video mostrerà il codice SHA1 da inserire nella console Firebase nella sezione dell'app iOS

NB: il plugin non funziona per policy di Firebase su emulatore, per testare utilizzare le seguenti credenziali impostate di prova
Number: +391234567890 VerificationCode: 123456

----------------------------------------------------------------------------------------------------

Permissions:

Plugin: https://github.com/dpa99c/cordova-diagnostic-plugin

- Geolocation
  Sia su iOS 13+ che Android se selezionata la voce "ask every time" oppure "allow once" ad ogni avvio l'app perde i permessi. Per cui rifare il check ogni volta che si deve utilizzare la localizzazione ed, eventualmente, mostrare errore nel caso sia disabilitata.

- Notifications
  Non possibile, per adesso, testarle su iOS in quanto necessarie APN generabili solo con account Developer.

----------------------------------------------------------------------------------------------------

Suddivisione logica progetto

Il progetto si basa su una struttura gerarchica derivata da come i moduli vengono caricati tramite lazy loading (da app.routing.module in giu).
Sono presenti le cartelle rdcomponents e rdmodals dove inserire rispettivamente i component e le pagine caricate nei modali. 
Il motivo è che il lazy loading non è attivo per i component, dunque scelto di aggiungerli ad un unico modulo da importare nelle pagine dove serve.
Per quanto riguarda i modali, è stato creato il modulo rdmodals per raggrupparli, ma vengono caricati all'avvio dall'app.module in quanto per utilizzarli bisogna dichiararli negli entryComponents, che per definizione li carica all'avvio dell'app.
La cartella rd_plugins è utilizzata per evitare di versionare node_modules dal momento che è stato modificato un plugin normalmente scaricato via npm

----------------------------------------------------------------------------------------------------

Notifiche Push

- Fare npm install utilizzando come shell di base "git bash" altrimenti non funziona il comando "cp" per sovrascrivere il plugin "firebase-pwa" con il nostro in rd_plugins

Versione base utilizzando Capacitor (funziona solo su device):

- Modificare file build.gradle all'interno di Capacitor (node_modules) con la libreria di Firebase modificando la riga ->  implementation 'com.google.firebase:firebase-messaging:20.1.0'

Versione avanzata con utilizzo di plugin e relativo service-worker --> https://www.npmjs.com/package/capacitor-pwa-firebase-msg

- installare http-server ->  npm install http-server -g
  per runnare -> http-server www

- runnare in https per simulare il run su github-pages:
  per generare chiave (una tantum, la chiave è versionata) --> openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
  per runnare --> http-server www -S -C cert.pem -o

- aprire chrome in modalità developer in modo che non rompa per il certificato non valido e abiliti il service-worker:
  OSX:
  /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir=/tmp/foo --ignore-certificaterrors --unsafely-treat-insecure-origin-as-secure=https://localhost:8080
  Windows:
  start chrome --user-data-dir=/tmp/foo --ignore-certificate-errors --unsafely-treat-insecure-origin-as-secure=https://localhost:8080