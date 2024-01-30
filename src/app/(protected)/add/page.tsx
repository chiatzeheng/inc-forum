import AddPost from "@/app/components/AddPost";
import { api } from "@/trpc/server";

const Home = async () => {
  const data = await api.post.getTopic.query();

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="mb-4 text-2xl font-bold">
        Ask any question to the discussion forum!
      </h1>
      <div className="border-gray w-1/2 rounded-md border-2 ">
        <div className="flex flex-col items-center p-4">
          <div className="w-full">
            <AddPost data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
