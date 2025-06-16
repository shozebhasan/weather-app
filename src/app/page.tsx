/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplets, Search, Thermometer, Wind } from "lucide-react";
import { getWeatherData } from "./actions";
import { useState } from "react";
import { WeatherData } from "../../types/weather";
import { Card, CardContent } from "@/components/ui/card";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg"
    >
      <Search className={`h-5 w-5 ${pending ? "animate-spin" : ""}`} />
    </Button>
  );
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  const handleSearch = async (formData: FormData) => {
    setError("");

    const city = formData.get("city") as string;
    const { data, error: weatherError } = await getWeatherData(city);

    if (weatherError) {
      setError(weatherError);
      setWeather(null);
    }

    if (data) {
      setWeather(data);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 p-4 flex items-center justify-center text-gray-800 overflow-hidden">


      {/* Background animation layer */}
<div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
  {/* Sun Image */}
  <motion.img
    src="/sunimg.png"
    alt="Sun"
    className="absolute top-10 right-10 w-32 h-32"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
  />

  {/* Cloud 1 Image */}
  <motion.img
    src="/cloudimg.png"
    alt="Cloud"
    className="absolute top-20 left-10 w-40 opacity-70"
    initial={{ x: -200 }}
    animate={{ x: 300 }}
    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
  />

  {/* Cloud 2 Image */}
  <motion.img
    src="/cloudimg.png"
    alt="Cloud"
    className="absolute top-40 left-1/2 w-60 opacity-60"
    initial={{ x: -300 }}
    animate={{ x: 400 }}
    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
  />

  {/* Cloud 3 Image */}
  <motion.img
    src="/cloudimg.png"
    alt="Cloud"
    className="absolute bottom-10 right-0 w-48 opacity-50"
    initial={{ x: 200 }}
    animate={{ x: -300 }}
    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
  />
</div>


      <div className="w-full max-w-md space-y-6">
        <motion.h1
  className="font-bold text-white text-2xl"
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Enter Country You Want To Search
</motion.h1>
        <form
          action={handleSearch}
          className="flex gap-2 bg-white/80 p-3 rounded-xl shadow-lg backdrop-blur"
        >
          <Input
            name="city"
            type="text"
            placeholder="Enter city name..."
            className="flex-1 text-gray-700"
            required
          />
          <SubmitButton />
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-sm text-red-100 bg-red-600 rounded-md p-3 shadow-md"
          >
            {error}
          </motion.div>
        )}

        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-white/80 rounded-2xl shadow-xl backdrop-blur">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <motion.h2
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-extrabold text-gray-800"
                  >
                    {weather.name}
                  </motion.h2>
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <motion.img
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                      width={64}
                      height={64}
                      className="drop-shadow-md"
                    />
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-6xl font-bold text-gray-900"
                    >
                      {Math.round(weather.main.temp)}°C
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-600 mt-2 text-lg capitalize"
                  >
                    {weather.weather[0].description}
                  </motion.div>
                </div>

                <motion.div
                  className="grid grid-cols-3 gap-6 mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div
                    className="text-center bg-white/70 p-4 rounded-xl shadow hover:scale-105 transition-transform"
                  >
                    <Thermometer className="w-6 h-6 mx-auto text-orange-500" />
                    <div className="mt-2 text-sm text-gray-600">Feels like</div>
                    <div className="font-semibold text-gray-800">
                      {Math.round(weather.main.feels_like)}°C
                    </div>
                  </motion.div>

                  <motion.div
                    className="text-center bg-white/70 p-4 rounded-xl shadow hover:scale-105 transition-transform"
                  >
                    <Droplets className="w-6 h-6 mx-auto text-blue-500" />
                    <div className="mt-2 text-sm text-gray-600">Humidity</div>
                    <div className="font-semibold text-gray-800">
                      {weather.main.humidity}%
                    </div>
                  </motion.div>

                  <motion.div
                    className="text-center bg-white/70 p-4 rounded-xl shadow hover:scale-105 transition-transform"
                  >
                    <Wind className="w-6 h-6 mx-auto text-teal-500" />
                    <div className="mt-2 text-sm text-gray-600">Wind</div>
                    <div className="font-semibold text-gray-800">
                      {Math.round(weather.wind.speed)} m/s
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
