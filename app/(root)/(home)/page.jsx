import Feed from "@/components/Feed";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <div className="md:flex">
      {/* Banner Section */}
      <Banner />

      {/* Feed Section */}
      <div>
        <Feed
          label="Discover Courses"
          styleHead="mt-3"
          style="md:grid-cols-5 mt-4 gap-1.5 justify-between md:justify-start"
        />
      </div>
    </div>
  );
}