"use client";
import "@smastrom/react-rating/style.css";
import shirt from "../../../../public/products/shirt2.jpg";
import Image from "next/image";
import SingleProductRightSection from "@/components/website/single-product-right-section";
import SingleProductInfoTabs from "@/components/website/single-product-info-tabs";
import MultipleItemCarousel from "@/components/website/multiple-item-carousel";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { AxiosInstance } from "@/app/(repositories)/config";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useProduct } from "medusa-react";

export default function Page() {
  const params = useParams() as { id: string };
  const { product, isLoading } = useProduct(params?.id);

  // const [product, setProduct] = useState<any>();
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       setIsLoading(true);
  //       const res = await AxiosInstance.get(`/products/${params?.id}`);
  //       setProduct(res?.data?.data);

  //       if (res?.data) {
  //         setIsLoading(false);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       setIsLoading(false);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetch();
  // }, [params.id]);

  // const [products, setProducts] = useState<any>();
  // const [isLoading1, setIsLoading1] = useState<boolean>(false);
  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       setIsLoading1(true);
  //       const res = await AxiosInstance.get("/products", {
  //         params: {
  //           category: product?.category,
  //         },
  //       });
  //       setProducts(res?.data?.data?.results);

  //       if (res?.data) {
  //         setIsLoading1(false);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       setIsLoading(false);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetch();
  // }, [product]);

  return (
    <>
      {product && (
        <div className="">
          <div className=" grid grid-cols-1  lg:grid-cols-2 gap-8">
            {/* <div className="">
              <Image
                height={1000}
                width={1000}
                src={product.image1}
                alt="img"
              />
            </div> */}

            <div className=" flex">
              <Swiper
                pagination={true}
                modules={[Pagination]}
                className="mySwiper">
                {product.images &&
                  product.images.map((product: any) => (
                    <SwiperSlide key={product.id}>
                      <Image
                        height={1000}
                        width={1000}
                        src={product.url}
                        alt="img"
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>

            <SingleProductRightSection product={product} />
          </div>
          {/* <div className=" mt-12">
            <SingleProductInfoTabs  />
          </div> */}
        </div>
      )}

      {/* {isLoading && (
        <div className=" grid grid-cols-1  lg:grid-cols-2 gap-8 text-neutral-700 space-y-1 cursor-pointer animate-pulse ">
          <div className=" h-96 bg-gray-300"></div>
          <div className=" h-96 bg-gray-300"></div>
        </div>
      )} */}

      {/* <div className=" mt-12">
        <MultipleItemCarousel
          title1={"Similar"}
          title2={"Products"}
          products={products}
        /> */}

      {/* {isLoading1 && (
          <div className=" grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 ">
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
          </div>
        )} */}
    </>
  );
}
