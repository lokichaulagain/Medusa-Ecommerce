"use client";
import { useContext, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Separator } from "@/components/ui/separator";
import { Banknote, Minus, Plus, RefreshCcwDot, ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AxiosInstance } from "@/app/(repositories)/config";
import { toast } from "sonner";
import { GlobalContext } from "@/app/context/GLobalContext";
import LoginCard from "./login-card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterCard from "./regsiter-card";
import Link from "next/link";
import { useAdminCreateUser } from "medusa-react";
import { useCreateCustomer } from "medusa-react";

export default function SingleProductRightSection({ product }: any) {
  const createCustomer = useCreateCustomer();

  const { currentUser } = useContext(GlobalContext);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setselectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const [adding, setAdding] = useState(false);
  const addToCart = async () => {
    if (quantity < 1) {
      toast.error("Quantity must be greater than 0");
      return;
    }

    const data = {
      product: product._id,
      qty: quantity,
      color: selectedColor,
      size: selectedSize,
      user: currentUser?.user._id,
    };

    // Validation check
    if (!data.color) {
      toast.error("Pleasse select a color");
      return;
    }

    if (!data.size) {
      toast.error("Pleasse select a size");
      return;
    }

    try {
      setAdding(true);
      const res = currentUser && (await AxiosInstance.post("/carts", data));
      setAdding(true);
      toast.success(res.data.msg);
      setSelectedSize("");
      setselectedColor("");
    } catch (error: any) {
      toast.error(error.response.data.msg);
      setAdding(true);
    }
  };

  const customerData = {
    first_name: "Sandip2",
    last_name: "Chaulagain2",
    email: "sandip2@gmail.com",
    password: "password",
  };

  // const handleCreate = (customerData: CustomerData) => {
  //   createCustomer.mutate(customerData, {
  //     onSuccess: ({ customer }) => {
  //       console.log(customer.id);
  //     },
  //   });
  // };

  const handleCreate = () => {
    createCustomer.mutate(customerData, {
      onSuccess: ({ customer }) => {
        console.log(customer.id);
      },
    });
  };

  return (
    <>
      {product && (
        <div className=" text-neutral-700 space-y-3">
          <p className=" text-lg lg:text-3xl font-medium tracking-wide">{product.title}</p>
          <p className=" text-lg ">{product.subtitle}</p>
          <div className=" flex items-center justify-between">
            <p className=" text-sm tracking-wide">
              Category: <span className=" text-primary-500"> {product.collection.title}</span>
            </p>
            <Rating
              style={{ maxWidth: 100 }}
              readOnly
              value={4.7}
            />
          </div>
          <Separator />
          <div className=" flex items-end gap-4">{/* <p className="text-lg lg:text-2xl text-primary-700/80 font-medium">Rs.{product.sp}</p> <span className="line-through font-medium">Rs.{product.sp + 0.2 * product.sp}</span> */}</div>
          <Separator />

          <p className=" tracking-wider  leading-relaxed text-neutral-700/80"> {product.description}</p>

          <div className=" text-sm tracking-wider  text-neutral-700 space-y-4 ">
            <p className=" flex gap-1">
              <ShieldCheck size={18} />
              <span>High quality material </span>
            </p>

            <p className=" flex gap-1">
              <RefreshCcwDot size={18} />
              <span>30 Day Return Ploicy </span>
            </p>

            <p className=" flex gap-1">
              <Banknote size={18} />
              <span>Membership offer</span>
            </p>
          </div>

          {/* <div className="flex flex-wrap  pt-3 gap-4">
            {product?.colors?.map((color: any, index: number) => (
              <div
                key={index}
                onClick={() => setselectedColor(color.name)}
                className={`${color.name === selectedColor ? "border bg-primary-350 rounded-sm border-primary-800" : "border rounded-sm"} p-1  cursor-pointer flex items-center justify-center`}>
                <div
                  className={`${color.name === selectedColor ? "text-zinc-800 " : "text-neutral-700"}  uppercase font-medium w-4 h-4 rounded-full`}
                  style={{ backgroundColor: color.hex }}></div>
              </div>
            ))}
          </div> */}

          {/* <div className="flex flex-wrap  pt-3 gap-4">
            {product.sizes.split(",").map((size: any, index: number) => (
              <div
                key={index}
                onClick={() => setSelectedSize(size.trim())}
                className={`${size.trim() === selectedSize ? "border bg-primary-350 rounded-sm border-primary-800" : "border rounded-sm"} p-1 min-w-8  cursor-pointer flex items-center justify-center`}>
                <p className={`${size.trim() === selectedSize ? "text-zinc-800 " : "text-neutral-700"} rounded-sm uppercase font-medium text-xs`}>{size.trim()}</p>
              </div>
            ))}
          </div> */}

          {/* <div className=" flex items-center pt-3 gap-8">
            <div className=" flex items-center text-neutral-700 gap-2 border rounded-sm p-1">
              <Minus
                onClick={() => setQuantity(quantity - 1)}
                size={20}
                className=" cursor-pointer"
              />
              <Input
                type="number"
                defaultValue={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className=" w-12 px-2 h-7   rounded-sm border-0 shadow-none"
              />
              <Plus
                onClick={() => setQuantity(quantity + 1)}
                size={18}
                className=" cursor-pointer"
              />
            </div>

            {currentUser ? (
              <Button
                onClick={addToCart}
                className="">
                Add to cart
              </Button>
            ) : (
              // <LoginDialog />
              <Link href="/login">
                <Button className="">Add to cart</Button>
              </Link>
            )}
          </div> */}
        </div>
      )}
      <Button onClick={handleCreate}>Order</Button>
    </>
  );
}

function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="">Add to cart</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when youre done.</DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="login"
          className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginCard />
          </TabsContent>

          <TabsContent value="register">
            <RegisterCard />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
