"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AxiosInstance } from "@/app/(repositories)/config";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useEffect } from "react";
import LoaderSpin from "@/components/website/LoaderSpin";
import { Textarea } from "@/components/ui/textarea";
import useCloudinaryFileUpload from "@/app/hooks/useCloudinaryFileUpload";
import { GlobalContext } from "@/app/context/GLobalContext";
const formSchema = z.object({
  fullAddress: z.string().min(5, {
    message: "Full Address must be at least 5 characters.",
  }),

  paymentScreenshot: z.string().min(5, {
    message: "Payment screenshot is required",
  }),

  note: z.string().optional(),
});

export default function CheckoutCart({ items, setrefetch }: any) {
  const { currentUser } = useContext(GlobalContext);

  const { uploading, handleFileUpload } = useCloudinaryFileUpload();
  const [imageUrl, setImageUrl] = useState<string>("");

  const transformedCartItems = items?.map((item: any) => ({
    product: item.product._id,
    color: item.color,
    size: item.size,
    qty: item.qty,
    rate: item.product.sp,
    discount: 0,
  }));

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullAddress: "",
      paymentScreenshot: "",
      note: "",
    },
  });

  useEffect(() => {
    form.setValue("paymentScreenshot", imageUrl);
  }, [form, imageUrl]);

  // Define a submit handler.
  const [isLoging, setIsLoging] = useState(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoging(true);
    try {
      const res = await AxiosInstance.post("/orders", { ...values, items: transformedCartItems, user: currentUser?.user._id });
      if (res.data.status === "success") {
        for (const item of items) {
          console.log(item);
          try {
            await AxiosInstance.delete(`/carts/${item?.cartId}`);
          } catch (error: any) {
            toast.error(`Failed to delete cart item ${item.cartId}: ${error.response?.data?.msg}`);
          }
        }
        toast.success(res?.data.msg);
        form.reset();
        setIsLoging(false);
        setrefetch(true);
      }
    } catch (error: any) {
      toast.error(error?.response.data.msg);
      setIsLoging(false);
    } finally {
      setIsLoging(false);
    }
  };

  return (
    <div>
      <Accordion
        type="single"
        collapsible>
        <AccordionItem value="item-1">
          {items?.length >= 1 && <AccordionTrigger className=" bg-primary-700 p-2 text-primary-50">Proceed to Checkout</AccordionTrigger>}
          <AccordionContent className=" mt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                  <CardHeader>
                    <CardTitle>Shipment Detail</CardTitle>
                    <CardDescription>Please provide the receiver detail so that we can contact you during delivery .</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <FormField
                      control={form.control}
                      name="fullAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Address *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ganesh Mandir ,Santinagar, New Baneshwor, Kathmandu"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="paymentScreenshot"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Screenshot</FormLabel>
                          <div className=" flex  flex-col  gap-2">
                            <Input
                              type="file"
                              onChange={(event) => handleFileUpload(event.target.files?.[0], setImageUrl)}
                            />

                            <>
                              {uploading ? (
                                <div className=" flex flex-col gap-2 rounded-md  justify-center h-52 w-52 border">
                                  <LoaderSpin />
                                </div>
                              ) : (
                                <Image
                                  width={100}
                                  height={100}
                                  src={imageUrl}
                                  alt="img"
                                  className="p-0.5 rounded-md overflow-hidden h-52 w-52 border"
                                />
                              )}
                            </>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Note</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Note for delivery person"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className=" flex justify-end">
                    <Button>{isLoging ? <LoaderSpin /> : "Checkout"}</Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
