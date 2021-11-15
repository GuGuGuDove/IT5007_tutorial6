## Important Setups
### 0. Install MongoDB on your server
### 1. Start MongoDB service
Mongodb docker image is recommend and automatic. You don't need to manualy start mongodb service in the container.
### 2. Install JS packages, initialize MongoDB and start backend server in *backend_server_db* folder
```
cd backend_server_db
npm install
mongo hotel scripts/init.mongo.js
npm start
```
This will create "hotel" database and tow collections "customer" and "counters" in it.
> **Note:** this project accesses hotel->customers and hotel->counters in MongoDB. 

### 3. Install JS packages, compile JSX files and start webpage frontend in *frontend_web* folder
In a new shell:
```
cd frontend_web
npm install
npx babel src --out-dir public
npm start
```
Now you can access the webpage frontend through *localhost:3000*.
### 4. Start the mobile frontend
> **Note:** make sure you've intalled the react-native environment and Android Studio on your PC. <br>Refer to: https://dev-yakuza.posstree.com/en/react-native/install-on-mac/ <br>or https://dev-yakuza.posstree.com/en/react-native/install-on-windows/

(1) The android version in this project is Android 10.<br><br>
(2) Copy *App.js* and *package.json* then replace the same files in your react_native project. <br><br>
(3) Open the terminal at the location of your project. Install JS packages.
```
npm install
```
ERROR may occur here. If so, try:
```
npm install --force
```
DO **NOT** run *npm audit fix --force* ！This command will force react-native to rollback to older version, change contents in *package.josn* and crash the app. Never do this! You can always check *package.josn* to see if react-native version is **^0.66.2**.

(4) Run the app.
```
npm run android
```
ERROR? try:
```
npx react-native run-android
```

As far as I know and experience, react-native got so many strange bugs that can drive you crazy and even speak F words(I did). If error occurs, try reinstall all node packages and react-native CLI. Keep in mind the react-native version should be **^0.66.2**!  if it still cannot work, please contact me at e0572684@u.nus.edu. 
<br>

---
At last, If you want, the MongoDB CRUD test script can be found and executed by:
```
cd backend_server_db
node scripts/trymongo.js
```
All information will be printed in console.
