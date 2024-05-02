const express=require("express")
const app=express()
const dotenv=require("dotenv")
const cors=require("cors")
const session = require('express-session')
const cookieParser=require("cookie-parser")
const path=require("path")
const port=process.env.PORT || 5000
const router=require("./router/router.js")
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(express.json())
const corsOptions = {
  enabled: true,
      credentials: true, 
      origin: ['http://localhost:3000'],
      headers: [
        "Content-Type",
        "Authorization",
        "X-Frame-Options",
       
      ]
  };
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'))
  app.use(express.static("public"))
  app.use(cors(corsOptions));
  app.use(cookieParser(process.env.SECRET, { debug: true }))
  app.disable("x-powered-by"); //Reduce fingerprinting
  app.use(router)

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
module.exports=app