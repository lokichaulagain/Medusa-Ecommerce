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
import { AxiosInstance } from "@/app/(repositories)/config";
import LoaderSpin from "@/components/website/LoaderSpin";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/Logo.webp";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCreateCustomer, useMeCustomer } from "medusa-react";

const formSchema = z.object({
  first_name: z.string().min(4, {
    message: "First Name must be 4 characters.",
  }),

  last_name: z.string().min(4, {
    message: "Last Name must be 4 characters.",
  }),

  email: z.string().email(),

  password: z.string().min(7, {
    message: "Password must be 7 characters.",
  }),
});

export default function RegisterCard() {
  const createCustomer = useCreateCustomer();

  // const { customer, isLoading } = useMeCustomer();
  // console.log(customer, isLoading);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  // Define a submit handler.
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    createCustomer.mutate(values, {
      onSuccess: ({ customer }) => {
        toast.success("Your account has been created successfully. Welcome to our store.");
        setIsLoading(false);
      },
      onError(error: any, variables, context) {
        toast.error(error.response.data.message || "Something went wrong. Please try again . Sorry for the inconvenience.");
        setIsLoading(false);
      },
      onSettled(data, error: any, variables, context) {
        setIsLoading(false);
        error && toast.error(error.response.data.message || "Something went wrong. Please try again . Sorry for the inconvenience.");
        if (data) {
          toast.success("Your account has been created successfully.  Welcome to our store");
          form.reset();
          router.push("/");
        }
      },
    });
  };

  const router = useRouter();
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
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Loki Chaulagain "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Chaulagain"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
              <Button disabled={isLoading}>
                {isLoading ? (
                  <p className=" flex items-center gap-1">
                    <LoaderSpin /> Register
                  </p>
                ) : (
                  "Register"
                )}
              </Button>

              {/* <Button>Register</Button> */}
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
