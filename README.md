# RunningDinner
App RunningDinner

Deploy Ionic app to Github pages 

1. Navigate in the terminal to your project directory and execute ionic build --prod -- --base-href https://karamy.github.io/RunningDinner/, what will create the www folder, which is comparable to the dist folder for Angular. It also sets your github page domain as base href in index.html. 
2. Then run the plugin: npx angular-cli-ghpages --dir=www . The flag at the end points to the www folder, where the index.html file is located that will be displayed at https://karamy.github.io/RunningDinner/. The plugin will create a branch called "gh-pages" in your project that contains all files which are located in your www folder.
