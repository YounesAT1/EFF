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
import { BadgeCheck, CalendarIcon, Plane } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import PhoneSelect, { PhoneSelectValue } from "@/components/phoneCodes";
import { motion } from "framer-motion";
import { decodeData, getCardType, months, steps } from "@/lib/helpers";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function BookingForm() {
  const params = useSearchParams();

  const flight = params.get("flight");
  const flightOfferInfos = decodeData(flight);

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
      cardHolderLastName: "",
      cardHolderFirstName: "",
      cardCVV: "",
      cardNumber: "",
      cardExperationDate: undefined,
    },
  });

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  type Inputs = z.infer<typeof BookingFormSchema>;
  type FieldName = keyof Inputs;

  const processForm: SubmitHandler<Inputs> = (
    data: z.infer<typeof BookingFormSchema>
  ) => {
    console.log(data);
    form.reset();
  };

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });
    if (!output) return;

    if (currentStep < steps.length - 1) {
      // if (currentStep === steps.length - 2) {
      //   await form.handleSubmit(processForm)();
      // }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const cardType =
    currentStep === 1 ? getCardType(form.watch("cardNumber")) : null;

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
          onSubmit={form.handleSubmit(processForm)}
        >
          {currentStep === 0 && (
            <motion.div
              className="flex flex-col gap-y-7"
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
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
                        <div className="flex gap-2">
                          {/* Select for years */}
                          <FormControl className="w-1/3">
                            <Select
                              onValueChange={(year) =>
                                field.onChange(
                                  new Date(
                                    //@ts-ignore
                                    year,
                                    field.value ? field.value.getMonth() : 0,
                                    field.value ? field.value.getDate() : 1
                                  )
                                )
                              }
                              value={
                                field.value
                                  ? field.value.getFullYear().toString()
                                  : ""
                              }
                            >
                              <SelectTrigger className="shadow-none border-gray-200">
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {Array.from(
                                    { length: 100 },
                                    (_, i) => new Date().getFullYear() - i
                                  ).map((year) => (
                                    <SelectItem
                                      key={year}
                                      value={year.toString()}
                                    >
                                      {year}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          {/* Select for months */}
                          <FormControl className="w-1/3">
                            <Select
                              onValueChange={(month) =>
                                field.onChange(
                                  new Date(
                                    field.value
                                      ? field.value.getFullYear()
                                      : new Date().getFullYear(),
                                    months.indexOf(month),
                                    field.value ? field.value.getDate() : 1
                                  )
                                )
                              }
                              value={
                                field.value
                                  ? months[field.value.getMonth()]
                                  : ""
                              }
                            >
                              <SelectTrigger className="shadow-none border-gray-200">
                                <SelectValue placeholder="Month" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {months.map((month: string) => (
                                    <SelectItem key={month} value={month}>
                                      {month}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          {/* Select for days */}
                          <FormControl className="w-1/3">
                            <Select
                              onValueChange={(day) =>
                                field.onChange(
                                  new Date(
                                    field.value
                                      ? field.value.getFullYear()
                                      : new Date().getFullYear(),
                                    field.value ? field.value.getMonth() : 0,
                                    parseInt(day)
                                  )
                                )
                              }
                              value={
                                field.value
                                  ? field.value.getDate().toString()
                                  : ""
                              }
                            >
                              <SelectTrigger className="shadow-none border-gray-200">
                                <SelectValue placeholder="Day" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {Array.from(
                                    { length: 31 },
                                    (_, i) => i + 1
                                  ).map((day) => (
                                    <SelectItem
                                      key={day}
                                      value={day.toString()}
                                    >
                                      {day}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </div>
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
                        <p className="text-gray-700 font-semibold">
                          Phone number
                        </p>
                      </FormLabel>
                      <FormControl className="w-full shadow-none outline-none focus:border-[#8B5CF6] hover:border-[#8B5CF6]">
                        <div className="flex items-center gap-x-2 w-full">
                          <PhoneSelect
                            value={phoneCode}
                            onChange={(value: PhoneSelectValue) => {
                              setPhoneCode(value);
                              const updatedPhoneNumber = value
                                ? `${value.value} `
                                : "";
                              field.onChange(updatedPhoneNumber);
                            }}
                          />
                          <Input
                            {...field}
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            className="shadow-none outline-none focus:border-[#8B5CF6] hover:border-[#8B5CF6]"
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
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex flex-col items-center gap-y-5 mt-10">
                <div>
                  <h1 className="text-xl font-semibold text-slate-600 leading-3 ">
                    <span className="text-2xl font-bold bg-sky-500  text-white py-1 px-2 rounded  italic">
                      You are
                    </span>{" "}
                    <span className=" text-2xl font-bold bg-rose-500  text-white py-1 px-2 rounded  italic ">
                      one step
                    </span>
                    {"  "}
                    <span className="text-2xl font-bold bg-emerald-400 text-white py-1 px-2 rounded  italic">
                      away from your
                    </span>{" "}
                    <span className="text-2xl font-bold bg-indigo-500  text-white py-1 px-2 rounded  italic">
                      next adventure
                    </span>
                  </h1>
                </div>
                <div className="flex items-center justify-between w-full gap-x-2 mt-14">
                  <div className="w-[50%]">
                    <FormField
                      control={form.control}
                      name="cardHolderFirstName"
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
                              id="cardHolderFirstName"
                              name="cardHolderFirstName"
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
                      name="cardHolderLastName"
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
                              id="cardHolderLastName"
                              name="cardHolderLastName"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage className="dark:text-red-700" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-x-1 w-full">
                  <div className="w-[100%]">
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-x-2">
                            <p className="text-gray-700 font-semibold">
                              Account number
                            </p>
                          </FormLabel>
                          <FormControl className="w-full shadow-none outline-none focus:border-[#8B5CF6] hover:border-[#8B5CF6]">
                            <Input
                              {...field}
                              name="cardNumber"
                              id="cardNumber"
                              type="text"
                              max={16}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  {cardType && (
                    <div>
                      <p className="text-gray-700 font-semibold">Type</p>
                      <div className="p-2 border-gray-200 border rounded">
                        {cardType === "visa" ? (
                          <Image
                            src="/visa.png"
                            alt="Visa"
                            width={33}
                            height={33}
                            priority
                          />
                        ) : cardType === "masterCard" ? (
                          <Image
                            src="/mastercard.png"
                            alt="Mastercard"
                            width={33}
                            height={33}
                            priority
                          />
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center w-full gap-x-2 justify-between">
                  <div className="w-[60%]">
                    <FormField
                      control={form.control}
                      name="cardExperationDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-gray-700 font-semibold">
                            Card experation date
                          </FormLabel>
                          <div className="flex gap-2">
                            {/* Select for months */}
                            <FormControl className="w-1/2">
                              <Select
                                onValueChange={(month) =>
                                  field.onChange(
                                    new Date(
                                      field.value
                                        ? field.value.getFullYear()
                                        : new Date().getFullYear(),
                                      months.indexOf(month),
                                      field.value ? field.value.getDate() : 1
                                    )
                                  )
                                }
                                value={
                                  field.value
                                    ? months[field.value.getMonth()]
                                    : ""
                                }
                              >
                                <SelectTrigger className="shadow-none border-gray-200">
                                  <SelectValue placeholder="Month" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {months.map((month: string) => (
                                      <SelectItem key={month} value={month}>
                                        {month}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            {/* Select for days */}
                            <FormControl className="w-1/2">
                              <Select
                                onValueChange={(day) =>
                                  field.onChange(
                                    new Date(
                                      field.value
                                        ? field.value.getFullYear()
                                        : new Date().getFullYear(),
                                      field.value ? field.value.getMonth() : 0,
                                      parseInt(day)
                                    )
                                  )
                                }
                                value={
                                  field.value
                                    ? field.value.getDate().toString()
                                    : ""
                                }
                              >
                                <SelectTrigger className="shadow-none border-gray-200">
                                  <SelectValue placeholder="Day" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {Array.from(
                                      { length: 31 },
                                      (_, i) => i + 1
                                    ).map((day) => (
                                      <SelectItem
                                        key={day}
                                        value={day.toString()}
                                      >
                                        {day}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-[30%]">
                    <FormField
                      control={form.control}
                      name="cardCVV"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-x-2">
                            <p className=" text-gray-700 font-semibold">CVV</p>
                          </FormLabel>
                          <FormControl className=" w-full shadow-none outline-none focus:border-[#8B5CF6] hover:border-[#8B5CF6]">
                            <Input
                              {...field}
                              id="cardCVV"
                              name="cardCVV"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage className="dark:text-red-700" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-xl font-semibold text-slate-600 leading-3">
                    Total : {flightOfferInfos.totalPrice} EUR
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <div className="flex flex-col  items-center justify-center gap-5 h-[400px]">
              <div className="flex items-center gap-x-1">
                <BadgeCheck className="text-green-500 w-10 h-10   " />
                <h1 className="text-3xl font-bold text-slate-800">
                  You have{" "}
                  <span className="bg-green-500 p-2 rounded-md text-white">
                    successfully booked
                  </span>{" "}
                  your flight
                </h1>
                <BadgeCheck className="text-green-500   w-10 h-10 " />{" "}
              </div>
              <p className="text-[20px] font-semibold text-slate-600">
                Please check your email inbox for the flight ticket details
              </p>
              <p className="text-[20px] font-semibold text-slate-500 flex items-center gap-x-2">
                <Plane className="bg-rose-500 text-white rounded-full py-2 w-12 h-12" />
                <span className="bg-sky-500 text-white font-extrabold px-3 py-2 rounded">
                  Enjoy your time
                </span>{" "}
                <span className="bg-rose-500 text-white font-extrabold px-3 py-2 rounded">
                  Make endless momories
                </span>
                <Plane className="bg-sky-500 text-white rounded-full py-2 w-12 h-12" />
              </p>
            </div>
          )}

          <div className="flex items-center justify-between w-full mt-10">
            <Button
              disabled={currentStep === 0}
              onClick={prev}
              className={currentStep === steps.length - 1 ? "hidden" : "block"}
            >
              Previous
            </Button>
            {currentStep !== steps.length - 1 && (
              <Button onClick={next}>Next</Button>
            )}

            {/* {currentStep === steps.length - 1 && (
              <Link
                href="/"
                className="block w-full text-center py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
              >
                Back to home page
              </Link>
            )} */}
          </div>
        </form>
      </Form>
    </div>
  );
}
