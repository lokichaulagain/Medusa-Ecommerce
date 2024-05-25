"use client";
import React, { useState } from "react";

export default function SingleProductInfoTabs() {
  const [currentTab, setCurrentTab] = useState(headers[0]);

  return (
    <div className="text-neutral-700 ">
      <div className=" flex justify-between md:justify-start md:space-x-20  mb-4">
        {headers.map((item: string, index: any) => (
          <p
            onClick={() => setCurrentTab(item)}
            className={`${item === currentTab ? "text-primary-50  rounded-sm bg-primary-350 underline" : ""} py-2 flex items-center justify-center px-3  duration-200  cursor-pointer uppercase tracking-wider font-medium text-sm md:text-lg rounded-sm border`}
            key={index}>
            {item}
          </p>
        ))}
      </div>
      {currentTab === "description" && <Description />}
      {currentTab === "information" && <Information />}
      {currentTab === "review" && <Review />}
    </div>
  );
}

const headers = ["description", "information", "review"];

function Description() {
  return <div className=" border rounded-sm p-2 md:p-8">Description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo expedita vel sed inventore dicta rem quasi modi suscipit iste, quisquam architecto aperiam asperiores possimus sit dolorem quaerat, atque unde eius.</div>;
}

function Information() {
  return <div className=" border rounded-sm p-2 md:p-8">Information Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur maxime illum in molestiae inventore aspernatur animi debitis odit, blanditiis aut molestias voluptatem illo similique voluptas non. Obcaecati tempore eaque itaque?</div>;
}

function Review() {
  return <div className=" border rounded-sm p-2 md:p-8">Review Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint voluptates odio qui veniam. Soluta corrupti obcaecati, debitis temporibus libero alias illo corporis beatae optio reprehenderit ipsa, officia nihil quibusdam nemo.</div>;
}
