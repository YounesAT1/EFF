"use client";

import CountrySelect, { CountrySelectValue } from "@/components/CountrySelect";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingFormSchema } from "@/lib/schmas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import PhoneSelect, { PhoneSelectValue } from "@/components/phoneCodes";

const steps = [
  {
    id: "Step one",
    name: "Personal information",
    fields: [
      "email",
      "gender",
      "title",
      "firstName",
      "lastName",
      "nationality",
      "dateOfBirth",
      "phoneNumber",
      "passportNumber",
      "passportExpirationDate",
    ],
  },
  {
    id: "Step two",
    name: "Payment details",
    fields: [],
  },
  {
    id: "Step three",
    name: "Comfirmation",
    fields: [],
  },
];

export default function BookingForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [phoneCode, setPhoneCode] = useState<PhoneSelectValue>();

  const delta = currentStep - previousStep;

  const form = useForm<z.infer<typeof BookingFormSchema>>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      email: "",
      gender: "",
      title: "",
      firstName: "",
      lastName: "",
      nationality: undefined,
      dateOfBirth: undefined,
      phoneNumber: "",
      passportNumber: "",
      passportExpirationDate: undefined,
    },
  });

  const handleSubmit = (data: z.infer<typeof BookingFormSchema>) => {
    console.log(data);
  };

  return (
    <div>
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-violet-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-semibold text-violet-600 transition-colors ">
                    {step.name}
                  </span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-violet-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-semibold text-violet-600">
                    {step.name}
                  </span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-semibold text-gray-500 transition-colors">
                    {step.name}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <Form {...form}>
        <form
          className="mt-10"
          autoComplete="off"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          {currentStep === 0 && (
            <div className="flex flex-col gap-y-7">
              <div className="w-[50%]">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-x-2">
                        <p className=" text-gray-700 font-semibold">Email</p>
                      </FormLabel>
                      <FormControl className=" w-full shadow-none outline-none focus:border-[#8B5CF6] hover:border-[#8B5CF6]">
                        <Input
                          {...field}
                          id="email"
                          name="email"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage className="dark:text-red-700" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center justify-between w-full">
                <div className="w-[150px]">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <p className=" text-gray-700 font-semibold">Gender</p>
                        </FormLabel>
                        <FormControl className="shadow-none ">
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="shadow-none border-gray-200 w-full">
                              <SelectValue placeholder="Male / Female" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Choose your gender</SelectLabel>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="dark:text-red-700" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-[150px]">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <p className=" text-gray-700 font-semibold">Title</p>
                        </FormLabel>
                        <FormControl className="shadow-none ">
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="shadow-none border-gray-200 w-full">
                              <SelectValue placeholder="Mr / Ms / Mrs" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Choose your title</SelectLabel>
                                <SelectItem value="Mr">Mr.</SelectItem>
                                <SelectItem value="Ms">Ms.</SelectItem>
                                <SelectItem value="Mrs">Mrs.</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="dark:text-red-700" />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-x-2">
                          <p className=" text-gray-700 font-semibold">
                            First name
                          </p>
                        </FormLabel>
                        <FormControl className=" w-full shadow-none outline-none focus:border-[#8B5CF6] hover:border-[#8B5CF6]">
                          <Input
                            {...field}
                            id="firstName"
                            name="FirstName"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage className="dark:text-red-700" />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-x-2">
                          <p className=" text-gray-700 font-semibold">
                            Last name
                          </p>
                        </FormLabel>
                        <FormControl className=" w-full shadow-none outline-none focus:border-[#8B5CF6] hover:border-[#8B5CF6]">
                          <Input
                            {...field}
                            id="lastName"
                            name="lastName"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage className="dark:text-red-700" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="w-full flex items-center justify-between gap-x-2">
                <div className="w-[50%]">
                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem className="w-50%">
                        <FormLabel>
                          <p className=" text-gray-700 font-semibold mb-[8px]">
                            Nationality
                          </p>
                        </FormLabel>
                        <FormControl className="w-[50%]">
                          <CountrySelect
                            value={field.value}
                            onChange={(value: CountrySelectValue) =>
                              field.onChange(value)
                            }
                          />
                        </FormControl>
                        <FormMessage className="dark:text-red-700" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-[50%]">
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-gray-700 font-semibold">
                          Date of birth
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild className="w-full">
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal shadow-none border-gray-200 hover:border-[#8B5CF6] focus:border-[#8B5CF6] cursor-pointer",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="w-[70%] flex items-center gap-x-2">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-x-2">
                        <p className=" text-gray-700 font-semibold">
                          Phone number
                        </p>
                      </FormLabel>
                      <FormControl
                        className=" w-full shadow-none outline-none focus:border-[#8B5CF6] 
                      hover:border-[#8B5CF6]"
                      >
                        <div className="flex items-center gap-x-2 w-full">
                          <PhoneSelect
                            value={phoneCode}
                            onChange={(value: PhoneSelectValue) =>
                              setPhoneCode(value)
                            }
                          />
                          <Input
                            {...field}
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            className="shadow-none outline-none focus:border-[#8B5CF6] 
                            hover:border-[#8B5CF6]"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="dark:text-red-700" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex items-center justify-between gap-x-2">
                <div className="w-[50%]">
                  <FormField
                    control={form.control}
                    name="passportNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-x-2">
                          <p className=" text-gray-700 font-semibold">
                            Passport number
                          </p>
                        </FormLabel>
                        <FormControl className=" w-full shadow-none outline-none focus:border-[#8B5CF6] hover:border-[#8B5CF6]">
                          <Input
                            {...field}
                            id="passportNumber"
                            name="passportNumber"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage className="dark:text-red-700" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-[50%]">
                  <FormField
                    control={form.control}
                    name="passportExpirationDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-gray-700 font-semibold">
                          Passport experation date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild className="w-full">
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal shadow-none border-gray-200 hover:border-[#8B5CF6] focus:border-[#8B5CF6] cursor-pointer",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between w-full mt-10">
            <Button disabled={currentStep === 0}>Previous</Button>
            <Button>Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
