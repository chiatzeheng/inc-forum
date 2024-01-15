import UserAuthForm from "@/app/components/UserAuthForm";
import { FC } from "react";

const page: FC = () => {
  return (
    <div className="absolute inset-0">
      <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-20">
        <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="mx-auto max-w-xs text-sm">
              Welcome to the discussion forum. Please login to continue.
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
};

export default page;
