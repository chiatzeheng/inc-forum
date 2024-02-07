"use client";

import { Editor } from "@/app/_components/Editor";
import * as React from "react";
import type { Topic } from "@/types/comment";
import TopicDropDown from "./TopicDropDown";

interface props {
  data: Topic[];
}

const AddPost = ({ data }: props) => {
  const [topic, setTopic] = React.useState<Topic | null>(null);

  return (
    <div className="flex-col space-y-4">
      <TopicDropDown topics={data} selectedTopic={topic} setTopic={setTopic} />
      <Editor topic={topic?.id} />
    </div>
  );
};

export default AddPost;
