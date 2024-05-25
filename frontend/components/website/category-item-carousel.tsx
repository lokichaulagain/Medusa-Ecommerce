"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { AxiosInstance } from "@/app/(repositories)/config";

export default function CarouselItemCarousel({ title1, title2 }: any) {
  const [categories, setCategories] = useState<any>();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await AxiosInstance.get("/categories");
        setCategories(res?.data?.data?.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <>
      {categories && (
        <div>
          <p className=" text-xl font-semibold  tracking-wider uppercase  text-teal-500">
            {" "}
            {title1} {""}
            <span className=" text-neutral-700">{title2}</span>{" "}
          </p>
          <div className=" flex mb-4 mt-1">
            <Separator />
          </div>
          <Carousel
            opts={{ align: "start", loop: false }}
            className="w-full">
            <CarouselContent className="">
              {categories?.map((category: any, index: any) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/4 hover:-translate-y-1 duration-300">
                  <SingleCategoryCard category={category} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className=" ms-20 bg-primary-300 text-white hover:bg-primary-350 hover:text-white" />
            <CarouselNext className=" me-20 bg-primary-300 text-white hover:bg-primary-350 hover:text-white" />
          </Carousel>
        </div>
      )}
    </>
  );
}

function SingleCategoryCard({ category }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {category && (
        <div className="border   border-primary-50 rounded-xl p-2 text-primary-50 space-y-1 cursor-pointer  ">
          <Link href={`/shop?category=${category._id}`}>
            <Image
              src={isHovered ? category.image : category.image}
              alt="img"
              width={400}
              height={400}
              className="productImage object-cover rounded-t-xl h-72 "
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
            <p className=" bg-primary-500 p-1 text-primary-50 rounded-b-sm text-center  tracking-wider  text-lg">{category.name}</p>
          </Link>
        </div>
      )}
    </>
  );
}
