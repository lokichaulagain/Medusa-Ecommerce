"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";
import defaultBanner from "../../public/default-banner.png";

export default function HeroCarousel({ banners }: any) {
  const OPTIONS: EmblaOptionsType = { loop: true };
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="  ">
      <CarouselContent>
        {banners?.map((item: any, index: any) => (
          <CarouselItem
            key={index}
            className=" ">
            <Image
              height={1000}
              width={2000}
              priority
              src={item.image}
              className=" "
              alt="img"
            />
          </CarouselItem>
        ))}

        {!banners && (
          <CarouselItem className=" ">
            <Image
              height={1000}
              width={2000}
              priority
              src={defaultBanner}
              className=" opacity-0"
              alt="img"
            />
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious className=" ms-14" />
      <CarouselNext className=" me-14" />
    </Carousel>
  );
}
