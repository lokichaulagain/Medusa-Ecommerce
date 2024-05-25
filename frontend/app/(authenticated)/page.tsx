"use client";
import HeroCarousel from "@/components/website/hero-carousel";
import MultipleItemCarousel from "@/components/website/multiple-item-carousel";
import OurServices from "@/components/website/our-services";
import { Button } from "@/components/ui/button";
import CarouselItemCarousel from "@/components/website/category-item-carousel";
import SingleProductCard from "@/components/website/single-product-card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AxiosInstance } from "../(repositories)/config";
import { Separator } from "@/components/ui/separator";
import banner1 from "../../public/banners/banner-1.png";
import Products from "@/components/website/products";
import { useProducts } from "medusa-react";

export default function Page() {
  const { products, isLoading } = useProducts();

  const [isLoading2, setisLoading2] = useState<boolean>(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setisLoading2(true);
        const res = await AxiosInstance.get("/hero-banners", {
          params: {
            category: "",
          },
        });
        setBanners(res?.data?.data?.results);
        setisLoading2(false);
      } catch (error) {
        console.log(error);
        setisLoading2(false);
      } finally {
        setisLoading2(false);
      }
    };
    fetch();
  }, []);

  // const [products, setProducts] = useState<any>();

  // const [isLoading, setisLoading] = useState<boolean>(false);
  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       setisLoading(true);
  //       const res = await AxiosInstance.get(`/products?limit=12`);
  //       setProducts(res?.data?.data?.results);
  //       setisLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       setisLoading(false);
  //     } finally {
  //       setisLoading(false);
  //     }
  //   };
  //   fetch();
  // }, []);

  const [banners, setBanners] = useState<any>();

  const banner1 = banners?.filter((banner: any) => banner.section === "section-one")[0];
  console.log(banner1);
  const banner2 = banners?.filter((banner: any) => banner.section === "section-two")[0];
  const herosections = banners?.filter((banner: any) => banner.section === "hero-section");

  const [smallBanners, setsmallBanners] = useState<any>();
  useEffect(() => {
    const fetch = async () => {
      try {
        // setisLoading(true);
        const res = await AxiosInstance.get("/small-banners", {
          params: {
            category: "",
          },
        });
        setsmallBanners(res?.data?.data?.results);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fetch();
  }, []);

  const [specialProducts, setSpecialProducts] = useState<any>();
  useEffect(() => {
    const fetch = async () => {
      try {
        // setisLoading(true);
        const res = await AxiosInstance.get(`/products?limit=10&isFeatured=true`);
        setSpecialProducts(res?.data?.data?.results);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fetch();
  }, []);

  return (
    <main className=" space-y-10">
      <HeroCarousel banners={herosections} />
      <OurServices />

      <MultipleItemCarousel
        title1={"Top Selling"}
        title2={"Products"}
        products={specialProducts}
      />

      {/* <Products/> */}

      <div>
        <CarouselItemCarousel
          title1={"Our"}
          title2={"Categories"}
        />
        {/* <ProductTabs /> */}
        {/* 
        <p className=" text-xl font-semibold  tracking-wider uppercase  text-pink-500 mt-8">
          {" "}
          Explore
          <span className=" text-neutral-700"> </span>{" "}
        </p> */}

        <div
          className=" h-52 md:h-[70vh] mt-8"
          style={{
            backgroundImage: `url(${banner1?.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}></div>

        <div className=" mt-12">
          <p className=" text-xl font-semibold  tracking-wider uppercase  text-pink-500 ">
            Explore
            <span className=" text-neutral-700">Our Products</span>{" "}
          </p>
          <div className=" flex  mt-1 mb-4">
            <Separator />
          </div>
        </div>

        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
          {products?.map((product: any, index: number) => (
            <SingleProductCard
              key={index}
              product={product}
            />
          ))}
        </div>

        {isLoading && (
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
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
        )}
      </div>

      {/* <div
        className=" h-52 md:h-[70vh]"
        style={{
          backgroundImage: `url(${banner2?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}></div> */}

      {/* <CarouselItemCarousel
        title1={"Our"}
        title2={"Categories"}
      /> */}

      {smallBanners && (
        <div className=" flex flex-col md:flex-row gap-4 ">
          <div
            style={{
              backgroundImage: `url(${smallBanners && smallBanners[0]?.image})`,
              backgroundSize: "contain",
              backgroundPosition: "right",
              backgroundRepeat: "no-repeat",
            }}
            className="    w-full p-4 md:p-12  tracking-wider text-primary-700 bg-primary-100 mb-8 md:mb-0">
            <div className=" space-y-3 ">
              <p className=" font-semibold text-primary-300 text-sm"> {smallBanners[0]?.heading} </p>
              <p className=" text-xl   font-medium">{smallBanners[0]?.title}</p>
              <div>
                <Link href={"shop"}>
                  <Button className=" bg-primary-500 hover:bg-primary-600">Shop Now</Button>
                </Link>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundImage: `url(${smallBanners && smallBanners[1]?.image})`,
              backgroundSize: "contain",
              backgroundPosition: "left",
              backgroundRepeat: "no-repeat",
            }}
            className="flex items-center justify-end  w-full p-4 md:p-12 tracking-wider text-primary-100 bg-primary-500">
            <div className="space-y-3  text-right">
              <p className="font-semibold text-sm text-primary-100">{smallBanners[1]?.heading}</p>
              <p className="text-xl font-medium">{smallBanners[1]?.title}</p>
              <div>
                <Link href={"shop"}>
                  <Button
                    className=" text-primary-500 hover:text-primary-500"
                    variant={"outline"}>
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <Newsletter /> */}

      {/* <div className=" flex gap-4">
        <div className="medium-banner-1  w-full p-12  tracking-wider text-primary-700">
          <div className=" space-y-3 hidden md:block">
            <p className=" font-semibold text-primary-300 text-sm">Exchange Services</p>
            <p className=" text-xl   font-medium">
              We are an Apple <br />
              Authorised Service
            </p>
            <div>
              <Link href={"shop"}>
                <Button className=" bg-primary-500 hover:bg-primary-600">Shop Now</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center  medium-banner-2 w-full p-12 tracking-wider text-primary-700">
          <div className="space-y-3 hidden md:block ">
            <p className="font-semibold text-sm text-primary-300">Exchange Services</p>
            <p className="text-xl font-medium">
              We are an Apple <br />
              Authorised Service
            </p>
            <div>
              <Link href={"shop"}>
                <Button className=" bg-primary-500 hover:bg-primary-600">Shop Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </div> */}
    </main>
  );
}
