import Feed from "@/components/Feed";
import Banner from "@/components/Banner";
import Notification from "@/components/Notification";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Banner Section */}
      <div className="w-full">
        <Banner />
      </div>

      {/* Notification Section */}
      <div className="w-full my-4">
        <Notification />
      </div>

      {/* Feed Section */}
      <div className="w-full px-4 md:px-8">
        <Feed
          label="Discover Courses"
          styleHead="mt-3"
          style="md:grid-cols-5 mt-4 gap-1.5 justify-between md:justify-start"
        />
      </div>
    </div>
  );
}