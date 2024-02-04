"use client";
import { FC } from "react";
import Link from "next/link";
import { buttonVariants } from "@/app/_components/ui/button";
import { Home, PlusCircleIcon } from "lucide-react";
import { usePathname } from "next/navigation";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div
      className="flex flex-row divide-x md:flex-wrap "
      style={{ minHeight: "calc(100vh - 9rem)" }}
    >
      <div className="basis-1/6 overflow-hidden border-t-2">
        <div className="mx-2 space-y-2 py-4">
          <Link
            href="/view"
            className={buttonVariants({
              variant: pathname === "/view" ? "default" : "ghost",
              className: "w-full px-3 py-6",
            })}
          >
            <span className="w-full text-left">
              <Home className="me-3 inline" height={24} width={24} />
              Forum
            </span>
          </Link>
          <Link
            href="/add"
            className={buttonVariants({
              variant: "ghost",
              className: "w-full px-3 py-6",
            })}
          >
            <span className="w-full text-left">
              <PlusCircleIcon className="me-3 inline" height={24} width={24} />
              Create
            </span>
          </Link>
        </div>
      </div>
      <div
        className={`custom-scrollbar basis-2/3 overflow-y-auto border-t-2 px-2`}
        style={{ height: "calc(100vh - 9rem)" }}
      >
        {children}
      </div>
    </div>
  );
};

export default layout;
