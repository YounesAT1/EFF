"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import AsyncSelect from "react-select/async";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { BedSingle, CalendarDays, Dot, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { z } from "zod";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { customStyles } from "@/lib/selectStyles";
import useGetCities from "@/hooks/getCities";

const formSchema = z.object({
  cityName: z.object({ value: z.string() }).or(z.string()),
  dates: z
    .object({
      from: z.date().refine((date) => !!date, {
        message: "Please select a departure date.",
      }),
      to: z.date().refine((date) => !!date, {
        message: "Please select a return date.",
      }),
    })
    .refine(({ from, to }) => !!from && !!to, {
      message: "Please select both departure and return dates.",
    }),
  adultsAndRooms: z.object({
    adults: z.number().min(0),
    rooms: z.number().min(0),
  }),
});

export default function HotelSearch() {
  const [adultCount, setAdultCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cityName: "",
      dates: {
        from: undefined,
        to: undefined,
      },
      adultsAndRooms: {
        adults: adultCount,
        rooms: roomCount,
      },
    },
  });

  const handleAdultCountChange = (increment: boolean) => {
    if (increment) {
      setAdultCount((prevCount) => prevCount + 1);
    } else {
      if (adultCount > 1) {
        setAdultCount((prevCount) => prevCount - 1);
      }
    }
  };

  const handleRoomCountChange = (increment: boolean) => {
    if (increment) {
      setRoomCount((prevCount) => prevCount + 1);
    } else {
      if (roomCount > 0) {
        setRoomCount((prevCount) => prevCount - 1);
      }
    }
  };

  const { loadOptions, cities } = useGetCities();

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const city =
      typeof values.cityName === "object"
        ? (values.cityName as { value: string }).value
        : values.cityName;

    console.log({
      cityName: city,
      adults: values.adultsAndRooms.adults,
      rooms: values.adultsAndRooms.rooms,
      dates: values.dates,
    });
  };

  return (
    <section className="flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col lg:flex-row lg:mx-auto items-center justify-center space-x-0 lg:space-x-2 space-y-4 lg:space-y-0 rounded-lg sm:mx-0 sm:w-[1250px] w-[300px] "
          autoComplete="off"
        >
          <div className="grid w-[400px] gap-1.5">
            <FormField
              control={form.control}
              name="cityName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-800 dark:text-white flex items-center">
                    <BedSingle className="mr-2  text-slate-800 dark:text-white" />
                    <p className="text-xl">Where are you going</p>
                  </FormLabel>
                  <FormControl>
                    <AsyncSelect
                      {...field}
                      placeholder="Tokyo, Japan"
                      className="bg-gray-200 dark:text-slate-800 rounded-lg border-muted focus:outline-none outline-none text-l text-slate-800 placeholder:text-gray-500"
                      loadOptions={(inputValue) => loadOptions(inputValue)}
                      isSearchable
                      options={cities}
                      cacheOptions
                      styles={customStyles}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid w-[400px] gap-1.5 items-center">
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
                          className={cn(
                            "w-full justify-start text-left font-normal shadow-none h-[38px] border border-slate-300 hover:border-[#8B5CF6] focus:border-[#8B5CF6] hover:bg-white text-black focus:bg-white",
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
                            <span className=" text-gray-500">
                              Check in date - Check out date
                            </span>
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

          <div className="grid w-[400px] gap-1.5 items-center">
            <FormField
              control={form.control}
              name="adultsAndRooms"
              render={() => (
                <FormItem>
                  <FormLabel className="text-slate-800 dark:text-white flex items-center">
                    <User className="mr-2 text-slate-800 dark:text-white" />
                    <p className="text-xl">Adults & Rooms</p>
                  </FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center justify-center border hover:border-[#8B5CF6] focus:border-[#8B5CF6] border-slate-300 h-[38px] rounded-md focus:outline-none text-muted-foreground w-full dark:bg-white dark:text-slate-800">
                        {adultCount}-Adults <Dot /> {roomCount}-Rooms
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>
                          Choose the number of adults and rooms
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center justify-between h-12 cursor-pointer focus:bg-white dark:focus:bg-slate-600/80">
                          <p className="font-medium text-slate-600 dark:text-white">
                            Adults
                          </p>
                          <div className="flex items-center gap-x-5">
                            <Button
                              variant="ghost"
                              className="rounded-full bg-gray-100 dark:bg-slate-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAdultCountChange(false);
                              }}
                            >
                              <span className="font-medium text-2xl"> - </span>
                            </Button>
                            <span className="dark:text-white">
                              {adultCount}
                            </span>
                            <Button
                              variant="ghost"
                              className="rounded-full bg-gray-100 dark:bg-slate-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAdultCountChange(true);
                              }}
                            >
                              <span className="font-medium text-2xl"> + </span>
                            </Button>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center justify-between h-12 focus:bg-white cursor-pointer dark:focus:bg-slate-600/80">
                          <p className="font-medium text-slate-600 dark:text-white">
                            Rooms
                          </p>
                          <div className="flex items-center gap-x-5">
                            <Button
                              variant="ghost"
                              className="rounded-full bg-gray-100 dark:bg-slate-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRoomCountChange(false);
                              }}
                            >
                              <span className="font-medium text-2xl"> - </span>
                            </Button>
                            <span className="dark:text-white">{roomCount}</span>
                            <Button
                              variant="ghost"
                              className="rounded-full bg-gray-100 dark:bg-slate-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRoomCountChange(true);
                              }}
                            >
                              <span className="font-medium text-2xl"> + </span>
                            </Button>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button
              type="submit"
              variant={"default"}
              className="text-white dark:bg-white dark:text-slate-800 lg:mt-[34px] md:mt-0 sm:mt-0 w-[300px] sm:w-full h-[38px]"
            >
              Search
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
