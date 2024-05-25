"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import logo from "../../public/Logo.webp";
import Image from "next/image";
import { LogOut, ShoppingCart, User } from "lucide-react";
import { usePathname } from "next/navigation";
import "react-modern-drawer/dist/index.css";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { MenuIcon } from "lucide-react";
import { GlobalContext } from "@/app/context/GLobalContext";
import { Button } from "../ui/button";

export default function Navbar() {
  const pathname = usePathname();
  // console.log(pathname);

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const { currentUser } = React.useContext(GlobalContext);
  console.log(currentUser);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.replace("/");
  };
  return (
    <div className="">
      <div className=" flex items-center justify-between py-2 ">
        <Link href={"/"}>
          <Image
            src={logo}
            alt="img"
            height={150}
            width={150}
            className=" object-cover py-2 "
          />
        </Link>

        <div className=" hidden md:block">
          <div className=" flex  items-center gap-8 font-medium">
            {navlinks.map((item, index: number) => (
              <Link
                key={index}
                href={item.href}
                className={`${pathname === item.href ? " font-semibold  text-lg " : ""} `}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className=" hidden md:block">
          <div className=" flex items-center gap-4">
            {currentUser && (
              <Link
                href={"/cart"}
                className="rounded-full border border-neutral-300 bg-primary-50 p-2 text-primary-500 cursor-pointer hover:bg-primary-500 hover:text-neutral-50 hover:-translate-y-1 duration-300">
                <ShoppingCart size={18} />
              </Link>
            )}

            {/* {currentUser && <Link
              href={"/cart"}
              className="rounded-full border border-neutral-300 bg-primary-50 p-2 text-primary-500 cursor-pointer hover:bg-primary-500 hover:text-neutral-50 hover:-translate-y-1 duration-300">
              <LogOut size={18} />
            </Link>} */}
            {currentUser && (
              <Link
                href={"/profile"}
                className="rounded-full border border-neutral-300 bg-primary-50 p-2 text-primary-500 cursor-pointer hover:bg-primary-500 hover:text-neutral-50 hover:-translate-y-1 duration-300">
                <User size={18} />
              </Link>
            )}

            {!currentUser && (
              <Link href={"/login"}>
                <Button>Login</Button>
              </Link>
            )}

            {!currentUser && (
              <Link href={"/register"}>
                <Button>Register</Button>
              </Link>
            )}

            {/* <Link href="tel:970-3976578">
            <Button className=" bg-green-500 text-white hover:bg-green-600">Whatsapp Now</Button>
          </Link> */}
          </div>
        </div>

        <div className=" block md:hidden">
          <div className=" flex items-center gap-2 ">
            <MenuIcon
              onClick={toggleDrawer}
              size={26}
              className=" cursor-pointer block md:hidden "
            />

            <Drawer
              open={isOpen}
              onClose={toggleDrawer}
              direction="right"
              className="  bg-secondary-500 z-30 ">
              <div className=" bg-secondary-500 space-y-4 p-4 border-none flex flex-col h-screen">
                {navlinks.map((item: any, idx) => {
                  return (
                    <Link
                      href={item.href}
                      key={idx}
                      className={`${pathname === item.href ? "text-primary-500 underline_hover_effect" : ""} text-accent-400 cursor-pointer hover:text-primary-500 transition-all ease-in-out  underline_hover_effect`}>
                      {item.name}
                    </Link>
                  );
                })}

                <div className="flex items-center gap-2">
                  {!currentUser && (
                    <Link href={"/login"}>
                      <Button>Login</Button>
                    </Link>
                  )}

                  {!currentUser && (
                    <Link href={"/register"}>
                      <Button>Register</Button>
                    </Link>
                  )}

                  {currentUser && (
                    <Button
                      type="button"
                      onClick={handleLogout}>
                      Logout
                    </Button>
                  )}
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
}

const navlinks = [
  {
    name: "Home",
    href: "/",
  },

  {
    name: "Shop",
    href: "/shop",
  },

  {
    name: "Our Stores",
    href: "/our-stores",
  },

  {
    name: "About",
    href: "/about",
  },

  {
    name: "Cart",
    href: "/cart",
  },

  {
    name: "My Profile",
    href: "/profile",
  },
];

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className)}
          {...props}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
