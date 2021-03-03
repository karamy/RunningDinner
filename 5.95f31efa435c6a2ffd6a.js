(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{gcOT:function(e,t,r){"use strict";var n,i=function(e){return e.Prompt="PROMPT",e.Camera="CAMERA",e.Photos="PHOTOS",e}({}),o=function(e){return e.Rear="REAR",e.Front="FRONT",e}({}),s=function(e){return e.Uri="uri",e.Base64="base64",e.DataUrl="dataUrl",e}({}),a=function(e){return e.Documents="DOCUMENTS",e.Data="DATA",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e}({}),c=function(e){return e.Camera="camera",e.Photos="photos",e.Geolocation="geolocation",e.Notifications="notifications",e.ClipboardRead="clipboard-read",e.ClipboardWrite="clipboard-write",e.Microphone="microphone",e}({}),u=((n="undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).Capacitor=n.Capacitor||new(function(){function e(){var e=this;this.platform="web",this.isNative=!1,this.Plugins={},"undefined"!=typeof Proxy&&(this.Plugins=new Proxy(this.Plugins,{get:function(t,r){if(void 0===t[r]){var n=e;return new Proxy({},{get:function(e,t){return void 0===e[t]?n.pluginMethodNoop.bind(n,e,t,r):e[t]}})}return t[r]}}))}return e.prototype.pluginMethodNoop=function(e,t,r){return Promise.reject(r+" does not have web implementation.")},e.prototype.getPlatform=function(){return this.platform},e.prototype.isPluginAvailable=function(e){return this.Plugins.hasOwnProperty(e)},e.prototype.convertFileSrc=function(e){return e},e.prototype.handleError=function(e){console.error(e)},e}())).Plugins,d=new(function(){function e(){this.plugins={},this.loadedPlugins={}}return e.prototype.addPlugin=function(e){this.plugins[e.config.name]=e},e.prototype.getPlugin=function(e){return this.plugins[e]},e.prototype.loadPlugin=function(e){var t=this.getPlugin(e);t?t.load():console.error("Unable to load web plugin "+e+", no such plugin found.")},e.prototype.getPlugins=function(){var e=[];for(var t in this.plugins)e.push(this.plugins[t]);return e},e}()),l=function(){function e(e,t){this.config=e,this.loaded=!1,this.listeners={},this.windowListeners={},t?t.addPlugin(this):d.addPlugin(this)}return e.prototype.addWindowListener=function(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0},e.prototype.removeWindowListener=function(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)},e.prototype.addListener=function(e,t){var r=this;this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t);var n=this.windowListeners[e];return n&&!n.registered&&this.addWindowListener(n),{remove:function(){r.removeListener(e,t)}}},e.prototype.removeListener=function(e,t){var r=this.listeners[e];if(r){var n=r.indexOf(t);this.listeners[e].splice(n,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}},e.prototype.removeAllListeners=function(){for(var e in this.listeners={},this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}},e.prototype.notifyListeners=function(e,t){var r=this.listeners[e];r&&r.forEach((function(e){return e(t)}))},e.prototype.hasListeners=function(e){return!!this.listeners[e].length},e.prototype.registerWindowListener=function(e,t){var r=this;this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:function(e){r.notifyListeners(t,e)}}},e.prototype.requestPermissions=function(){return Capacitor.isNative?Capacitor.nativePromise(this.config.name,"requestPermissions",{}):Promise.resolve({results:[]})},e.prototype.load=function(){this.loaded=!0},e}(),p=function(e,t){e.hasOwnProperty(t.config.name)&&!function(e){return e.config.platforms&&e.config.platforms.indexOf(Capacitor.platform)>=0}(t)||(e[t.config.name]=t)},h=r("mrSG"),f=(new(function(e){function t(){return e.call(this,{name:"Accessibility",platforms:["web"]})||this}return Object(h.__extends)(t,e),t.prototype.isScreenReaderEnabled=function(){throw new Error("Feature not available in the browser")},t.prototype.speak=function(e){if(!("speechSynthesis"in window))return Promise.reject("Browser does not support the Speech Synthesis API");var t=new SpeechSynthesisUtterance(e.value);return e.language&&(t.lang=e.language),window.speechSynthesis.speak(t),Promise.resolve()},t}(l)),new(function(e){function t(){var t=e.call(this,{name:"App",platforms:["web"]})||this;return"undefined"!=typeof document&&document.addEventListener("visibilitychange",t.handleVisibilityChange.bind(t),!1),t}return Object(h.__extends)(t,e),t.prototype.exitApp=function(){throw new Error("Method not implemented.")},t.prototype.canOpenUrl=function(e){return Promise.resolve({value:!0})},t.prototype.openUrl=function(e){return Promise.resolve({completed:!0})},t.prototype.getLaunchUrl=function(){return Promise.resolve({url:""})},t.prototype.getState=function(){return Promise.resolve({isActive:!0!==document.hidden})},t.prototype.handleVisibilityChange=function(){var e={isActive:!0!==document.hidden};this.notifyListeners("appStateChange",e)},t}(l)),new(function(e){function t(){return e.call(this,{name:"Browser",platforms:["web"]})||this}return Object(h.__extends)(t,e),t.prototype.open=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){return Object(h.__generator)(this,(function(t){return this._lastWindow=window.open(e.url,e.windowName||"_blank"),[2,Promise.resolve()]}))}))},t.prototype.prefetch=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){return Object(h.__generator)(this,(function(e){return[2,Promise.resolve()]}))}))},t.prototype.close=function(){return Object(h.__awaiter)(this,void 0,void 0,(function(){return Object(h.__generator)(this,(function(e){return this._lastWindow&&this._lastWindow.close(),[2,Promise.resolve()]}))}))},t}(l)),new(function(e){function t(){return e.call(this,{name:"Camera",platforms:["web"]})||this}return Object(h.__extends)(t,e),t.prototype.getPhoto=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){var t=this;return Object(h.__generator)(this,(function(r){return[2,new Promise((function(r,n){return Object(h.__awaiter)(t,void 0,void 0,(function(){var t,i=this;return Object(h.__generator)(this,(function(o){switch(o.label){case 0:return e.webUseInput?(this.fileInputExperience(e,r),[3,7]):[3,1];case 1:if(!customElements.get("pwa-camera-modal"))return[3,6];t=document.createElement("pwa-camera-modal"),document.body.appendChild(t),o.label=2;case 2:return o.trys.push([2,4,,5]),[4,t.componentOnReady()];case 3:return o.sent(),t.addEventListener("onPhoto",(function(o){return Object(h.__awaiter)(i,void 0,void 0,(function(){var i,s;return Object(h.__generator)(this,(function(a){switch(a.label){case 0:return null!==(i=o.detail)?[3,1]:(n("User cancelled photos app"),[3,4]);case 1:return i instanceof Error?(n(i.message),[3,4]):[3,2];case 2:return s=r,[4,this._getCameraPhoto(i,e)];case 3:s.apply(void 0,[a.sent()]),a.label=4;case 4:return t.dismiss(),document.body.removeChild(t),[2]}}))}))})),t.present(),[3,5];case 4:return o.sent(),this.fileInputExperience(e,r),[3,5];case 5:return[3,7];case 6:console.error("Unable to load PWA Element 'pwa-camera-modal'. See the docs: https://capacitorjs.com/docs/pwa-elements."),this.fileInputExperience(e,r),o.label=7;case 7:return[2]}}))}))}))]}))}))},t.prototype.fileInputExperience=function(e,t){var r=document.querySelector("#_capacitor-camera-input"),n=function(){r.parentNode&&r.parentNode.removeChild(r)};r||((r=document.createElement("input")).id="_capacitor-camera-input",r.type="file",document.body.appendChild(r)),r.accept="image/*",r.capture=!0,e.source===i.Photos||e.source===i.Prompt?r.removeAttribute("capture"):e.direction===o.Front?r.capture="user":e.direction===o.Rear&&(r.capture="environment"),r.addEventListener("change",(function(i){var o=r.files[0],a="jpeg";if("image/png"===o.type?a="png":"image/gif"===o.type&&(a="gif"),e.resultType===s.DataUrl||e.resultType===s.Base64){var c=new FileReader;c.addEventListener("load",(function(){if(e.resultType===s.DataUrl)t({dataUrl:c.result,format:a});else if(e.resultType===s.Base64){var r=c.result.split(",")[1];t({base64String:r,format:a})}n()})),c.readAsDataURL(o)}else t({webPath:URL.createObjectURL(o),format:a}),n()})),r.click()},t.prototype._getCameraPhoto=function(e,t){return new Promise((function(r,n){var i=new FileReader,o=e.type.split("/")[1];t.resultType===s.Uri?r({webPath:URL.createObjectURL(e),format:o}):(i.readAsDataURL(e),i.onloadend=function(){var e=i.result;r(t.resultType===s.DataUrl?{dataUrl:e,format:o}:{base64String:e.split(",")[1],format:o})},i.onerror=function(e){n(e)})}))},t}(l)),new(function(e){function t(){return e.call(this,{name:"Clipboard",platforms:["web"]})||this}return Object(h.__extends)(t,e),t.prototype.write=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){var t,r,n;return Object(h.__generator)(this,(function(i){switch(i.label){case 0:return navigator.clipboard?void 0!==e.string||e.url?navigator.clipboard.writeText?[4,navigator.clipboard.writeText(void 0!==e.string?e.string:e.url)]:[2,Promise.reject("Writting to clipboard not supported in this browser")]:[3,2]:[2,Promise.reject("Clipboard API not available in this browser")];case 1:return i.sent(),[3,10];case 2:if(!e.image)return[3,9];if(!navigator.clipboard.write)return[2,Promise.reject("Setting images not supported in this browser")];i.label=3;case 3:return i.trys.push([3,7,,8]),[4,fetch(e.image)];case 4:return[4,i.sent().blob()];case 5:return t=i.sent(),r=new ClipboardItem(((n={})[t.type]=t,n)),[4,navigator.clipboard.write([r])];case 6:return i.sent(),[3,8];case 7:return i.sent(),[2,Promise.reject("Failed to write image")];case 8:return[3,10];case 9:return[2,Promise.reject("Nothing to write")];case 10:return[2,Promise.resolve()]}}))}))},t.prototype.read=function(){return Object(h.__awaiter)(this,void 0,void 0,(function(){var e,t,r,n;return Object(h.__generator)(this,(function(i){switch(i.label){case 0:return navigator.clipboard?navigator.clipboard.read?[3,1]:navigator.clipboard.readText?[2,this.readText()]:[2,Promise.reject("Reading from clipboard not supported in this browser")]:[2,Promise.reject("Clipboard API not available in this browser")];case 1:return i.trys.push([1,5,,6]),[4,navigator.clipboard.read()];case 2:return[4,(e=i.sent())[0].getType(t=e[0].types[0])];case 3:return r=i.sent(),[4,this._getBlobData(r,t)];case 4:return n=i.sent(),[2,Promise.resolve({value:n,type:t})];case 5:return i.sent(),[2,this.readText()];case 6:return[2]}}))}))},t.prototype.readText=function(){return Object(h.__awaiter)(this,void 0,void 0,(function(){var e;return Object(h.__generator)(this,(function(t){switch(t.label){case 0:return[4,navigator.clipboard.readText()];case 1:return e=t.sent(),[2,Promise.resolve({value:e,type:"text/plain"})]}}))}))},t.prototype._getBlobData=function(e,t){return new Promise((function(r,n){var i=new FileReader;t.includes("image")?i.readAsDataURL(e):i.readAsText(e),i.onloadend=function(){r(i.result)},i.onerror=function(e){n(e)}}))},t}(l)),new(function(e){function t(){var t=e.call(this,{name:"Filesystem",platforms:["web"]})||this;return t.DEFAULT_DIRECTORY=a.Data,t.DB_VERSION=1,t.DB_NAME="Disc",t._writeCmds=["add","put","delete"],t}return Object(h.__extends)(t,e),t.prototype.initDb=function(){return Object(h.__awaiter)(this,void 0,void 0,(function(){var e=this;return Object(h.__generator)(this,(function(r){if(void 0!==this._db)return[2,this._db];if(!("indexedDB"in window))throw new Error("This browser doesn't support IndexedDB");return[2,new Promise((function(r,n){var i=indexedDB.open(e.DB_NAME,e.DB_VERSION);i.onupgradeneeded=t.doUpgrade,i.onsuccess=function(){e._db=i.result,r(i.result)},i.onerror=function(){return n(i.error)},i.onblocked=function(){console.warn("db blocked")}}))]}))}))},t.doUpgrade=function(e){var t=e.target.result;switch(e.oldVersion){case 0:case 1:default:t.objectStoreNames.contains("FileStorage")&&t.deleteObjectStore("FileStorage"),t.createObjectStore("FileStorage",{keyPath:"path"}).createIndex("by_folder","folder")}},t.prototype.dbRequest=function(e,t){return Object(h.__awaiter)(this,void 0,void 0,(function(){var r;return Object(h.__generator)(this,(function(n){return r=-1!==this._writeCmds.indexOf(e)?"readwrite":"readonly",[2,this.initDb().then((function(n){return new Promise((function(i,o){var s=n.transaction(["FileStorage"],r).objectStore("FileStorage"),a=s[e].apply(s,t);a.onsuccess=function(){return i(a.result)},a.onerror=function(){return o(a.error)}}))}))]}))}))},t.prototype.dbIndexRequest=function(e,t,r){return Object(h.__awaiter)(this,void 0,void 0,(function(){var n;return Object(h.__generator)(this,(function(i){return n=-1!==this._writeCmds.indexOf(t)?"readwrite":"readonly",[2,this.initDb().then((function(i){return new Promise((function(o,s){var a=i.transaction(["FileStorage"],n).objectStore("FileStorage").index(e),c=a[t].apply(a,r);c.onsuccess=function(){return o(c.result)},c.onerror=function(){return s(c.error)}}))}))]}))}))},t.prototype.getPath=function(e,t){e=e||this.DEFAULT_DIRECTORY;var r=void 0!==t?t.replace(/^[/]+|[/]+$/g,""):"",n="/"+e;return""!==t&&(n+="/"+r),n},t.prototype.clear=function(){return Object(h.__awaiter)(this,void 0,void 0,(function(){return Object(h.__generator)(this,(function(e){switch(e.label){case 0:return[4,this.initDb()];case 1:return e.sent().transaction(["FileStorage"],"readwrite").objectStore("FileStorage").clear(),[2,{}]}}))}))},t.prototype.readFile=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){var t,r;return Object(h.__generator)(this,(function(n){switch(n.label){case 0:return t=this.getPath(e.directory,e.path),[4,this.dbRequest("get",[t])];case 1:if(void 0===(r=n.sent()))throw Error("File does not exist.");return[2,{data:r.content}]}}))}))},t.prototype.writeFile=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){var t,r,n,i,o,s,a,c,u,d;return Object(h.__generator)(this,(function(l){switch(l.label){case 0:return t=this.getPath(e.directory,e.path),r=e.data,n=e.recursive,[4,this.dbRequest("get",[t])];case 1:if((i=l.sent())&&"directory"===i.type)throw"The supplied path is a directory.";return o=e.encoding,s=t.substr(0,t.lastIndexOf("/")),[4,this.dbRequest("get",[s])];case 2:return void 0!==l.sent()||-1===(a=s.indexOf("/",1))?[3,4]:(c=s.substr(a),[4,this.mkdir({path:c,directory:e.directory,recursive:n})]);case 3:l.sent(),l.label=4;case 4:return u=Date.now(),d={path:t,folder:s,type:"file",size:r.length,ctime:u,mtime:u,content:!o&&r.indexOf(",")>=0?r.split(",")[1]:r},[4,this.dbRequest("put",[d])];case 5:return l.sent(),[2,{uri:d.path}]}}))}))},t.prototype.appendFile=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){var t,r,n,i,o,s,a,c;return Object(h.__generator)(this,(function(u){switch(u.label){case 0:return t=this.getPath(e.directory,e.path),r=e.data,n=t.substr(0,t.lastIndexOf("/")),i=Date.now(),o=i,[4,this.dbRequest("get",[t])];case 1:if((s=u.sent())&&"directory"===s.type)throw"The supplied path is a directory.";return[4,this.dbRequest("get",[n])];case 2:return void 0!==u.sent()||-1===(a=n.indexOf("/",1))?[3,4]:(c=n.substr(a),[4,this.mkdir({path:c,directory:e.directory,recursive:!0})]);case 3:u.sent(),u.label=4;case 4:return void 0!==s&&(r=s.content+r,o=s.ctime),[4,this.dbRequest("put",[{path:t,folder:n,type:"file",size:r.length,ctime:o,mtime:i,content:r}])];case 5:return u.sent(),[2,{}]}}))}))},t.prototype.deleteFile=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){var t;return Object(h.__generator)(this,(function(r){switch(r.label){case 0:return t=this.getPath(e.directory,e.path),[4,this.dbRequest("get",[t])];case 1:if(void 0===r.sent())throw Error("File does not exist.");return[4,this.dbIndexRequest("by_folder","getAllKeys",[IDBKeyRange.only(t)])];case 2:if(0!==r.sent().length)throw Error("Folder is not empty.");return[4,this.dbRequest("delete",[t])];case 3:return r.sent(),[2,{}]}}))}))},t.prototype.mkdir=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){var t,r,n,i,o,s,a,c;return Object(h.__generator)(this,(function(u){switch(u.label){case 0:return t=this.getPath(e.directory,e.path),r=e.recursive,n=t.substr(0,t.lastIndexOf("/")),i=(t.match(/\//g)||[]).length,[4,this.dbRequest("get",[n])];case 1:return o=u.sent(),[4,this.dbRequest("get",[t])];case 2:if(s=u.sent(),1===i)throw Error("Cannot create Root directory");if(void 0!==s)throw Error("Current directory does already exist.");if(!r&&2!==i&&void 0===o)throw Error("Parent directory must exist");return r&&2!==i&&void 0===o?(a=n.substr(n.indexOf("/",1)),[4,this.mkdir({path:a,directory:e.directory,recursive:r})]):[3,4];case 3:u.sent(),u.label=4;case 4:return c=Date.now(),[4,this.dbRequest("put",[{path:t,folder:n,type:"directory",size:0,ctime:c,mtime:c}])];case 5:return u.sent(),[2,{}]}}))}))},t.prototype.rmdir=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){var t,r,n,i,o,s,a,c,u;return Object(h.__generator)(this,(function(d){switch(d.label){case 0:return n=e.recursive,i=this.getPath(r=e.directory,t=e.path),[4,this.dbRequest("get",[i])];case 1:if(void 0===(o=d.sent()))throw Error("Folder does not exist.");if("directory"!==o.type)throw Error("Requested path is not a directory");return[4,this.readdir({path:t,directory:r})];case 2:if(0!==(s=d.sent()).files.length&&!n)throw Error("Folder is not empty");a=0,c=s.files,d.label=3;case 3:return a<c.length?[4,this.stat({path:u=t+"/"+c[a],directory:r})]:[3,9];case 4:return"file"!==d.sent().type?[3,6]:[4,this.deleteFile({path:u,directory:r})];case 5:return d.sent(),[3,8];case 6:return[4,this.rmdir({path:u,directory:r,recursive:n})];case 7:d.sent(),d.label=8;case 8:return a++,[3,3];case 9:return[4,this.dbRequest("delete",[i])];case 10:return d.sent(),[2,{}]}}))}))},t.prototype.readdir=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){var t,r;return Object(h.__generator)(this,(function(n){switch(n.label){case 0:return t=this.getPath(e.directory,e.path),[4,this.dbRequest("get",[t])];case 1:if(r=n.sent(),""!==e.path&&void 0===r)throw Error("Folder does not exist.");return[4,this.dbIndexRequest("by_folder","getAllKeys",[IDBKeyRange.only(t)])];case 2:return[2,{files:n.sent().map((function(e){return e.substring(t.length+1)}))}]}}))}))},t.prototype.getUri=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){var t,r;return Object(h.__generator)(this,(function(n){switch(n.label){case 0:return t=this.getPath(e.directory,e.path),[4,this.dbRequest("get",[t])];case 1:return void 0!==(r=n.sent())?[3,3]:[4,this.dbRequest("get",[t+"/"])];case 2:r=n.sent(),n.label=3;case 3:if(void 0===r)throw Error("Entry does not exist.");return[2,{uri:r.path}]}}))}))},t.prototype.stat=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){var t,r;return Object(h.__generator)(this,(function(n){switch(n.label){case 0:return t=this.getPath(e.directory,e.path),[4,this.dbRequest("get",[t])];case 1:return void 0!==(r=n.sent())?[3,3]:[4,this.dbRequest("get",[t+"/"])];case 2:r=n.sent(),n.label=3;case 3:if(void 0===r)throw Error("Entry does not exist.");return[2,{type:r.type,size:r.size,ctime:r.ctime,mtime:r.mtime,uri:r.path}]}}))}))},t.prototype.rename=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){return Object(h.__generator)(this,(function(t){return[2,this._copy(e,!0)]}))}))},t.prototype.copy=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){return Object(h.__generator)(this,(function(t){return[2,this._copy(e,!1)]}))}))},t.prototype._copy=function(e,t){return void 0===t&&(t=!1),Object(h.__awaiter)(this,void 0,void 0,(function(){var r,n,i,o,s,a,c,u,d,l,p,f,w,v,m,b,g=this;return Object(h.__generator)(this,(function(y){switch(y.label){case 0:if(n=e.from,i=e.directory,o=e.toDirectory,!(r=e.to)||!n)throw Error("Both to and from must be provided");if(o||(o=i),s=this.getPath(i,n),a=this.getPath(o,r),s===a)return[2,{}];if(a.startsWith(s))throw Error("To path cannot contain the from path");y.label=1;case 1:return y.trys.push([1,3,,6]),[4,this.stat({path:r,directory:o})];case 2:return c=y.sent(),[3,6];case 3:return y.sent(),(u=r.split("/")).pop(),d=u.join("/"),u.length>0?[4,this.stat({path:d,directory:o})]:[3,5];case 4:if("directory"!==y.sent().type)throw new Error("Parent directory of the to path is a file");y.label=5;case 5:return[3,6];case 6:if(c&&"directory"===c.type)throw new Error("Cannot overwrite a directory with a file");return[4,this.stat({path:n,directory:i})];case 7:switch(l=y.sent(),p=function(e,t,r){return Object(h.__awaiter)(g,void 0,void 0,(function(){var n,i;return Object(h.__generator)(this,(function(s){switch(s.label){case 0:return n=this.getPath(o,e),[4,this.dbRequest("get",[n])];case 1:return(i=s.sent()).ctime=t,i.mtime=r,[4,this.dbRequest("put",[i])];case 2:return s.sent(),[2]}}))}))},l.type){case"file":return[3,8];case"directory":return[3,15]}return[3,28];case 8:return[4,this.readFile({path:n,directory:i})];case 9:return f=y.sent(),t?[4,this.deleteFile({path:n,directory:i})]:[3,11];case 10:y.sent(),y.label=11;case 11:return[4,this.writeFile({path:r,directory:o,data:f.data})];case 12:return y.sent(),t?[4,p(r,l.ctime,l.mtime)]:[3,14];case 13:y.sent(),y.label=14;case 14:return[2,{}];case 15:if(c)throw Error("Cannot move a directory over an existing object");y.label=16;case 16:return y.trys.push([16,20,,21]),[4,this.mkdir({path:r,directory:o,recursive:!1})];case 17:return y.sent(),t?[4,p(r,l.ctime,l.mtime)]:[3,19];case 18:y.sent(),y.label=19;case 19:return[3,21];case 20:return y.sent(),[3,21];case 21:return[4,this.readdir({path:n,directory:i})];case 22:w=y.sent().files,v=0,m=w,y.label=23;case 23:return v<m.length?[4,this._copy({from:n+"/"+(b=m[v]),to:r+"/"+b,directory:i,toDirectory:o},t)]:[3,26];case 24:y.sent(),y.label=25;case 25:return v++,[3,23];case 26:return t?[4,this.rmdir({path:n,directory:i})]:[3,28];case 27:y.sent(),y.label=28;case 28:return[2,{}]}}))}))},t._debug=!0,t}(l)),function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return t.forEach((function(t){if(t&&"object"==typeof t)for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})),e});new(function(e){function t(){return e.call(this,{name:"Geolocation",platforms:["web"]})||this}return Object(h.__extends)(t,e),t.prototype.getCurrentPosition=function(e){var t=this;return new Promise((function(r,n){return t.requestPermissions().then((function(t){window.navigator.geolocation.getCurrentPosition((function(e){r(e)}),(function(e){n(e)}),f({enableHighAccuracy:!0,timeout:1e4,maximumAge:0},e))}))}))},t.prototype.watchPosition=function(e,t){return""+window.navigator.geolocation.watchPosition((function(e){t(e)}),(function(e){t(null,e)}),f({enableHighAccuracy:!0,timeout:1e4,maximumAge:0},e))},t.prototype.clearWatch=function(e){return window.navigator.geolocation.clearWatch(parseInt(e.id,10)),Promise.resolve()},t}(l)),new(function(e){function t(){return e.call(this,{name:"Device",platforms:["web"]})||this}return Object(h.__extends)(t,e),t.prototype.getInfo=function(){return Object(h.__awaiter)(this,void 0,void 0,(function(){var e,t;return Object(h.__generator)(this,(function(r){return e=navigator.userAgent,t=this.parseUa(e),[2,Promise.resolve({model:t.model,platform:"web",appVersion:"",appBuild:"",appId:"",appName:"",operatingSystem:t.operatingSystem,osVersion:t.osVersion,manufacturer:navigator.vendor,isVirtual:!1,uuid:this.getUid()})]}))}))},t.prototype.getBatteryInfo=function(){return Object(h.__awaiter)(this,void 0,void 0,(function(){var e;return Object(h.__generator)(this,(function(t){switch(t.label){case 0:e={},t.label=1;case 1:return t.trys.push([1,3,,4]),[4,navigator.getBattery()];case 2:return e=t.sent(),[3,4];case 3:return t.sent(),[3,4];case 4:return[2,Promise.resolve({batteryLevel:e.level,isCharging:e.charging})]}}))}))},t.prototype.getLanguageCode=function(){return Object(h.__awaiter)(this,void 0,void 0,(function(){return Object(h.__generator)(this,(function(e){return[2,{value:navigator.language}]}))}))},t.prototype.parseUa=function(e){var t={},r=e.indexOf("(")+1,n=e.indexOf(") AppleWebKit");-1!==e.indexOf(") Gecko")&&(n=e.indexOf(") Gecko"));var i=e.substring(r,n);if(-1!==e.indexOf("Android"))t.model=i.replace("; wv","").split("; ").pop().split(" Build")[0],t.osVersion=i.split("; ")[1];else if(t.model=i.split("; ")[0],navigator.oscpu)t.osVersion=navigator.oscpu;else if(-1!==e.indexOf("Windows"))t.osVersion=i;else{var o=i.split("; ").pop().replace(" like Mac OS X","").split(" ");t.osVersion=o[o.length-1].replace(/_/g,".")}return t.operatingSystem=/android/i.test(e)?"android":/iPad|iPhone|iPod/.test(e)&&!window.MSStream?"ios":/Win/.test(e)?"windows":/Mac/i.test(e)?"mac":"unknown",t},t.prototype.getUid=function(){var e=window.localStorage.getItem("_capuid");return e||(e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})),window.localStorage.setItem("_capuid",e),e)},t}(l)),new(function(e){function t(){var t=e.call(this,{name:"LocalNotifications",platforms:["web"]})||this;return t.pending=[],t}return Object(h.__extends)(t,e),t.prototype.createChannel=function(e){throw new Error("Feature not available in the browser. "+e.id)},t.prototype.deleteChannel=function(e){throw new Error("Feature not available in the browser. "+e.id)},t.prototype.listChannels=function(){throw new Error("Feature not available in the browser")},t.prototype.sendPending=function(){var e=this,t=[],r=+new Date;this.pending.forEach((function(n){n.schedule&&n.schedule.at&&+n.schedule.at<=r&&(e.buildNotification(n),t.push(n))})),console.log("Sent pending, removing",t),this.pending=this.pending.filter((function(e){return!t.find((function(t){return t===e}))}))},t.prototype.sendNotification=function(e){var t=this,r=e;if(e.schedule&&e.schedule.at){var n=+e.schedule.at-+new Date;return this.pending.push(r),void setTimeout((function(){t.sendPending()}),n)}this.buildNotification(e)},t.prototype.buildNotification=function(e){return new Notification(e.title,{body:e.body})},t.prototype.schedule=function(e){var t=this,r=[];return e.notifications.forEach((function(e){r.push(t.sendNotification(e))})),Promise.resolve({notifications:e.notifications.map((function(e){return{id:""+e.id}}))})},t.prototype.getPending=function(){return Promise.resolve({notifications:this.pending.map((function(e){return{id:""+e.id}}))})},t.prototype.registerActionTypes=function(e){throw new Error("Method not implemented.")},t.prototype.cancel=function(e){return console.log("Cancel these",e),this.pending=this.pending.filter((function(t){return!e.notifications.find((function(e){return e.id===""+t.id}))})),Promise.resolve()},t.prototype.areEnabled=function(){return Promise.resolve({value:"granted"===Notification.permission})},t.prototype.requestPermission=function(){return new Promise((function(e){Notification.requestPermission((function(t){var r=!0;"denied"!==t&&"default"!==t||(r=!1),e({granted:r})}))}))},t.prototype.requestPermissions=function(){return new Promise((function(e,t){Notification.requestPermission((function(r){"denied"!==r&&"default"!==r?e({results:[r]}):t(r)}))}))},t}(l)),new(function(e){function t(){return e.call(this,{name:"Share",platforms:["web"]})||this}return Object(h.__extends)(t,e),t.prototype.share=function(e){return navigator.share?navigator.share({title:e.title,text:e.text,url:e.url}):Promise.reject("Web Share API not available")},t}(l)),new(function(e){function t(){return e.call(this,{name:"Modals",platforms:["web"]})||this}return Object(h.__extends)(t,e),t.prototype.alert=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){return Object(h.__generator)(this,(function(t){return window.alert(e.message),[2,Promise.resolve()]}))}))},t.prototype.prompt=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){var t;return Object(h.__generator)(this,(function(r){return t=window.prompt(e.message,e.inputText||""),[2,Promise.resolve({value:t,cancelled:null===t})]}))}))},t.prototype.confirm=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){var t;return Object(h.__generator)(this,(function(r){return t=window.confirm(e.message),[2,Promise.resolve({value:t})]}))}))},t.prototype.showActions=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){var t=this;return Object(h.__generator)(this,(function(r){return[2,new Promise((function(r,n){return Object(h.__awaiter)(t,void 0,void 0,(function(){var t,n=this;return Object(h.__generator)(this,(function(i){return(t=document.querySelector("pwa-action-sheet"))||(t=document.createElement("pwa-action-sheet"),document.body.appendChild(t)),t.header=e.title,t.cancelable=!1,t.options=e.options,t.addEventListener("onSelection",(function(e){return Object(h.__awaiter)(n,void 0,void 0,(function(){return Object(h.__generator)(this,(function(t){return r({index:e.detail}),[2]}))}))})),[2]}))}))}))]}))}))},t}(l)),new(function(e){function t(){var t=e.call(this,{name:"Motion"})||this;return t.registerWindowListener("devicemotion","accel"),t.registerWindowListener("deviceorientation","orientation"),t}return Object(h.__extends)(t,e),t}(l)),new(function(e){function t(){var t=e.call(this,{name:"Network",platforms:["web"]})||this;return t.listenerFunction=null,t}return Object(h.__extends)(t,e),t.prototype.getStatus=function(){return new Promise((function(e,t){if(window.navigator){var r=window.navigator.onLine,n=window.navigator.connection||window.navigator.mozConnection||window.navigator.webkitConnection;e({connected:r,connectionType:r?n?n.type||n.effectiveType:"wifi":"none"})}else t("Network info not available")}))},t.prototype.addListener=function(e,t){var r=window.navigator.connection||window.navigator.mozConnection||window.navigator.webkitConnection,n=t.bind(this,{connected:!0,connectionType:r?r.type||r.effectiveType:"wifi"}),i=t.bind(this,{connected:!1,connectionType:"none"});if(0===e.localeCompare("networkStatusChange"))return window.addEventListener("online",n),window.addEventListener("offline",i),{remove:function(){window.removeEventListener("online",n),window.removeEventListener("offline",i)}}},t}(l)),new(function(e){function t(){return e.call(this,{name:"Permissions"})||this}return Object(h.__extends)(t,e),t.prototype.query=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){var t;return Object(h.__generator)(this,(function(r){switch(r.label){case 0:return(t=window.navigator).permissions?[4,t.permissions.query({name:e.name===c.Photos?"camera":e.name})]:[2,Promise.reject("This browser does not support the Permissions API")];case 1:return[2,{state:r.sent().state}]}}))}))},t}(l)),new(function(e){function t(){return e.call(this,{name:"SplashScreen",platforms:["web"]})||this}return Object(h.__extends)(t,e),t.prototype.show=function(e,t){return Promise.resolve()},t.prototype.hide=function(e,t){return Promise.resolve()},t}(l)),new(function(e){function t(){var t=e.call(this,{name:"Storage",platforms:["web"]})||this;return t.KEY_PREFIX="_cap_",t}return Object(h.__extends)(t,e),t.prototype.get=function(e){var t=this;return new Promise((function(r,n){r({value:window.localStorage.getItem(t.makeKey(e.key))})}))},t.prototype.set=function(e){var t=this;return new Promise((function(r,n){window.localStorage.setItem(t.makeKey(e.key),e.value),r()}))},t.prototype.remove=function(e){var t=this;return new Promise((function(r,n){window.localStorage.removeItem(t.makeKey(e.key)),r()}))},t.prototype.keys=function(){var e=this;return new Promise((function(t,r){t({keys:Object.keys(localStorage).filter((function(t){return e.isKey(t)})).map((function(t){return e.getKey(t)}))})}))},t.prototype.clear=function(){var e=this;return new Promise((function(t,r){Object.keys(localStorage).filter((function(t){return e.isKey(t)})).forEach((function(e){return window.localStorage.removeItem(e)})),t()}))},t.prototype.makeKey=function(e){return this.KEY_PREFIX+e},t.prototype.isKey=function(e){return 0===e.indexOf(this.KEY_PREFIX)},t.prototype.getKey=function(e){return e.substr(this.KEY_PREFIX.length)},t}(l)),new(function(e){function t(){return e.call(this,{name:"Toast",platforms:["web"]})||this}return Object(h.__extends)(t,e),t.prototype.show=function(e){return Object(h.__awaiter)(this,void 0,void 0,(function(){var t,r;return Object(h.__generator)(this,(function(n){return t=2e3,e.duration&&(t="long"===e.duration?3500:2e3),(r=document.createElement("pwa-toast")).duration=t,r.message=e.text,document.body.appendChild(r),[2]}))}))},t}(l)),function(e){for(var t=0,r=d.getPlugins();t<r.length;t++)p(e,r[t])}(u),r.d(t,"b",(function(){return i})),r.d(t,"a",(function(){return s})),r.d(t,"c",(function(){return u}))}}]);