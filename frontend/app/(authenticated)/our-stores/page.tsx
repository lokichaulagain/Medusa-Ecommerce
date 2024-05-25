"use client";
import Image from "next/image";
import { Contact } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AxiosInstance } from "@/app/(repositories)/config";
import Link from "next/link";
import { InstagramLogoIcon } from "@radix-ui/react-icons";

export default function Page() {
  const [branches, setbranches] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const res = await AxiosInstance.get("/branches");
        setbranches(res?.data?.data?.results);
        if (res?.data) {
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  // give me a branch whose type is headquarter
  const headquarter = branches?.filter((branch: any) => branch.type === "headquarter")[0];

  // give me a branch whose type is headquarter
  const branchesOnly = branches?.filter((branch: any) => branch.type === "branch");

  return (
    <div>
      {headquarter && (
        <div className="bg-primary text-primary-50 grid grid-cols-1  lg:grid-cols-2 gap-4 p-4 ">
          <Image
            className="w-full h-full object-cover"
            src={headquarter.image}
            height={200}
            width={200}
            alt=""
          />

          <div className="">
            <h1 className="text-4xl font-semibold mb-2 ">Head Office</h1>
            <p className="text-lg ">{headquarter.address}</p>
            <div className="text-lg mb-4">
              <span className="mr-2 ">{headquarter.phone}</span>,<span className="">{headquarter.phone2}</span>
            </div>

            <p className=" text-lg">{headquarter.description}</p>

            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <span className="flex">
                <Contact />
                <span className="ml-2 ">{headquarter.displayEmail}</span>
              </span>

              <Link
                target="_blank"
                href={headquarter.facebookLink || "/"}
                className="flex items-center">
                <IconFacebook
                  fontSize={24}
                  className=" text-primary-50"
                />
                <span className="ml-2 ">Jacket House</span>
              </Link>

              <Link
                target="_blank"
                href={headquarter.instagramLink || "/"}
                className="flex">
                <IconInstagram
                  fontSize={24}
                  className=" text-primary-50"
                />
                <span className="ml-2 ">jackets_house</span>
              </Link>

              <Link
                target="_blank"
                href={headquarter.facebookLink || "/"}
                className="flex items-center">
                <IconTiktok />
                <span className="ml-2 ">Jacket House</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className=" mt-8">
        <div className="text-3xl lg:text-4xl text-primary-800/90 font-semibold  mb-4">Our Stores across Nepal</div>
        <div className=" flex flex-col gap-12">
          {branchesOnly?.map((branch: any, index: any) => (
            <>
              <div
                key={index}
                className=" text-primary-800/90 grid grid-cols-1  lg:grid-cols-2 gap-4  lg:p-4  bg-gray-50 pb-4 px-2">
                <div>
                  <Image
                    className="object-cover h-96"
                    src={branch.image}
                    height={600}
                    width={600}
                    alt=""
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-semibold ">{branch.name}</h1>
                  <p className="text-lg opacity-95">{branch.address}</p>
                  <span className="mr-2 opacity-95 ">
                    {branch.phone},{branch.phone2}
                  </span>
                  <p className=" text-lg opacity-90 mt-4">{branch.description}</p>
                  <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <span className="flex text-primary-800/90">
                      <Contact />
                      <span className="ml-2 ">{branch.displayEmail}</span>
                    </span>

                    <Link
                      target="_blank"
                      href={branch.facebookLink || "/"}
                      className="flex items-center">
                      <IconFacebook
                        fontSize={24}
                        className=" text-primary-800/90"
                      />
                      <span className="ml-2 ">Jacket House</span>
                    </Link>

                    <Link
                      target="_blank"
                      href={branch.instagramLink || "/"}
                      className="flex">
                      <IconInstagram
                        fontSize={24}
                        className=" text-primary-800/90"
                      />
                      <span className="ml-2 ">jackets_house</span>
                    </Link>

                    <Link
                      target="_blank"
                      href={branch.facebookLink || "/"}
                      className="flex items-center text-primary-800/90">
                      <IconTiktok />
                      <span className="ml-2 ">Jacket House</span>
                    </Link>
                  </div>
                </div>
              </div>
              <hr />
            </>
          ))}
        </div>
        <LocationItem />
        <LocationItem />
      </div>
    </div>
  );
}

function LocationItem({ branch }: any) {
  return (
    <>
      {branch && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
          <Image
            className=" "
            height={300}
            width={300}
            src={branch.image}
            alt="img"
          />

          <div className=" flex flex-col">
            <h3 className="font-semibold text-lg lg:text-2xl">{branch.name}</h3>
            <h5 className="text-sm lg:text-lg">{branch.address}</h5>
            <span className="mr-2">{branch.phone},</span>
            <span className="flex">
              <Contact />
              <span className="ml-2">{branch.email}</span>
            </span>

            <span className="flex items-center">
              <IconFacebook />
              <span className="ml-2">Jacket House</span>
            </span>

            <span className="flex">
              <InstagramLogoIcon />
              <span className="ml-2 ">1_jacket_house</span>
            </span>

            <span className="flex">
              <IconTiktok />
              <span className="ml-2">Jacket House</span>
            </span>
          </div>
        </div>
      )}
    </>
  );
}

function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}>
      <path
        fill="currentColor"
        d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 011-1h3v-4h-3a5 5 0 00-5 5v2.01h-2l-.396 3.98h2.396v8.01z"
      />
    </svg>
  );
}

function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}>
      <path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 01-47.9 47.9z" />
    </svg>
  );
}

function IconTiktok(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      {...props}>
      <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 11-5-5v2a3 3 0 103 3V0z" />
    </svg>
  );
}
