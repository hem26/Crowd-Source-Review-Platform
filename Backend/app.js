//Internal Module - 
const path = require("path");
// External Module

const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
const session = require("express-session");

const passport = require("passport");
require("./config/passport")(passport);



const User  = require("./models/User");

const userRouter = require("./routes/userRouter");
const { default: mongoose } = require("mongoose");
const MongoStore = require("connect-mongo");
const reviewRouter = require("./routes/reviewRouter");



const app = express();

app.use(cors({
    origin:"http://localhost:5173", credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply session - 
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({
        mongoUrl:process.env.MONGODBURL,
        collectionName:"session"
    }),
    cookie: {
    httpOnly: true,
    secure: false,       // true if HTTPS
    sameSite: "lax"
  }
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    // console.log("Serializing user:", user);
    done(null, user._id);  // save only the user id in session
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});




app.use((req,res,next)=>{
    req.isLoggedIn = req.session.isLoggedIn;
    next();
})




app.use("/api/v1",userRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



const PORT= process.env.PORT;
const MongoDBURl = process.env.MONGODBURL;


mongoose.connect(MongoDBURl).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is listening at PORT ${PORT}`)
    })
}).catch(error=>{
    console.log("There is error: ", error);
})
