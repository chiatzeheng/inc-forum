import { FC } from "react";
import Image from "next/image";
import imcsPicture from "public/imcs.jpg";
import { Button } from "./ui/button";

const ProfileInfo: FC = () => {
  return (
    <div className="h-fit rounded-xl bg-white pb-10">
      <div>
        <Image
          src={imcsPicture}
          alt="IMCS Picture"
          style={{ height: 250, width: "100%" }}
        />
      </div>
      <div className="flex w-full flex-col items-center px-3">
        <div className="inline-block text-center">
          <h1 className="text-wrap font-bold mb-4">
            Institute of Management Consultants (Singapore)
          </h1>
          <Button variant="outline" size="sm" className="mt-3 w-full p-2">
            View Organisation Dashboard Page
          </Button>
          <Button variant="outline" size="sm" className="mt-3 w-full p-2">
            Go to BE Form
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
