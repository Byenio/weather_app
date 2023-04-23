import express, { Express, Request, Response } from 'express';

require('dotenv').config();

const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is Express + TypeScript');
});

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});

type iAqi = 'yes' | 'no'

const queryCity: string = `mikolow`
const airQualityIndex: iAqi = `yes`;
const link: string = `${process.env.WEATHER_API_LINK}key=${process.env.WEATHER_API_KEY}&q=${queryCity}&aqi=${airQualityIndex}`

console.log(link);

app.get('/weather', (req: Request, res: Response) => {
  res.send(link);
});