import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';

const app = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('hello world');
});

app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${process.env.PORT} `);
});
