"use client";

import { ExtendedPost } from "@/types/db";
import Post from "@/app/_components/Post";
import TopicDropDown from "./TopicDropDown";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { Topic } from "@/types/comment";
import { CheckCircle2, XCircle } from "lucide-react"; // Import XCircle for the clear button icon
import { Separator } from "./ui/separator";

interface PostFeedProps {
  initialPosts: ExtendedPost[];
  topics: Topic[];
}

const PostFeed = ({ initialPosts, topics }: PostFeedProps) => {
  const [posts, setPosts] = useState<ExtendedPost[]>(initialPosts);
  const [topic, setTopic] = useState<Topic | null>(null);

  useEffect(() => {
    if (topic) {
      const filteredPosts = initialPosts.filter(
        (post) => post.topicId === topic.id,
      );
      setPosts(filteredPosts);
    } else {
      setPosts(initialPosts);
    }
  }, [topic, initialPosts]);

  const clearTopic = () => setTopic(null);

  return (
    <div className="col-span-2 flex flex-col space-y-6">
      <div className="space-y-4">
        <div className="rounded-md bg-slate-200 p-4">Search Bar</div>
        <div className="flex flex-wrap flex-col space-x-0 space-y-3 md:flex-row md:space-x-3 md:space-y-0">
          <TopicDropDown
            selectedTopic={topic}
            setTopic={setTopic}
            topics={topics}
          />
          {topic && (
            <button
              onClick={clearTopic}
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <XCircle className="mr-2 h-5 w-5" />
              Clear Topic
            </button>
          )}
        </div>
      </div>
      <Separator />
      {posts.length ? (
        posts.map((post) => (
          <div key={post?.id}>
            <Post
              post={post}
              topicName={post?.topic.name}
              commentAmt={post.comment?.length}
            />
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center p-10">
          <div className="text-center">
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-sm text-gray-600">No posts available</p>
            <p className="mt-2 text-xs text-gray-500">
              Select a different topic or try refreshing the page.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostFeed;
