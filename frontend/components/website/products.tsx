"use client";
import React from "react";
import { Product } from "@medusajs/medusa";
import { useProducts } from "medusa-react";

export default function Products() {
  const { products, isLoading } = useProducts();

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <ul>
      {products?.map((product: any) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}
