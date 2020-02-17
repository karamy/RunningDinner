# RunningDinner
App RunningDinner

Deploy Ionic app to Github pages 

1. Create your Ionic project (ionic start MyApp blank) 
2. Install the plugin: npm i angular-cli-ghpages --save 
3. Connect your project with your github repository. 
4. Add in package.json: 
“scripts”: 
  { 
    … 
    "gh-pages": "ionic build --prod -- --base-href https://USERNAME.github.io/REPOSITORYNAME/ && npx angular-cli-ghpages --dir=www" 
    …
  }
5. As a last step you have to select the "gh-page" branch in the settings of your project as a source for your github page.
6. Run: npm run gh-pages 

Metodo Manuale 

1. Navigate in the terminal to your project directory and execute ionic build --prod -- --base-href https://YOUR_GITHUB_USERNAME.github.io/YOUR_PROJECT_NAME/, what will create the www folder, which is comparable to the dist folder for Angular. It also sets your github page domain as base href in index.html. 
2. Then run the plugin: npx angular-cli-ghpages --dir=www. The flag at the end points to the www folder, where the index.html file is located that will be displayed at https://YOUR_GITHUB_USERNAME.github.io/YOUR_PROJECT_NAME/. The plugin will create a branch called "gh-pages" in your project that contains all files which are located in your www folder.
