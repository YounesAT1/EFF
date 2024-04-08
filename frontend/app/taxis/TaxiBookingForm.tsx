"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import AsyncSelect from "react-select/async";
import { customStyles } from "@/lib/selectStyles";
import { MapPin } from "lucide-react";
import useGetAddresses from "@/hooks/getAddresses";
import TaxiChoices from "./TaxiChoices";
import Payment from "@/components/Payment";

const formSchema = z.object({
  destinations: z.object({
    pickUp: z.object({ value: z.string() }).or(z.string()),
    dropOf: z.object({ value: z.string() }).or(z.string()),
  }),
});
export default function TaxiBookingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destinations: {
        pickUp: undefined,
        dropOf: undefined,
      },
    },
  });

  const { loadOptions, addresses } = useGetAddresses();
  return (
    <div className={`p-5 border border-slate-200 rounded-md`}>
      <Form {...form}>
        <form autoComplete="off" className="flex flex-col gap-y-5">
          <div>
            <FormField
              control={form.control}
              name="destinations.pickUp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-800 dark:text-white flex items-center">
                    <MapPin className="mr-2  text-slate-800 dark:text-white" />
                    <p className="text-l">Set Pickup Point</p>
                  </FormLabel>
                  <FormControl>
                    <AsyncSelect
                      {...field}
                      placeholder="8934 Carriage Ave.
                      Bronx, NY 10452"
                      className="bg-gray-200 dark:text-slate-800 rounded-lg border-muted focus:outline-none outline-none text-l text-slate-800 placeholder:text-gray-500 "
                      loadOptions={(inputValue) => loadOptions(inputValue)}
                      isSearchable
                      options={addresses}
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
          <div>
            <FormField
              control={form.control}
              name="destinations.dropOf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-800 dark:text-white flex items-center">
                    <MapPin className="mr-2  text-slate-800 dark:text-white" />
                    <p className="text-l">Set Drop-off Point</p>
                  </FormLabel>
                  <FormControl>
                    <AsyncSelect
                      {...field}
                      placeholder="4 Brewery St.
                      Brooklyn, NY 11215"
                      className="bg-gray-200 dark:text-slate-800 rounded-lg border-muted focus:outline-none outline-none text-l text-slate-800 placeholder:text-gray-500"
                      loadOptions={(inputValue) => loadOptions(inputValue)}
                      isSearchable
                      options={addresses}
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
          <div>
            <TaxiChoices />
          </div>
          <div>
            <h1 className="font-medium text-l">Payment method </h1>
            <Payment />
          </div>
        </form>
      </Form>
    </div>
  );
}
