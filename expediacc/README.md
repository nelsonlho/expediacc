The OpenShift `nodejs` cartridge documentation can be found at:

http://openshift.github.io/documentation/oo_cartridge_guide.html#nodejs
# expediacc

The application is created to retrieve hote listings from Expedia and Airbnb

#Download NodeJS
Users must download NodeJS and NPM to your project root folder.  Please go to https://nodejs.org/download/ for instructions

#Cloning Git
Type in your command line in your project root folder: 
$ git clone https://github.com/nelsonlho/expediacc.git

#Starting Service
1. Type in your command line in your project root folder: $ node server.js
2. For calling Expedia service, go to localhost:8080/expedia&place=[cityofyourchoice] in your browser
3. For calling Airbnb service, go to localhost:8080/expedia&city=[cityofyourchoice]&state=[stateofthecity] 
4. localhost:8080/expedia&city=[cityofyourchoice]&state=[stateofthecity]&arrival=[arrivaldate]&departure=[departuredate]

The arrival and departure dates will be default to today and tomorrow, respectively, when arrival and departure dates are not provided.

