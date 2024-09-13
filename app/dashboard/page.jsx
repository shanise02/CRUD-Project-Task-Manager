"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, SquarePen } from "lucide-react";
import Link from "next/link";
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

export default function DashboardPage() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center text-2xl">My Tasks</div>
        <div>
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
        <div className="flex items-center gap-4 bg-background py-3 px-4 rounded-md">
          <div className="flex items-center gap-2">
            <Checkbox className="w-6 h-6" />
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">Task Title</p>
              <p className="text-sm text-muted-foreground">Task Description</p>
            </div>
          </div>
          <div className="flex items-center ml-auto gap-1 space-x-2">
            <div className=" text-muted-foreground p-2 rounded-md">
              16/09/2001
            </div>
            <Link
              className="bg-muted py-2 px-1 rounded-md"
              href={"/dashboard/updatetask"}
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
                    You are about to delete <span>Task title</span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-background py-3 px-4 rounded-md">
          <div className="flex items-center gap-2">
            <Checkbox className="w-6 h-6" />
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">Task Title</p>
              <p className="text-sm text-muted-foreground">Task Description</p>
            </div>
          </div>
          <div className="flex items-center ml-auto gap-1 space-x-2">
            <div className=" text-muted-foreground p-2 rounded-md">
              16/09/2001
            </div>
            <Link
              className="bg-muted py-2 px-1 rounded-md"
              href={"/dashboard/updatetask"}
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
                    You are about to delete <span>Task title</span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </section>
    </main>
  );
}
