"use client";
import { FC } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeftSquareIcon } from "lucide-react";

interface GoBackButtonProps {
  postId: string;
}

const GoBackButton: FC<GoBackButtonProps> = ({ postId }) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-fit p-2 mb-3"
      onClick={() => {
        router.push(`/view/${postId}`);
      }}
    >
      <ArrowLeftSquareIcon className="me-1.5 h-5 w-5" />
      Go back to main thread
    </Button>
  );
};

export default GoBackButton;
