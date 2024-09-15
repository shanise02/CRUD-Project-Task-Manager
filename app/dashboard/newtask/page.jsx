// Create a new task page with form
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import axios from "axios";

export default function CreateTask({ taskData }) {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const router = useRouter();

  // Handle task creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/tasks", {
        title: title,
        description: description,
        priority: priority,
      });

      console.log(response);

      if (response.status === 200) {
        console.log(response.data);

        // Success toast message
        toast({
          title: "Task Created",
          description: "Your task has been created successfully.",
        });

        // Reset the form after creating a new task
        setTitle("");
        setDescription("");

        // Reset the list of tasks after creating a new task
        if (typeof taskData === "function") {
          taskData(); // Call taskData if it's a function
        } else {
          console.error("taskData is not a function");
        }

        // Redirect to the dashboard if the task is created successfully
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error creating task", error);

      // Error toast message
      toast({
        title: "Error",
        description: "An error occurred while creating your task.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center text-2xl">Create a new task</div>
      </div>
      <section>
        <Card className="w-full max-h-screen p-5 pt-8">
          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
                required
              />
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full"
              />
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
