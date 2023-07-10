const pollDetails = async (pollId: string) => {
  const res = await fetch(`http:localhost:3000/api/poll/${pollId}`);
  const data = await res.json();
  return data;
};

export default async function PollDetails({
  params,
}: {
  params: { pollId: string };
}) {
  return <div className="p-8">Poll Details Here</div>;
}
