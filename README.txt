CONTENTS OF THIS FILE
----------------------------------
 * Introduction
 * About File Hierarchy 
 * Requirements
 * Installation
 * Run
 * Troubleshooting


INTRODUCTION
---------------------
* This project is a Nodejs based task, the task is to stop/terminate any erroneous request which is long-running and  
  wasting the server resources.
* The long-running task used as a sample is an iteration. 
* Redis is used to store values (We can also use any other server-side catching module like Memcached).
* Nodejs Cluster is used. 
* We are using localhost(127.0.0.1) with PORT = 3000 for the node server.
* We are using localhost(127.0.0.1) with PORT = 6379 for the Redis server.
* API = /start is to start the erroneous long-running task.
* API = /suspend is to terminate the erroneous long-running task.
* API = /hello is to test everything working fine.


ABOUT FILE HIERARCHY
-----------------------
* I have used express generator for express application generation.
* package.json <= It defines the application dependencies and other information.
* /bin/www <= It is the application entry point! The very first thing this does is require() the "real" application entry point(app.js).
* app.js <= This file creates an express application object (named app, by convention), sets up the application with various settings and middleware, and then exports the app from the module.
* /Routes <= This folder contain all the route files which are imported in the app.js file.
* /Views <= The views (templates) are stored in this directory (as specified in app.js) and are given the file extension .jade ( Jade is a markup language which basically optimizes the .html files by removing ceremony).


REQUIREMENTS
---------------------
* A Machine with the latest version of Node & NPM installed.
* A Machine with Redis Server installed up and running.


INSTALLATIONS
---------------------
* To install node (which include npm) go to 
   https://nodejs.org/en/download/
* To install Redis on Mac in terminal type - *brew install redis*, on 
   Window - https://redis.io/download


RUN
-----------------------
* To run Redis server in terminal type -  *redis-server*
* To run the nodejs app in a new terminal go the */socialcops/task* directory and type *npm start*
* Instead of running the *npm start* command you can directly run the app by clicking the /bin/www file.


TROUBLESHOOTING
---------------------------
* In case of any error make sure your Redis server up & running.
* While running the app please do look at the log in the terminal to get a better insight of what happening.
* If still there is any issue please do let me know on 007alokranjan@gmail.com or through cal on +91-7838981669.