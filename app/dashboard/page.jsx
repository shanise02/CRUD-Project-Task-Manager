// Dashboard page, reads all tasks
"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, SquarePen, Search } from "lucide-react";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Fetcher function for useSWR
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DashboardPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState(""); // Stores the search query

  const { data: taskData, error, mutate } = useSWR("/api/tasks", fetcher);

  // If an error occurred, display an error message
  if (error) return <div>Failed to load</div>;

  // If taskData is undefined, display a loading message
  if (!taskData) return <div>Loading...</div>;

  // Filter tasks based on search query
  const filteredTasks = taskData.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Delete a task
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`/api/tasks/${taskId}`);
      mutate();

      if (response.status === 200) {
        console.log(response.data);

        // Success toast message
        toast({
          title: "Task deleted",
          description: "The task was deleted successfully.",
        });

        // Reset the list of tasks after deleting a task
        if (typeof taskData === "function") {
          taskData(); // Call taskData if it's a function
        } else {
          console.error("taskData is not a function");
        }
      }
    } catch (error) {
      console.error("Error deleting task:", error);

      // Error toast message
      toast({
        title: "Error",
        description: "An error occurred while deleting the task.",
        variant: "destructive",
      });
    }
  };

  // Update task status
  const handleTaskStatusChange = async (taskId, isCompleted) => {
    try {
      const newStatus = isCompleted ? "COMPLETED" : "PENDING";
      const response = await axios.put(`/api/tasks/${taskId}`, {
        status: newStatus,
      });

      if (response.status === 200) {
        mutate();

        // Success toast message
        toast({
          title: "Task Status Updated",
          description: "The task status was updated successfully.",
        });
      }
    } catch (error) {
      console.error("Error updating task:", error);

      // Error toast message
      toast({
        title: "Error",
        description: "An error occurred while updating the task status.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex flex-col sm:flex-row justify-between p-4 border-b">
        <div className="text-2xl">My Tasks</div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-x-4 gap-y-1">
          <div className="relative sm:mb-0">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 flex-shrink-0 mr-2" />
            <Input
              type="text"
              placeholder="Search by title..."
              className="pl-10 bg-transparent focus:outline-none w-full border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link
            href={"/dashboard/newtask"}
            className="flex items-center px-3 py-2 border text-primary-foreground rounded-md bg-primary hover:bg-transparent hover:text-primary hover:border-primary"
          >
            <span>
              <Plus className="w-5 h-5 mr-1" />
            </span>
            New Task
          </Link>
        </div>
      </div>
      <section className="space-y-2">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col sm:flex-row gap-4 bg-background py-3 px-4 rounded-md"
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  className="w-6 h-6"
                  checked={task.status === "COMPLETED"}
                  onCheckedChange={(checked) =>
                    handleTaskStatusChange(task.id, checked)
                  }
                />
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {task.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {task.description.length > 80
                      ? task.description.slice(0, 80) + "..."
                      : task.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center ml-auto gap-1 space-x-2">
                <p
                  className={`text-sm bg-transparent p-2 rounded-md ${
                    task.priority === "HIGH"
                      ? "text-red-500 border border-red-500" // Red for high priority
                      : task.priority === "MEDIUM"
                      ? "text-yellow-500 border border-yellow-500" // Yellow for medium priority
                      : "text-green-500 border border-green-500" // Green for low priority
                  }`}
                >
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1).toLowerCase()}{" "}
                  Priority
                </p>
                <p className="text-sm bg-muted p-2 rounded-md">
                  {new Date(task.updatedAt).toLocaleDateString()}
                </p>
                <Link
                  className="bg-muted py-2 px-1 rounded-md"
                  href={`/dashboard/${task.id}`}
                >
                  <SquarePen className="text-muted-foreground hover:text-secondary-foreground" />
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-muted py-2 px-1 rounded-md hover:bg-muted">
                      <Trash2 className="text-muted-foreground text-red-500 hover:text-secondary-foreground" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this task?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        You are about to delete <span>{task.title}</span>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            You do not have any tasks, create a new task.
          </div>
        )}
      </section>
    </main>
  );
}
