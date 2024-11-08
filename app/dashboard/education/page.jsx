"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardTemplate";

const page = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">About Me Page</h1>
        <form className="flex flex-col gap-6 p-10 bg-[#272729] rounded-xl">
          {/* Input */}
          <div className="grid grid-cols-1 gap-6">
            <Input type="text" placeholder="Start - End" />
            <Input type="text" placeholder="Name Education" />
            <Input type="text" placeholder="Deggree" />
          </div>

          <div className="flex items-center justify-between">
            <Button size="sm" className="max-w-full">
              Cancel
            </Button>
            <Button size="sm" className="max-w-full">
              Save
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default page;
