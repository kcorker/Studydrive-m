import prisma from "@/libs/prisma";

export async function GET() {
  try {
    const allVideos = await prisma.video.findMany();
    return new Response(JSON.stringify(allVideos), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing the request:", error);
    return new Response("An error occurred", {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const { videoDetails, uploadRes, userEmail } = await req.json();

    const user = await prisma.user.findFirst({
      where: { email: userEmail },
    });

    const existingFiles = await prisma.video.findMany({
      where: { video_name: { in: uploadRes.map((res) => res.videoname) } },
    });

    if (existingFiles.length > 0) {
      const existingFileNames = existingFiles.map((video) => video.video_name);
      return new Response(
        `These videos already uploaded: ${existingFileNames.join(", ")}`,
        {
          status: 200,
          statusText: "FAILED",
        }
      );
    }

    const createdVideos = [];

    for (let i = 0; i < videoDetails.length; i++) {
      const newVideo = await prisma.video.create({
        data: {
          userId: user.id,
          course_name: videoDetails[i].course,
          semester_code: videoDetails[i].semester,
          subject_code: videoDetails[i].subject.link,
          subject_name: videoDetails[i].subject.name,
          title: videoDetails[i].title.trim(),
          description: videoDetails[i].description.trim(),
          category: videoDetails[i].category.trim(),
          video_url: uploadRes[i].url,
          video_name: uploadRes[i].videoname,
        },
      });
      createdVideos.push(newVideo);
    }

    return new Response(JSON.stringify(createdVideos), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing the request:", error);
    return new Response("An error occurred", {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();
  try {
    const deletedVideo = await prisma.video.delete({
      where: { id: id },
    });
    return new Response(JSON.stringify(deletedVideo), {
      status: 200,
    });
  } catch (error) {
    console.error("Error processing the request:", error);
    return new Response("An error occurred", {
      status: 500,
    });
  }
}

export async function PUT(req) {
  const { id, title, description, category, course_name, semester_code, subject_code, subject_name, video_url, video_name } = await req.json();

  try {
    const updatedVideo = await prisma.video.update({
      where: { id },
      data: {
        title,
        description,
        category,
        course_name,
        semester_code,
        subject_code,
        subject_name,
        video_url,
        video_name,
      },
    });

    return new Response(JSON.stringify(updatedVideo), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing the request:", error);
    return new Response("An error occurred", {
      status: 500,
    });
  }
}
