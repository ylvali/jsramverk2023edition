Dokumentation
Kommando

Application:
Frontend: Angular https://jsframeworks.ysojs.se/ 
Backend: Express & Nodejs http://wwww.me-api.ysojs.se 
Github:
https://github.com/ylvali/jsramverk2023edition


-- backendBTH directory --
Backend Nodejs & express
routes/	: in-depth functionality (register users, reports)
app.js 	: base application 
Install all via npm
npm install
Run the app 
npm start 

Or, via a process manager that is kept open without interruption
pm2 process manager
pm2 start app.js --name me-api

KEY
Must set a key for the environment : 
export JWT_SECRET='secretKey' : or some functionality will not work. 

//Example:
//localhost:8333/users/allUsers
//me-api.ysojs.se/users/allLoggedOn


GET
/ 		            : intro
/hello      	    : hello world
/hello/msg		    : test

/token 		        : token
/reports/week/:nr	: reports per week
/reports/all		: all reports

POST
/report/add		    : add new report (header token & params title & data)
/report/edit		: edit report (header token & params title & data)
/users/allUsers	    : show all users
/users/allLoggedOn	: show all logged on
/users/logout		: logs out all users
/users/register	    : register a new user (body email, password, name, birthday)
/users/login		: login (body email & password)
/verifyToken        : verify the token (header, token)

-- frontendBTH directory --
Frontend Angular
Angular works with components & services, a practical & easy to learn way. Where each page of the website is an own component with a separate file for functionality (ts files), style (css file) and structure (html file). A basic application is created and edited in the src catalog, and new components can be generated with all the code through the CLI command. To the components functionality available to different components (such as AJAX or connecting to an API / database – server). These can be created as services and then dependency injected into a component which makes the functionality available. Angular documentation: 
Src/app 		: application scripts for edit
/about 		    : presentation file
/api-connect	: connect to the api
/form		    : registration through form
/login		    : login component
/report-api		: report-api : fetch the reports in the database
User.ts		    : object for user read in the components
api-call.service: dependency injection for calling the api
login.service 	: dependency injection for login
app.component	: the router view
app.module 		: base application 
