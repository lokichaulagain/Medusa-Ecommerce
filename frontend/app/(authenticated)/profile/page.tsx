"use client";
import { AxiosInstance } from "@/app/(repositories)/config";
import { GlobalContext } from "@/app/context/GLobalContext";
import { LogOut } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import noOrder from "../../../public/no-order.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMeCustomer } from "medusa-react";
import Medusa from "@medusajs/medusa-js";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const medusa = new Medusa({ baseUrl: `${process.env.NEXT_PUBLIC_MEDUSA_API}`, maxRetries: 3 });

export default function Page() {
  const { customer, isLoading } = useMeCustomer();
  console.log(customer);
  

  const { currentUser } = useContext(GlobalContext);
  const id = currentUser?.user?._id;
  const [currentState, setCurrentState] = useState("my-profile");
  const [orders, setOrders] = useState<any>();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await AxiosInstance.get(`/orders?user=${id}`);
        setOrders(res?.data.data.results);
      } catch (error: any) {
        console.log(error);
      }
    };
    id && fetchOrders();
  }, [id]);

  const router = useRouter();

  const handleLogout = () => {
    medusa.auth.deleteSession().then(() => {
      toast.success("You have been logged out successfully.");
      router.push("/login");
    });
  };

  if (!customer) {
    return (
      <div className="text-center flex items-center justify-center min-h-[50vh] ">
        <div className=" space-y-2 ">
          <Link href={"/login"}>
            <Button>Login</Button>
          </Link>
          <p className=" text-xs md:text-base"> Please,register befor making order. </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 mt-12 ">
      <div className=" border w-full lg:w-3/12 ">
        {lists.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => setCurrentState(item.value)}
            className={`${currentState === item.value ? " bg-primary-700  text-primary-50" : ""} cursor-pointer`}>
            <p className=" p-3">{item.name}</p>
            <hr />
          </div>
        ))}

        <div
          onClick={handleLogout}
          className=" hover:bg-primary-700 hover:text-primary-50  ">
          <p className=" p-3 flex items-center gap-2 cursor-pointer ">
            {" "}
            <LogOut size={18} /> Logout{" "}
          </p>
        </div>
      </div>

      <div className="w-full lg:w-9/12">
        {currentState === "my-profile" && <Dashboard customer={customer} />}

        {currentState === "orders" && (
          <Orders
            currentUser={currentUser}
            orders={orders}
          />
        )}
        {/* {currentState === "track-you-order" && <Track />} */}
      </div>
    </div>
  );
}

const lists = [
  {
    name: "My Profile",
    value: "my-profile",
  },

  {
    name: "Orders",
    value: "orders",
  },

  // {
  //   name: "Track Your Order",
  //   value: "track-you-order",
  // },

  // {
  //   name: "My Address",
  //   value: "my-address",
  // },

  // {
  //   name: "Account Detail",
  //   value: "account-detail",
  // },
];

const Dashboard = ({ customer }: any) => {
  return (
    <div className=" border rounded-md">
      {customer && (
        <div className="bg-white  shadow overflow-hidden sm:rounded-lg w-full">
          <div className="px-4 py-5 sm:px-6 bg-gray-100 border-b ">
            <h3 className="text-lg leading-6 font-medium text-gray-600 ">Hello {customer.first_name} ! </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about about user.</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {customer.first_name} {customer.last_name}
                </dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{customer.email}</dd>
              </div>

              <div
                className="
              
              bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{customer.phone} </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

const Orders = ({ currentUser, orders }: any) => {
  return (
    <>
      {orders?.length === 0 && (
        <Image
          src={noOrder}
          alt="no order"
          className=" h-52 w-52 mx-auto"
        />
      )}

      {currentUser &&
        orders &&
        orders.map((order: any, index: number) => (
          <div
            key={index}
            className="bg-white  shadow overflow-hidden sm:rounded-lg mb-4">
            <div className="px-4 py-5 sm:px-6">
              <div className=" flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">My Orders</h3>

                {order.status === "pending" && (
                  <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    <span className="w-2 h-2 me-1 bg-blue-500 rounded-full"></span>
                    Pending
                  </span>
                )}

                {order.status === "dispatched" && (
                  <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                    <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                    Dispatched
                  </span>
                )}

                {order.status === "delivered" && (
                  <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                    Delivered
                  </span>
                )}

                {order.status === "cancelled" && (
                  <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                    <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                    Cancelled
                  </span>
                )}
              </div>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about the orders.</p>
            </div>

            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 grid grid-cols-3 sm:gap-4 sm:px-6 text-primary-700/75  text-sm font-medium">
                  <dt>Product Name</dt>
                  <dd>Qty</dd>
                  <dd>Amount (Rs)</dd>
                </div>

                {order?.items.map((item: any, index: any) => (
                  <div
                    key={index}
                    className="  bg-white  border border-gray-50 px-4 py-5 grid grid-cols-3 sm:gap-4 sm:px-6 text-sm text-primary-700/85">
                    <dd>{item.product.name}</dd>
                    <dd>{item.qty}</dd>
                    <dd>Rs. {item.rate}</dd>
                  </div>
                ))}

                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                  <dt className="text-sm font-medium text-gray-500"></dt>
                  {/* <dd className="mt-1 text-sm  sm:mt-0 ">Rs. {totalAmount}</dd> */}
                </div>
              </dl>
            </div>
          </div>
        ))}
    </>
  );
};

const Track = () => {
  return (
    <div className=" w-full border rounded-md py-14 ">
      <div className=" p-4">
        <div className=" mx-auto gap-12 justify-between flex flex-col ">
          <div className=" space-y-3">
            <h3 className=" text-2xl  text-black font-semibold ">Orders tracking</h3>
            <p className="text-gray-700 text-sm ">To track your order please enter your OrderID in the box below and press Track button. This was given to you on your receipt and in the confirmation email you should have received.</p>
          </div>
          <div className="flex-1   ">
            <form
              onSubmit={(e) => e.preventDefault()}
              className=" gap-5 grid md:grid-cols-1">
              <div>
                <label className="font-medium">Order ID</label>
                <input
                  type="text"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-300 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Billing email</label>
                <input
                  type="email"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary-300 shadow-sm rounded-lg"
                />
              </div>

              <button className=" bg-primary-300 text-white px-10 py-2 rounded-md hover:bg-primary-300">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
