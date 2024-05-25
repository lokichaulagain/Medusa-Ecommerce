"use client";
import Image from "next/image";
import React, { useState } from "react";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

export default function SingleProductCard({ product }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {product && (
        <div className="border border-primary-100 rounded-xl p-2 text-neutral-700 space-y-1 cursor-pointer   ">
          <Link
            className=""
            href={`/product/${product.productId}`}>
            <div className=" ">
              <Image
                src={isHovered ? product.thumbnail : product.thumbnail}
                alt="img"
                className={`productImage rounded-xl object-cover `}
                layout="responsive"
                width={200}
                height={300}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            </div>
          </Link>

          {/* <p className="text-neutral-500 text-sm tracking-wide">Clothing</p> */}

          <div className="flex space-x-2">
            {product?.colors?.map((color: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2 border p-1 rounded-md">
                <div className=" flex items-center gap-4">
                  <div
                    className="w-4 h-4 rounded-full "
                    style={{ backgroundColor: color.hex }}></div>
                </div>
              </div>
            ))}
          </div>

          <p>{product.name}</p>
          <div className="flex items-center justify-between">
            <p>
              <span className="font-medium text-lg text-primary-500">Rs.{product.sp}</span> <span className="line-through text-sm  bg-opacity-90">Rs.{product.sp + 0.2 * product.sp}</span>
            </p>

            <div className="flex space-x-2">
              <Link
                href={`/product/${product.id}`}
                className="rounded-full border border-neutral-300 bg-primary-50 p-2 text-primary-500 cursor-pointer hover:bg-primary-500 hover:text-neutral-50 hover:-translate-y-1 duration-300">
                <EyeIcon size={18} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


