import AddPost from "@/app/_components/AddPost";
import { api } from "@/trpc/server";
import type { Topic } from "@/types/comment";

const Home = async () => {
  const data: Topic[] = await api.post.getTopic.query();

  return (
    <div className="space-y-2 py-4">
      <h3 className=" text-2xl font-bold text-gray-800 border-b-2 pb-3">
        Create a Post
      </h3>
      <div className="w-full rounded-lg bg-white shadow-md">
        <div className="p-4 sm:p-6 mt-4">
          <AddPost data={data} />
        </div>
      </div>
    </div>
  );
};

export default Home;
