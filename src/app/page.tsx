import AddPoll from "./components/addPollForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="shadow bg-gray-600 p-8 rounded">
        <h1 className="text-4xl font-bold text-center text-gray-100 mb-4">
          Create a new Poll
        </h1>

        <AddPoll />

        <div className="history absolute top-0 -left-[100%] transition-all delay-75 w-[300px] h-screen bg-red-500"></div>
      </div>
    </div>
  );
}
