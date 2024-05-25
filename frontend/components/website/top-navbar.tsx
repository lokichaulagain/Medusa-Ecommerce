"use client";
import { LocateIcon, Phone, User } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function TopNavbar() {
  return (
    <div className="w-full  flex items-center justify-between bg-green-200 text-sm text-neutral-700 ">
      <div className=" flex items-center gap-1">
        <Phone size={16} />
        <p>9847464545</p>
      </div>

      <Link href={"/contact"} className=" flex items-center gap-1">
        <LocateIcon size={16} />
        <p>Our Location</p>
      </Link>

      <div>
        <p>Super Value Deals upto 50% off</p>
      </div>

      <div className=" flex items-center gap-1">
        <User size={16} />
        <p>Login</p>
        <p>Register</p>
      </div>
    </div>
  );
}
