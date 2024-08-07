import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});


app.get('/app', (req: Request, res: Response) => {
    res.status(200).json({
        messages: "OK",
        status: "200"
    })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
