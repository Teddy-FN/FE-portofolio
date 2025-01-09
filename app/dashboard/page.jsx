"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

// Components
import { Button } from "@/components/ui/button";
import EmptyDataWithButton from "@/components/EmptyDataWithButton";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardLayout from "@/components/DashboardTemplate";
import AbortController from "@/components/AbortController";

// Service
import { getDashboard } from "@/service/dashboard";
import { getListAboutMe } from "@/service/about-me";

// Utils
import { generateLinkImageFromGoogleDrive } from "@/utils/generateImageGoogleDrive";

const Dashboard = () => {
  const getAboutMeData = useQuery({
    queryKey: ["getListAboutMe"],
    queryFn: getListAboutMe,
  });

  const geDashboardData = useQuery({
    queryKey: ["getDashboard"],
    queryFn: getDashboard,
  });

  console.log(getAboutMeData);
  console.log(geDashboardData);

  const RENDER_PROFILE_DATA = useMemo(() => {
    if (getAboutMeData.isLoading && getAboutMeData.isFetching) {
      return <Skeleton className="w-full h-96 rounded-md bg-pink-50/20" />;
    }

    if (getAboutMeData.isError) {
      return (
        <div className="h-screen">
          <AbortController refetch={() => getAboutMeData.refetch()} />
        </div>
      );
    }

    if (getAboutMeData.data && getAboutMeData.isSuccess) {
      const data = getAboutMeData.data.data;
      console.log("DATA =>", data);

      const linkImage = generateLinkImageFromGoogleDrive(data?.photo);

      if (data.id) {
        return (
          <div className="p-10 bg-[#272729] rounded-xl flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl text-accent">Profile Data</h1>
              <Button>
                <Link
                  href="/dashboard/about-me"
                  className={`text-xl capitalize flex items-center gap-4`}
                >
                  Edit Profile
                </Link>
              </Button>
            </div>
            <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 gap-x-6 mx-auto xl:mx-0">
              <li className="flex items-center justify-center xl:justify-start gap-4 col-span-1 xl:col-span-2">
                <div className="mt-4 relative flex justify-center items-center w-full lg:w-1/2">
                  <img
                    src={linkImage}
                    alt="Preview"
                    className="max-w-full h-auto border-2 border-gray-300 rounded-md object-contain"
                  />
                </div>
              </li>
              <li className="flex items-center justify-center xl:justify-start gap-4">
                <span className="text-white/60">Name</span>
                <span className="text-xl">{data?.name || "-"}</span>
              </li>
              <li className="flex items-center justify-center xl:justify-start gap-4">
                <span className="text-white/60">Email</span>
                <span className="text-xl">{data?.email || "-"}</span>
              </li>

              <li className="flex items-center justify-center xl:justify-start gap-4">
                <span className="text-white/60">Position</span>
                <span className="text-xl">{data?.position || "-"}</span>
              </li>
              <li className="flex items-center justify-center xl:justify-start gap-4">
                <span className="text-white/60">Phone</span>
                <span className="text-xl">{data?.phoneNumber || "-"}</span>
              </li>
              <li className="flex items-center justify-center xl:justify-start gap-4">
                <span className="text-white/60">Experience</span>
                <span className="text-xl">{data?.experience || "-"}</span>
              </li>
              <li className="flex items-center justify-center xl:justify-start gap-4">
                <span className="text-white/60">Nationality</span>
                <span className="text-xl">{data?.nationality || "-"}</span>
              </li>
              <li className="flex items-center justify-center xl:justify-start gap-4">
                <span className="text-white/60">Email</span>
                <span className="text-xl">{data?.email || "-"}</span>
              </li>
              <li className="flex items-center justify-center xl:justify-start gap-4">
                <span className="text-white/60">Freelance</span>
                <span className="text-xl">
                  {data?.freelance ? "Available" : "Not Available"}
                </span>
              </li>
              <li className="flex items-center justify-center xl:justify-start gap-4">
                <span className="text-white/60">Languages</span>
                <span className="text-xl">
                  {data?.languages.length > 0
                    ? data?.languages.map((items, index) => (
                        <span key={index}>
                          {index !== data?.languages.length - 1
                            ? `${items}, `
                            : items}
                        </span>
                      ))
                    : "-"}
                </span>
              </li>
            </ul>
          </div>
        );
      } else {
        return (
          <EmptyDataWithButton
            text="Profile Still Empty"
            hrefLink="/dashboard/about-me"
            textBtn="Add Profile"
          />
        );
      }
    }
  }, [getAboutMeData]);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to my dashboard!</p>

      {/* Render Profile Data */}
      <div className="my-10">{RENDER_PROFILE_DATA}</div>
    </DashboardLayout>
  );
};

export default Dashboard;
