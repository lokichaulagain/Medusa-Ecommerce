"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import SingleProductCard from "@/components/website/single-product-card";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AxiosInstance } from "@/app/(repositories)/config";
import { Suspense } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import noProductFoundImage from "../../../public/no-product-found.png";

export default function Page() {
  const searchParams = useSearchParams();

  const search = searchParams.get("category");
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

  const [currentCategory, setCurrentCategory] = useState<any>("");
  const [products, setProducts] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const res = await AxiosInstance.get("/products");
        setProducts(res?.data?.data?.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [currentCategory, search]);

  // Filtered products based on selected category
  const filteredProducts = currentCategory ? products?.filter((product: any) => product.category === currentCategory) : products;
  console.log(filteredProducts);

  return (
    <div className="">
      <Suspense>
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5  ">
          <div className=" border border-neutral-300 rounded-lg p-2 hidden md:block ">
            <p className=" text-xl text-primary-500 font-semibold tracking-wider uppercase">Category</p>
            <Separator />

            <ScrollArea className=" h-96  ">
              <p
                onClick={() => setCurrentCategory("")}
                className={`${currentCategory ? " " : "bg-primary-500   cursor-pointer  text-white  "} mt-1 text-sm tracking-wider font-medium py-1.5 px-2`}>
                All
              </p>

              {categories?.map((category: any, index: number) => (
                <p
                  onClick={() => setCurrentCategory(category._id)}
                  className={`${currentCategory === category._id ? "bg-primary-500 text-white " : "  text-neutral-700 cursor-pointer  hover:bg-primary-100 hover:text-primary-500 hover:translate-x-1 duration-300"} mt-1 text-sm tracking-wider font-medium py-1.5 px-2`}
                  key={index}>
                  {category.name}
                </p>
              ))}
            </ScrollArea>
          </div>

          <div className=" block sm:hidden">
            <Carousel>
              {/* <p className=" text-xl font-semibold  tracking-wider uppercase  text-teal-500">
                Our <span className=" text-neutral-700 ">Categories</span>{" "}
              </p> */}

              <CarouselContent>
                {categories && (
                  <CarouselItem
                    onClick={() => setCurrentCategory("")}
                    className="basis-1/6 text-primary-100 mx-2 text-sm flex items-center justify-center flex-col  mb-4 ">
                    <Image
                      src={categories[1]?.image}
                      alt="img"
                      height={100}
                      width={100}
                      className={`${currentCategory ? " " : "border border-teal-500"} rounded-full bg-primary-100  h-10 w-10 object-cover`}
                    />

                    <span className={`${currentCategory ? "   text-primary-500" : "text-teal-500"} text-[10px] font-medium  text-center leading-3 mt-2`}>All Products</span>
                  </CarouselItem>
                )}

                {categories?.map((category: any, index: number) => (
                  <CarouselItem
                    key={index}
                    onClick={() => setCurrentCategory(category._id)}
                    className="basis-1/6 text-primary-100  text-sm flex items-center j flex-col  h-20 ">
                    <Image
                      src={category.image}
                      alt="img"
                      height={100}
                      width={100}
                      className={`${category._id === currentCategory ? " border border-teal-500" : ""} rounded-full bg-primary-100  h-10 w-10 object-cover`}
                    />
                    <span className={`${category._id === currentCategory ? " text-teal-500" : ""} text-primary-500 text-[10px] font-medium  text-center leading-3 mt-2`}>{category.name}</span>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* <CarouselPrevious className=" ms-10 bg-primary-300 text-white hover:bg-primary-350 hover:text-white" />
              <CarouselNext className=" me-10 bg-primary-300 text-white hover:bg-primary-350 hover:text-white" /> */}
            </Carousel>
          </div>

          <div className=" min-h-[65vh]">
            {filteredProducts?.map((product: any, index: number) => (
              <SingleProductCard
                key={index}
                product={product}
              />
            ))}

            {filteredProducts?.length === 0 && !isLoading && (
              <Image
                src={noProductFoundImage}
                alt="no-product-found"
                className="mx-auto"
              />
            )}

            {isLoading && (
              <>
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className="border border-primary-100 rounded-xl p-2 text-neutral-700 space-y-1 cursor-pointer animate-pulse">
                    <div className=" h-72  bg-gray-300 rounded-xl"></div>

                    <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>

                    <div className="h-6 w-40 bg-gray-300 rounded mb-2"></div>

                    <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>

                    <div className=" flex items-center justify-between">
                      <div className="h-4 w-20 bg-gray-300 rounded"></div>

                      <div className="flex space-x-2">
                        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
