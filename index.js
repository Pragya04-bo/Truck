import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
// import fileUpload from "express-fileupload";
// import { middleware as errorMiddleware } from "./middlewares/error.js";

dotenv.config();

const  app = express();
app.use(express.json());
 
app.use(
    cors({
        origin:[ "http://localhost:3000"],
        methods:["GET","POST","DELETE","PUT"],
        credentials:true,
    })
);

app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

// app.use(
// fileUpload({
//     useTempFiles:true,
//     tempFileDir:"/tmp/",
// })
    // );
app.get("/", (req, res) => {
  res.send("API is working ✅");
});

 
//   app.use(errorMiddleware);  
export default app;