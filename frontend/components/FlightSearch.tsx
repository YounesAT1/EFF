"use client";
import { format } from "date-fns";
import AsyncSelect from "react-select/async";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "./ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  CalendarDays,
  PersonStanding,
  PlaneLanding,
  PlaneTakeoff,
  RockingChair,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { customStyles } from "@/lib/selectStyles";
import useAirportOptions from "@/hooks/loadAirports";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const formSchema = z.object({
  departure: z.object({ value: z.string() }).or(z.string()),
  arrival: z.object({ value: z.string() }).or(z.string()),
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
  numberOfPassengers: z.number().refine((value) => value >= 1, {
    message: "Please select at least 1 passenger.",
  }),
  cabin: z.string(),
});

const FlightSearch = () => {
  const router = useRouter();

  //? FROM VALIDATION WITH ZOD
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departure: "",
      arrival: "",
      dates: {
        from: undefined,
        to: undefined,
      },
      numberOfPassengers: 0,
      cabin: "",
    },
  });

  //? FILGHT SEARCH SUBMIT FUNCTION
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const departure =
      typeof values.departure === "object"
        ? (values.departure as { value: string }).value
        : values.departure;
    const arrival =
      typeof values.arrival === "object"
        ? (values.arrival as { value: string }).value
        : values.arrival;

    const formattedFromDate =
      values.dates.from?.toISOString().slice(0, 10) ?? "";
    const formattedToDate = values.dates.to?.toISOString().slice(0, 10) ?? "";
    const passengers = values.numberOfPassengers;
    const cabin = values.cabin;

    const url = `/flights?departure=${departure}&arrival=${arrival}&from=${formattedFromDate}&to=${formattedToDate}&passengers=${passengers}&travelClass=${cabin}`;

    router.push(url);
    form.reset();
  };

  //? LOAD AIRPORTS OPTIONS HOOK
  const { airportOptions, loadOptions } = useAirportOptions();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col lg:flex-row lg:mx-auto items-center justify-center space-x-0 lg:space-x-2 space-y-4 lg:space-y-0 rounded-lg  sm:mx-0 sm:w-[1250px] w-[300px] "
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
                    className="bg-gray-100 dark:text-slate-800 rounded-lg text-l text-slate-800 placeholder:text-gray-500 flight"
                    loadOptions={(inputValue) => loadOptions(inputValue)}
                    options={airportOptions}
                    isSearchable
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
                    className="bg-gray-200 dark:text-slate-800 rounded-lg border-muted focus:outline-none outline-none text-l text-slate-800 placeholder:text-gray-500 flight"
                    loadOptions={(inputValue) => loadOptions(inputValue)}
                    isSearchable
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
                          <span className=" text-gray-500">From - To</span>
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
        <div className="grid w-full   gap-1.5">
          <FormField
            control={form.control}
            name="cabin"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mr-2 text-slate-800 dark:text-white flex items-center">
                  <RockingChair className="mr-2 text-slate-800 dark:text-white" />
                  <p className="text-xl">Cabin class</p>
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full shadow-none outline-none dark:bg-white dark:text-gray-500  ">
                      <SelectValue placeholder="Select a cabin class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select a cabin class</SelectLabel>

                        <SelectItem value="ECONOMY" className="cursor-pointer">
                          Economy
                        </SelectItem>
                        <SelectItem
                          value="PREMIUM_ECONOMY"
                          className="cursor-pointer"
                        >
                          Premium economy
                        </SelectItem>
                        <SelectItem value="BUISNESS" className="cursor-pointer">
                          Business
                        </SelectItem>
                        <SelectItem value="FIRST" className="cursor-pointer">
                          First class
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className=" w-[200px] lg:max-x-sm gap-1.5  flex items-center justify-center flex-col">
          <FormField
            control={form.control}
            name="numberOfPassengers"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mr-2 text-slate-800 dark:text-white flex items-center">
                  <PersonStanding className="mr-2 text-slate-800 dark:text-white" />
                  <p className="text-xl">Passengers</p>
                </FormLabel>
                <FormControl>
                  <div className="flex items-center justify-center">
                    <Button
                      type="button"
                      onClick={() =>
                        form.setValue("numberOfPassengers", field.value - 1)
                      }
                      disabled={field.value === 0}
                      className="h-[38px] "
                    >
                      <span className="font-semibold"> - </span>
                    </Button>
                    <p className="mx-2 font-semibold">{field.value}</p>
                    <Button
                      type="button"
                      onClick={() =>
                        form.setValue("numberOfPassengers", field.value + 1)
                      }
                      className="h-[38px]"
                      disabled={field.value === 10}
                    >
                      <span className="font-semibold"> + </span>
                    </Button>
                  </div>
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
  );
};

export default FlightSearch;
