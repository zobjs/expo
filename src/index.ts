import app from "./app";



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

app.get("/no", (req, res) => {
  res.status(200).json({
    message: "remote: Resolving deltas: 100% (2/2), completed with 2 local objects.",
    status: 200,
    success: true,
    data: "remote: Resolving deltas: 100% (2/2), completed with 2 local objects."
  })
})



export default app;






const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
