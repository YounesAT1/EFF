"use client";
import useAuthContext from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PageLoader from "./Loader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/helpers";
import { Button } from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import Link from "next/link";
import toast from "react-hot-toast";
import { axiosClient } from "@/api/axios";
import { useRouter } from "next/navigation";

const Details = () => {
  const router = useRouter();
  const { user, getUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      setIsLoading(false);
    }
  }, [getUser, user]);

  useEffect(() => {
    if (user) {
      setUserData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        picture: user.picture || "",
        password: "",
        passwordConfirmation: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData();
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("email", userData.email);
    if (userData.password) formData.append("password", userData.password);
    if (userData.passwordConfirmation)
      formData.append("password_confirmation", userData.passwordConfirmation);
    if (selectedImage) formData.append("picture", selectedImage);

    try {
      const res = await axiosClient.post(`/api/user/${user?.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        setIsLoading(false);
        toast.success(res.data.message);
        router.push("/");
      } else {
        toast.error("Something went wrong");
        setIsLoading(false);
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 422) {
          setErrors(err.response.data.errors);
        } else if (err.response.status === 404) {
          toast.error("User not found");
        } else {
          toast.error("Unexpected error");
        }
      }
      setIsLoading(false);
    }
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PageLoader />
      </div>
    );
  }

  const initials = getInitials({
    firstName: user?.firstName!,
    lastName: user?.lastName!,
  });

  return (
    <div className="max-w-7xl mx-auto p-3 flex flex-col gap-y-8">
      <h1 className="text-3xl text-slate-600 font-semibold text-center mt-12">
        Hello{" "}
        <span className="bg-violet-500 px-3 py-2 text-white rounded-md">
          {user?.firstName}
        </span>{" "}
        Welcome to your personal space.
      </h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex justify-between w-full"
          autoComplete="off"
          encType="multipart/form-data"
          method="post"
        >
          <div className="flex flex-col gap-y-4">
            <div>
              <label htmlFor="firstName">First Name</label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                className="shadow-none w-[500px]"
              />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                className="shadow-none w-[500px]"
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName}</p>
              )}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Input
                type="text"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="shadow-none w-[500px]"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Input
                type="text"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                className="shadow-none w-[500px]"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>
            <div>
              <label htmlFor="passwordConfirmation">
                Password confirmation
              </label>
              <Input
                type="text"
                id="passwordConfirmation"
                name="passwordConfirmation"
                value={userData.passwordConfirmation}
                onChange={handleInputChange}
                className="shadow-none w-[500px]"
              />
              {errors.password_confirmation && (
                <p className="text-red-500">{errors.password_confirmation}</p>
              )}
            </div>
          </div>
          <Card className="shadow-none flex items-center justify-center pb-0">
            <CardContent className="flex flex-col items-center space-y-3">
              <div className="w-48 h-48 rounded-full border border-slate-300 flex items-center justify-center mt-12">
                {selectedImage ? (
                  <Image
                    src={URL.createObjectURL(selectedImage)}
                    alt={`${user?.firstName}`}
                    className="w-full h-full object-cover rounded-full"
                    width={140}
                    height={140}
                    quality={100}
                    priority
                  />
                ) : user?.picture ? (
                  <Image
                    src={`http://localhost:8000/${user.picture}`}
                    alt={`${user?.firstName}`}
                    className="w-full h-full object-cover rounded-full"
                    width={140}
                    height={140}
                    quality={100}
                    priority
                  />
                ) : (
                  <Avatar className="w-full h-full">
                    <AvatarFallback className="font-medium text-4xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className="overflow-hidden">
                <label htmlFor="picture">Profile picture</label>
                <Input
                  type="file"
                  id="picture"
                  name="picture"
                  onChange={handlePictureChange}
                  className="shadow-none w-[500px]"
                />
                {errors.picture && (
                  <p className="text-red-500">{errors.picture}</p>
                )}
              </div>
              <div className="flex flex-col items-center w-full gap-y-2">
                <Button className="w-full" type="submit">
                  {isLoading ? <Loader /> : "Update"}
                </Button>
                <Link
                  href="/"
                  className="text-white bg-red-500 rounded-md w-full text-center py-[6px] hover:bg-red-600"
                >
                  Cancel
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Details;
