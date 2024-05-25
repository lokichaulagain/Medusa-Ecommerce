"use client";
import Image from "next/image";
import logo from "../../public/white-logo.png";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pt-10 bg-primary-500 mt-20">
      <div className=" mx-auto  text-primary-200 px-4 md:px-0">
        <div className="justify-between sm:flex">
          <div className="space-y-6">
            <Image
              src={logo}
              alt="logo"
              height={200}
              width={200}
            />
            <p className="max-w-md">Jacket House, Lalitpur, Satdobato</p>
            <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
              {footerNavs.map((item, idx) => (
                <li
                  key={idx}
                  className="text-gray-200 hover:text-gray-100 duration-150">
                  <a
                    key={idx}
                    href={item.href}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <div className="flex items-center gap-3 mt-3 sm:block">
              <Link href={"/shop"}>
                <Button
                  variant={"outline"}
                  className=" text-primary-500 ">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 py-10 border-t md:text-center">
          <p>Copyright 2024 Jacket House. All rights reserved.</p>{" "}
          <span>
            Designed by{" "}
            <Link
              className=" underline"
              target="_blank"
              href={"https://www.webxnep.com"}>
              WebX
            </Link>{" "}
          </span>
        </div>
      </div>
    </footer>
  );
}

const footerNavs = [
  {
    href: "/",
    name: "Home",
  },
  {
    href: "/shop",
    name: "Shop",
  },
  {
    href: "/our-stores",
    name: "Our-Stores",
  },

  {
    href: "/about",
    name: "About Us",
  },
];
