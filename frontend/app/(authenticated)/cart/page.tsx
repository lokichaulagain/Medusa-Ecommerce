"use client";
import { X } from "lucide-react";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AxiosInstance } from "@/app/(repositories)/config";
import { useEffect } from "react";
import { GlobalContext } from "@/app/context/GLobalContext";
import CheckoutCart from "@/components/website/checkout-cart";
import noItem from "../../../public/emptry-cart.png";
import Link from "next/link";

export default function Page() {
  const { currentUser } = useContext(GlobalContext);
  const id = currentUser?.user?._id;

  const [items, setItems] = useState<any>();
  const [fetching, setFetching] = useState(false);
  const [refetch, setrefetch] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setFetching(true);
        const res = await AxiosInstance.get(`/carts/?user=${id}`);
        setItems(res?.data.data.results);
        setFetching(false);
      } catch (error: any) {
        setFetching(false);
      } finally {
        setFetching(false);
      }
    };
    fetchItems();
  }, [id, refetch]);

  const total = items?.reduce((sum: any, item: any) => {
    return sum + item.product.sp * item.qty;
  }, 0);

  const deleteCart = async (id: string) => {
    try {
      const res = await AxiosInstance.delete(`/carts/${id}`);
      setrefetch(true);
      console.log(res);
    } catch (error: any) {
      setrefetch(false);
    } finally {
      setrefetch(false);
    }
  };

  const shippingCharge = 300;

  if (!currentUser) {
    return (
      <div className="text-center flex items-center justify-center min-h-[50vh] ">
        <div className=" space-y-2 ">
          <Link href={"/login"}>
            <Button>Login</Button>
            <p className=" text-xs md:text-base mt-2"> Please,login befor adding product into cart. </p>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-[50vh]">
      <div className=" grid grid-cols-1   xl:grid-cols-2 gap-4">
        <div className="w-full table-auto text-sm text-left">
          <div className="flex items-center justify-between font-semibold text-xs md:text-sm text-primary-800/80 bg-gray-100 p-2 rounded-sm">
            <p className="">Item</p>
            <p className="">Rate</p>
            <p className="">Qty</p>
            <p className="">Subtotal</p>
            <p className="">Action</p>
          </div>

          {items?.length === 0 && (
            <Image
              src={noItem}
              alt="img"
              width={200}
              height={200}
              className="mx-auto  my-8 "
            />
          )}

          {items?.map((item: any) => (
            <div
              key={item._id}
              className=" border-b text-gray-600 divide-y mt-2 pb-2">
              <div className="flex items-center justify-between">
                <div className="">
                  <div>
                    <Image
                      src={item?.product.image1}
                      alt=""
                      height={50}
                      width={50}
                    />
                  </div>
                </div>

                <div className=" whitespace-nowrap">Rs. {item.product.sp.toLocaleString("en-IN")}</div>
                <div className=" whitespace-nowrap">
                  <input
                    defaultValue={item.qty}
                    className=" px-4 placeholder:text-black w-16 h-8 border rounded-md outline-none"
                    type="number"
                    placeholder="1"
                  />
                </div>
                <div className=" whitespace-nowrap">
                  Rs.
                  {(item.product.sp * item.qty).toLocaleString("en-IN")}
                </div>
                <div className=" whitespace-nowrap">
                  <Button
                    onClick={() => deleteCart(item.cartId)}
                    variant={"outline"}>
                    <X />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="  border  w-full  rounded-md">
            <div className=" py-10 px-5 flex flex-col gap-5">
              <div className="  text-xl text-black font-semibold">Cart Totals</div>
              <div className="   border w-full ">
                <div className=" grid md:grid-cols-2 px-2">
                  <span className=" md:pr-44 md:border-r py-2">Cart Subtotal</span>
                  <span className=" md:px-2 text-primary-300 font-bold py-2">Rs.{total?.toLocaleString("en-IN")}</span>
                </div>

                <div className=" border-t grid md:grid-cols-2  px-2">
                  <span className=" md:pr-52 md:border-r py-2">Shipping</span>
                  <span className=" md:px-2  py-2">Rs. {shippingCharge}</span>
                </div>
                <div className="grid md:grid-cols-2 border-t px-2">
                  <span className=" md:pr-60 md:border-r py-2">Total</span>
                  <span className=" md:px-2 text-xl text-primary-300 font-bold py-2">
                    Rs.
                    {(total + shippingCharge).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
              <CheckoutCart
                items={items}
                setrefetch={setrefetch}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
