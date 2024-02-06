import AsyncSelect from "react-select/async";
import { AxiosResponse } from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { Button } from "./ui/Button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { CalendarDays, MapPin, PlaneLanding, PlaneTakeoff } from "lucide-react";
import React, { useState } from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";

export const formSchema = z.object({
  departure: z.object({ value: z.string() }).or(z.string()),
  arrival: z.object({ value: z.string() }).or(z.string()),
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

const FlightSearch = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departure: "",
      arrival: "",
      dates: {
        from: undefined,
        to: undefined,
      },
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const departure =
      typeof values.departure === "object"
        ? (values.departure as { value: string }).value
        : values.departure;
    const arrival =
      typeof values.arrival === "object"
        ? (values.arrival as { value: string }).value
        : values.arrival;

    console.log({ departure, arrival, dates: values.dates });

    form.reset();
  };

  const [airportOptions, setAirportOptions] = useState([]);

  const loadOptions = async (inputValue: string) => {
    const url = "https://test.api.amadeus.com/v1/reference-data/locations";
    const params = {
      subType: "AIRPORT",
      keyword: inputValue,
      "page[limit]": 10,
      "page[offset]": 0,
      sort: "analytics.travelers.score",
      view: "FULL",
    };

    try {
      const response: AxiosResponse = await axios.get(url, {
        params,
        headers: {
          Accept: "application/vnd.amadeus+json",
          Authorization: "Bearer 9p8DT1Fb5eYGW53basLNcndyrvz6",
        },
      });

      const filteredAirports = response.data.data.filter(
        (airport: {
          address: { cityName: string; countryName: string };
          name: string;
        }) =>
          airport.address.cityName
            .toLowerCase()
            .includes(inputValue.toLowerCase()) ||
          airport.address.countryName
            .toLowerCase()
            .includes(inputValue.toLowerCase()) ||
          airport.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      const airportData = filteredAirports.map(
        (airport: {
          iataCode: string;
          name: string;
          address: { countryName: string };
        }) => ({
          value: airport.iataCode,
          label: `${airport.name}(${airport.iataCode})-${airport.address.countryName}`,
        })
      );

      setAirportOptions(airportData);
      return airportData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col lg:flex-row lg:mx-auto items-center justify-center space-x-0 lg:space-x-2 space-y-4 lg:space-y-0 rounded-lg  sm:mx-0 sm:w-[1250px] w-[335px] mx-6"
      >
        <div className="grid w-full lg:max-w-sm gap-1.5">
          <FormField
            control={form.control}
            name="departure"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-800 dark:text-white flex items-center">
                  <PlaneTakeoff className="mr-2  text-slate-800 dark:text-white" />
                  <p className="text-xl">From</p>
                </FormLabel>
                <FormControl>
                  <AsyncSelect
                    {...field}
                    placeholder="New york"
                    className="bg-gray-100 dark:text-slate-800 rounded-lg text-l text-slate-800"
                    loadOptions={(inputValue) => loadOptions(inputValue)}
                    options={airportOptions}
                    isSearchable
                    cacheOptions
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid w-full lg:max-x-sm  gap-1.5">
          <FormField
            control={form.control}
            name="arrival"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-800 dark:text-white flex items-center">
                  <PlaneLanding className="mr-2  text-slate-800 dark:text-white" />
                  <p className="text-xl">To</p>
                </FormLabel>
                <FormControl>
                  <AsyncSelect
                    {...field}
                    placeholder="Paris"
                    className="bg-gray-200 dark:text-slate-800 rounded-lg border-muted focus:outline-none outline-none text-l text-slate-800"
                    loadOptions={(inputValue) => loadOptions(inputValue)}
                    isSearchable
                    cacheOptions
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid w-full lg:max-x-sm  gap-1.5  items-center ">
          <FormField
            control={form.control}
            name="dates"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-slate-800 dark:text-white flex items-center">
                    <CalendarDays className="mr-2  text-slate-800 dark:text-white" />
                    <p className="text-xl">Duration</p>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild className="bg-white">
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full  justify-start text-left font-normal",
                          !field.value.from && "text-muted-foreground"
                        )}
                      >
                        {field.value?.from ? (
                          field.value.to ? (
                            <p className="dark:text-slate-700">
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </p>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span className=" text-slate-500">From - To</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div>
          <Button
            type="submit"
            variant={"default"}
            className="text-white dark:bg-white dark:text-slate-800 lg:mt-[34px] md:mt-0 sm:mt-0 w-[300px] sm:w-full"
          >
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FlightSearch;
