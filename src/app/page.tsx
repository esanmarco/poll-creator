import CreatePoll from "@/components/forms/createPoll";

/**
 * Todo:
 * - Fetch a list of public polls stored in the database
 * - Link the display of polls to a details page
 * - Validate revalidating the cache is working (https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating#using-on-demand-revalidation)
 */

export default function Home() {
  return (
    <div className="flex flex-row h-full gap-10 p-4 py-8">
      <aside className="h-full p-6 rounded-md shadow-lg w-60">
        <h4 className="mb-4 text-sm font-medium leading-none">
          Create New Poll
        </h4>
        <CreatePoll />
      </aside>

      <div className="flex-1">Display Public Polls Here</div>
    </div>
  );
}
