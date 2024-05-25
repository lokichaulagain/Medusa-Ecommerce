"use client";
import React from "react";
import shipping from "../../public/services/shipping.png";
import happy from "../../public/services/happy.png";
import online from "../../public/services/obline.png";
import promotion from "../../public/services/promotion.png";
import support from "../../public/services/support.png";
import save from "../../public/services/save.png";
import Image from "next/image";

export default function OurServices() {
  return (
    <div className=" grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
      {services.map((item: any, index: any) => (
        <div
          key={index}
          className="border border-neutral-300  rounded-sm p-2 text-neutral-700 space-y-1 cursor-pointer hover:-translate-y-1 duration-300  ">
          <Image
            src={item.image}
            alt="img"
            className="mx-auto mb-2"
          />
          <p className={`text-base tracking-wide  font-semibold text-primary-400/90 text-center rounded-sm  ${item.className}`}>{item.name}</p>
        </div>
      ))}
    </div>
  );
}

const services = [
  {
    image: shipping,
    name: "Fast Delivery ",
    className: "bg-red-100",
  },

  {
    image: online,
    className: "bg-blue-100",
    name: "Reward System",
  },

  {
    image: save,
    className: "bg-green-100",
    name: "Save Money",
  },

  {
    image: promotion,
    className: "bg-red-100",
    name: "Membership Offer",
  },

  {
    image: happy,
    className: "bg-pink-100",
    name: "Happy Sell",
  },

  {
    image: support,
    className: "bg-orange-100",
    name: "Online Support",
  },
];
