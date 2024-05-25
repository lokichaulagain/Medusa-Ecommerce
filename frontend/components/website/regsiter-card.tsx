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


// Breadcumb
import { AxiosInstance } from "@/app/(repositories)/config";
import LoaderSpin from "./LoaderSpin";
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const formSchema = z.object({
  fullName: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),

  email: z.string().min(10, {
    message: "Email must be at least 10 characters.",
  }),

  phone: z.coerce.number().min(10, {
    message: "Phone must be at least 10 characters.",
  }),

  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export default function RegisterCard() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: 0,
      password: "",
    },
  });

  // Define a submit handler.
  const [isregistering, setIsregistering] = useState(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsregistering(true);
    try {
      const res = await AxiosInstance.post("/users/register", values);
      if (res.data.status === "success") {
        toast.success(res?.data.msg);
        form.reset();
        setIsregistering(false);
      }
    } catch (error: any) {
      toast.error(error?.response.data.msg);
      setIsregistering(false);
    } finally {
      setIsregistering(false);
    }

    // const res: any = await createUser(values);
    // if (res.data) {
    // //   refetch();
    //   toast.success(res.data.msg);
    //   form.reset();
    // }
  };

  //   if (error) {
  //     if ("status" in error) {
  //       const errMsg = "error" in error ? error.error : JSON.stringify(error.data);
  //       const errorMsg = JSON.parse(errMsg).msg;
  //       toast.error(errorMsg);
  //     } else {
  //       const errorMsg = error.message;
  //       toast.error(errorMsg);
  //     }
  //   }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>register</CardTitle>
            <CardDescription>Change your register here. After saving, youll be logged out.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full Name"
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
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Phone Number "
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
            <Button>

              {isregistering ? <LoaderSpin/> :  "Register"}
                
                
                </Button>
            
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
