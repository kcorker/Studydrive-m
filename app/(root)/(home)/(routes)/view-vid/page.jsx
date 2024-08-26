"use client";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import VideoCard from "@/components/video/VideoCard"; // Adjust to your video card component
import { useFilterVideos } from "@/libs/hooks/useVideo"; // New hook to fetch videos
import NoDataFound from "@/components/ui/NoDataFound";
import SkeletonLoading from "@/components/ui/SkeletonLoading";

const ViewVid = () => {
  const searchParams = useSearchParams();
  const subId = searchParams.get("subId");
  const course = searchParams.get("name");
  const semester = searchParams.get("sem");
  const category = searchParams.get("category");

  const {
    data: fetchedVideos,
    error,
    isLoading: loading,
  } = useFilterVideos({ course, semester, subId });

  useEffect(() => {
    if (fetchedVideos) {
      setUserSelectedVideos(fetchedVideos);
    }
    if (error) {
      console.error("Error fetching videos:", error);
      toast.error("Something went wrong in fetching Videos");
    }
  }, [fetchedVideos, error]);

  const [userSelectedVideos, setUserSelectedVideos] = useState([]);
  const data = useMemo(() => userSelectedVideos, [userSelectedVideos]);

  return (
    <div>
      <h1 className="select_header">{category}</h1>
      <div className="items-center">
        {loading ? (
          <SkeletonLoading />
        ) : (
          <>
            {data.length === 0 ? (
              <NoDataFound />
            ) : (
              <div className="grid md:grid-cols-2 mt-[18px] gap-[10px]">
                {data.map((item, index) => (
                  <VideoCard key={index} data={item} /> 
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewVid;
