const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer');
const register = require("./controllers/auth.js");
const authRoute = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const app = express();
app.use(express.json());
app.use(bodyParser.json({limit: "30mb",extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
dotenv.config();
//app.use("/assets",express.static(path.join(__dirname,'public/assets'));


mongoose.connect("mongodb://127.0.0.1:27017/AppDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
   
    console.log("Connected to MongoDB successfully!");
}).catch((err) => {
    console.log(`${err} didn't connect`);
});

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public/assets");
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
});

const upload = multer({storage});


app.post("/auth/register",upload.single("picture"),register);
//app.use("/auth",authRoute);
//app.use("/users",userRoutes);
app.listen(process.env.PORT || 3030, () => console.log(`Server Port: 3000`));

