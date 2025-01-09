"use client";

import Link from "next/link";

// Components
import { Button } from "./ui/button";

const EmptyDataWithButton = ({ text, textBtn, hrefLink = "" }) => {
  return (
    <div
      className={`h-[400px] flex flex-col justify-center items-center bg-[#232329] w-full rounded-lg gap-6`}
    >
      {text}

      <Link href={hrefLink}>
        <Button>{textBtn}</Button>
      </Link>
    </div>
  );
};

export default EmptyDataWithButton;
