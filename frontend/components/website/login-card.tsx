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
import LoaderSpin from "./LoaderSpin";

const formSchema = z.object({
  phone: z.coerce.number().min(10, {
    message: "Phone must be at least 10 characters.",
  }),

  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export default function LoginCard() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: 0,
      password: "",
    },
  });

  // Define a submit handler.
  const [isLoging, setIsLoging] = useState(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoging(true);
    try {
      const res = await AxiosInstance.post("/users/login", values);
      if (res.data.status === "success") {
        toast.success(res?.data.msg);
        localStorage.setItem("accessToken", res?.data.accessToken);
        form.reset();
        setIsLoging(false);
      }
    } catch (error: any) {
      toast.error(error?.response.data.msg);
      setIsLoging(false);
    } finally {
      setIsLoging(false);
    }
  };



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
            <Button>{isLoging ? <LoaderSpin /> : "Login"}</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
