import express from "express";

const app = express();

app.use(express.json());



app.get("/", (req, res) => {
    res.send("Hello World!");
  })
  
  app.get("/api", (req, res) => {
    res.status(200).json({
      message: "Hello World!",
      status: 200,
      success: true,
      data: null
    })
  })
  



export default app;
