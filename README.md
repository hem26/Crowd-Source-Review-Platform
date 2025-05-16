# ReviewMosaic - Your CrowdSource Review Platform

ReviewMosaic is the platform where you can find many reviews related to the different categories.
Whether you want to check the review of food, movies, sports and different anime generes.

This platform enables you to add, update and create your own review and provides a review rating system.

# Part-1 Building Backend

# Status -->
1) User Authentication checked

# Steps to build Review Platform - 
    Steps 1 - Create a backend folder 
    Steps 2 - Inside the backend, install through the command using npm init, npm install express.
    Steps 3 - Create index.js file to connect through localhost at port  and apply cors to it order to prevent conflict of frontend and backend port number.<port-number>.
    Steps 4 - Create models file and inside create a db.js (Designing the database Schema).
    Steps 5 - Create routes folder to perform a routing activities.
    Steps 6 - All these Routes are connected to index.js file.

<h1> Designing a Routes Folder </h1>
    Steps 1 - Create index.js inside route folder.
    Steps 2 - Create a User.js for applying user routes to index.js (backend/routes/index.js);
    Steps 3 - Inside the User.js create a router through express.
    Steps 4 - Exports the router so that it can use it in other files.
    Steps 5 - Inside the backend/index.js import userRouter from the routes folder from User.js.

<h1> Desigining models for database </h1>
    Steps 1 - Create a folder named "models" inside create the file of db.js
    Steps 2 - In backend directory, install mongoose through npm.
    Steps 3 - In the db file, create variable called mongoose through require() method and try to connect it inside the database.

<h1> Working on the User Authentication </h1>
    Step 1 - Create a registration form for signup 
    Step 2 - In Signup form, consists of firstName, lastName, userName, and Password.
    Step 3 - In db.js create a  UserSchema and User model and try to export this model to anywhere.
    Step 4 - Open User.js in routes folder, build the input validations using zod by installing npm install zod.
    Step 5 - Apply POST Request in router providing a location signup and check the whether the input is correct or not using safeParse functions.
    Step 6 - Check if the user validates input correctly or not.
    Step 7 - Check if the user exists or not. Create this by integrating Use database.
    Step 8 - If not exists, create it.
    Step 9 - After created, install jsonwebtoken from npm and try to import in User.js by creating token through sign() function
    Step 10 - If the token is created then user registered successfully and genrate some token having large number.
    Step 11 - Create another /signin endpoints where user sign in through post operation and apply those procedure above.

<h1> Creating Database Schema on the basis of Product Categorization </h1>

    Step 1 - Create a database schema - We should have Image, Title, Description
    Step 2 - When I upload this database schema connects to backend (in frontend it should display through axios along with create a react components known as comments by using the comments)
    
<h1> Frontend Scenarios --></h1>
Inside the src folder --> components --> Button.jsx and Cards.jsx
           src folder --> pages --> Dashboard.jsx, Food.jsx, Hotel.jsx, LandingPage.jsx, Movies.jsx, Signin.jsx, Signup.jsx
           src folder --> App.css, App.jsx, index.css, main.jsx

<h1> Performing CRUD Operations in Backend side.</h1>

    Step 1 - Perform the operation add review, we use create function in MongoDB
    Step 2 - Performing the read data through get - We apply try and catch in which we use try to provide findOne
    Step 3 - Performing the update through id: We want params to use it in update.findByIdAndUpdate().
    Step 4 - Performing the delete through id: We want params_id through request and use it delete.findByIdAndUpdate()
    Step 5 - Status Code - 404 --> If operation fails, 200 --> It means OK and performs Operation, 500 --> Server fails

