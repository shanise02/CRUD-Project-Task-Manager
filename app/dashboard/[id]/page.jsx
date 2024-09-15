// Update a single task
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import axios from "axios";

export default function UpdateTask({ params }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const { id } = params;

  // Fetch task data from the api
  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      try {
        const response = await axios.get(`/api/tasks?taskId=${id}`);
        console.log(`Fetching data for task ID: ${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setPriority(response.data.priority);
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [id]);


  // Handle task update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/tasks/${id}`, {
        title,
        description,
        status,
        priority,
      });

      // Redirect to the dashboard if the task is updated successfully
      if (response.status === 200) {
        router.push("/dashboard");

        // Success toast message
        toast({
          title: "Task Updated",
          description: "Your task has been updated successfully.",
        });
      }
    } catch (error) {
      console.error("Error updating task:", error);

      // Error toast message
      toast({
        title: "Error",
        description: "An error occurred while updating your task.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center text-2xl">Edit Task</div>
      </div>
      <section>
        <Card className="w-full max-h-screen p-5 pt-8">
          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                className="w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                className="w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex flex-cols gap-3">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue id="status" value={status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue id="priority" value={priority} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
              <Link
                href={"/dashboard"}
                className="px-2 py-1 border border-primary text-primary rounded-md hover:border-secondary-foreground hover:text-secondary-foreground"
              >
                Cancel
              </Link>
              <Button type="submit" className="py-2 px-4">
                Save
              </Button>
            </CardFooter>
          </form>
        </Card>
      </section>
    </main>
  );
}
