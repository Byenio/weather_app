"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello, this is Express + TypeScript');
});
app.listen(port, () => {
    console.log(`[Server]: I am running at https://localhost:${port}`);
});
const queryCity = `mikolow`;
const airQualityIndex = `yes`;
const link = `${process.env.WEATHER_API_LINK}key=${process.env.WEATHER_API_KEY}&q=${queryCity}&aqi=${airQualityIndex}`;
console.log(link);
app.get('/weather', (req, res) => {
    res.send(link);
});
