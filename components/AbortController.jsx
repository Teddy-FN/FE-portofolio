/* eslint-disable react/prop-types */
"use client";

import { Button } from "./ui/button";
import React from "react";

const AbortController = ({ refetch, height = "h-[470px]" }) => {
  return (
    <div className={`flex ${height} flex-col rounded-lg`}>
      <div className="flex flex-col flex-1 items-center justify-center bg-pink-50/20 text-4xl rounded-lg gap-4">
        <p className="text-rose-700 font-bold text-base md:text-lg xl:text-xl">
          Opps, Internal Server Error
        </p>
        <Button
          className="py-2 px-4 w-fit bg-accent rounded-full text-white font-bold text-lg hover:bg-[#1ACB0A] duration-200"
          onClick={refetch}
        >
          <div className="flex items-center gap-4">
            <p>Try Again!</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default AbortController;
