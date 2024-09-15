// Create and Read tasks in the database
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new task
export async function POST(req) {
  try {
    const { title, description } = await req.json();
    const newTask = await prisma.task.create({
      data: {
        title: title,
        description: description,
        status: "PENDING",
      },
    });
    return new Response(JSON.stringify(newTask), { status: 200 });
  } catch (error) {
    console.error("Error creating task", error); // Log the error
    return new Response(JSON.stringify({ error: "Error creating task" }), {
      status: 500,
    });
  }
}
// Read task/tasks
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const taskId = url.searchParams.get("taskId");
    console.log("Fetching task with ID:", taskId); // Log taskId
    // If there is a task ID, fetch a single task
    if (taskId) {
      const task = await prisma.task.findUnique({
        where: {
          id: parseInt(taskId, 10), // Convert the task ID to an integer
        },
      });

      if (!task) {
        return new Response(JSON.stringify({ error: "Task not found" }), {
          status: 404,
        });
      }
      return new Response(JSON.stringify(task), { status: 200 });
    }

    // If there is no task ID, fetch all tasks
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.error("Error reading tasks", error); // Log the error
    return new Response(JSON.stringify({ error: "Error reading tasks" }), {
      status: 500,
    });
  }
}
