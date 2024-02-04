import { FC } from "react";
import Login from "@/app/_components/Login";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Sign in</h1>
      <Login />
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default page;
