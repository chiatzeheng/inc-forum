import AddPost from "@/app/components/AddPost";
import { api } from "@/trpc/server";

const Home = async () => {
  const data = await api.post.getTopic.query();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-8 mb-4">
        Welcome to the Discussion Forum!
      </h1>
      <div className="w-full bg-white rounded-lg shadow-md">
        <div className="p-4 sm:p-6">
            <AddPost data={data} />
          </div>
        </div>
    </div>
  );
};

export default Home;
