export const revalidate = 0

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/accordion";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";

import { ModeToggle } from "@/components/theme-select";
import { CurrentWeather } from "@/app/page.interface";
import { Separator } from "@/components/ui/separator";

export default async function Home() {

  const location: string = 'mikolow';
  const API_KEY = process.env.API_KEY;

  const currentWeather = await fetchWeatherData(location, API_KEY);
  const forecastWeather = await fetchForecastData(location, API_KEY);

  return (
    <Card className="flex flex-wrap justify-items-center border-transparent">

      <div className="basis-full flex justify-end">
        <ModeToggle />
      </div>

      <CardHeader className="basis-full text-center">
        <CardTitle>Pogoda {currentWeather.name}</CardTitle>
        <CardDescription>Data fetched using openweathermap API</CardDescription>
      </CardHeader>

      <CardContent className="basis-full text-center">

        <img src={
          `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`
        } className="inline align-middle"
          alt="Icon representing current weather"
        />
        <b className="text-7xl align-middle">
          {Math.round(currentWeather.main.temp)}°C
        </b>
        <p className="text-m text-muted-foreground">
          feels like {Math.round(currentWeather.main.feels_like)}°C
        </p>
        <p className="text-m text-muted-foreground">
          {currentWeather.weather[0].description}
        </p>
        <div className="w-80 mx-auto">
          <Separator className="m-4 mx-auto" />
          <p className="text-left"><b>Ciśnienie:</b> {currentWeather.main.pressure} hPa</p>
          <p className="text-left"><b>Wilgotność:</b> {currentWeather.main.humidity}%</p>
          <p className="text-left">
            <b>Wiatr:</b> {currentWeather.wind.speed}km/h
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline mx-3"><g transform={`rotate(${currentWeather.wind.deg} 7.5 7.5)`}><path d="M11.1464 6.85355C11.3417 7.04882 11.6583 7.04882 11.8536 6.85355C12.0488 6.65829 12.0488 6.34171 11.8536 6.14645L7.85355 2.14645C7.65829 1.95118 7.34171 1.95118 7.14645 2.14645L3.14645 6.14645C2.95118 6.34171 2.95118 6.65829 3.14645 6.85355C3.34171 7.04882 3.65829 7.04882 3.85355 6.85355L7.5 3.20711L11.1464 6.85355ZM11.1464 12.8536C11.3417 13.0488 11.6583 13.0488 11.8536 12.8536C12.0488 12.6583 12.0488 12.3417 11.8536 12.1464L7.85355 8.14645C7.65829 7.95118 7.34171 7.95118 7.14645 8.14645L3.14645 12.1464C2.95118 12.3417 2.95118 12.6583 3.14645 12.8536C3.34171 13.0488 3.65829 13.0488 3.85355 12.8536L7.5 9.20711L11.1464 12.8536Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" /></g></svg>
          </p>
          <Separator className="m-4 mx-auto" />
        </div>

        <Accordion type="single" collapsible className="max-w-xs m-auto">

          <AccordionItem value="item-1">
            <AccordionTrigger><b>Prognoza na najbliższe dni</b></AccordionTrigger>
            <AccordionContent>
              {forecastWeather.list.map((element: any) => {
                let newDayBool = false
                let date = `${element.dt_txt.slice(8, 10)}.${element.dt_txt.slice(5, 7)}`
                let time = `${element.dt_txt.slice(10, -3)}`
                if (parseInt(element.dt_txt.slice(10, -6)) === 0) newDayBool = true;

                return (
                  <>
                    {!!newDayBool &&
                      <>
                        <Separator className="w-80 my-4 mx-auto" />
                        <div className="text-3xl"><b>{date}</b></div>
                      </>
                    }
                    <div className="text-lg">
                      {time} <p className="text-3xl inline">{'[ '}</p>{Math.round(element.main.temp)}°C
                      <img src={
                        `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`
                      } className="inline align-middle max-h-14"
                        alt="Icon representing current weather"
                      />
                      <p className="text-3xl inline">{']'}</p>
                    </div>
                  </>
                )
              })}
            </AccordionContent>
          </AccordionItem>

        </Accordion>

      </CardContent >

    </Card>
  )
}

async function fetchWeatherData(location: string, apiKey: string | undefined) {

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch current weather');
  }

  const data: CurrentWeather = await res.json();
  return data;

}

async function fetchForecastData(location: string, apiKey: string | undefined) {

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch forecast');
  }

  const data = await res.json();
  return data;

}