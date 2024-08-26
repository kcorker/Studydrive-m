// pages/api/videos.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { course, semester, subId } = req.query;

  try {
    const videos = await prisma.video.findMany({
      where: {
        course_name: course,
        semester_code: semester,
        subjectId: subId,
      },
      orderBy: { sequence: "asc" }, // Order by sequence for proper video list order
    });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: "Error fetching videos" });
  }
}