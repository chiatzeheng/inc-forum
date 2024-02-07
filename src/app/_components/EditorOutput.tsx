"use client";

import dynamic from "next/dynamic";

// Fallback loading component with Tailwind CSS
const LoadingSkeleton = () => (
  <div className="space-y-2">
    <div className="h-4 w-full animate-pulse rounded bg-gray-300"></div>
    <div className="h-4 w-5/6 animate-pulse rounded bg-gray-300"></div>
    <div className="h-4 w-4/6 animate-pulse rounded bg-gray-300"></div>
  </div>
);

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  {
    ssr: false,
    loading: () => <LoadingSkeleton />,
  },
);

interface EditorOutputProps {
  content: any;
}

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

const EditorOutput = ({ content }: EditorOutputProps) => {
  return <Output style={style} className="text-sm" data={content} />;
};

export default EditorOutput;
