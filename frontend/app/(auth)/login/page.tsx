"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { toast } from "sonner";
import LoaderSpin from "@/components/website/LoaderSpin";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/Logo.webp";
import { ArrowLeft } from "lucide-react";
import Medusa from "@medusajs/medusa-js";

const formSchema = z.object({
  email: z.string().email(),

  password: z.string().min(7, {
    message: "Password must be 7 characters.",
  }),
});

const medusa = new Medusa({ baseUrl: `${process.env.NEXT_PUBLIC_MEDUSA_API}`, maxRetries: 3 });

export default function Page() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [isLoging, setIsLoging] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoging(true);
    medusa.auth
      .authenticate(values)
      .then(({ customer, response }) => {
        if (customer) {
          toast.success("You have been logged in successfully. Welcome to our store.");
          router.push("/");
          form.reset();
          setIsLoging(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error("Either email or password is incorrect.");
          setIsLoging(false);
          return;
        } else {
          toast.error("Something went wrong , please try again.");
          setIsLoging(false);
          return;
        }
      });
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className=" flex flex-col ">
      <div
        onClick={goBack}
        className=" fixed top-0 mt-4 flex items-center gap-1 text-xs text-primary-700/90">
        <ArrowLeft /> Back
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="text-center mb-8">
            <Image
              src={logo}
              alt="logo"
              width={150}
              height={150}
              className=" mx-auto"
            />
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
              <p className="">
                Dont have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-indigo-600 hover:text-indigo-500">
                  Register
                </Link>
              </p>
            </div>
          </div>

          <Card className="w-full  lg:w-[450px]">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Please login before purchasing any product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="demoloki@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className=" flex justify-end">
              <Button disabled={isLoging}>
                {isLoging ? (
                  <p className=" flex items-center gap-1">
                    <LoaderSpin /> Login
                  </p>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
