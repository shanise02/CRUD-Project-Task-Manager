// Update and Delete tasks in the database
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Update a task
export async function PUT(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing task ID" }), {
        status: 400,
      });
    }

    const { title, description, status, priority } = await req.json();

    // Validate priority if it exists
    const validPriorities = ["LOW", "MEDIUM", "HIGH"];
    if (priority && !validPriorities.includes(priority)) {
      return new Response(
        JSON.stringify({ error: "Invalid priority. Must be LOW, MEDIUM, or HIGH" }),
        { status: 400 }
      );
    }

    // Update the task
    const updatedTask = await prisma.task.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        title,
        description,
        status,
        priority,
      },
    });

    // Return the updated task
    return new Response(JSON.stringify(updatedTask), { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return new Response(JSON.stringify({ error: "Error updating task" }), {
      status: 500,
    });
  }
}

// Delete a task
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing task ID" }), {
        status: 400,
      });
    }

    const deletedTask = await prisma.task.delete({
      where: {
        id: parseInt(id, 10),
      },
    });
    return new Response(JSON.stringify(deletedTask), { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return new Response(JSON.stringify({ error: "Error deleting task" }), {
      status: 500,
    });
  }
}
