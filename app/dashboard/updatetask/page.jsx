"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function UpdateTask() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center text-2xl">Edit Task</div>
      </div>
      <section>
        <Card className="w-full max-h-screen p-5 pt-8">
          <form>
            <CardContent className="grid gap-3">
              <label htmlFor="title">
                Title
                <Input id="title" className="w-full" />
              </label>
              <label htmlFor="description">
                Description
                <Textarea id="description" className="w-full" />
              </label>
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
              <Link
                href={"/dashboard"}
                className="px-2 py-1 border border-primary text-primary rounded-md hover:border-secondary-foreground hover:text-secondary-foreground"
              >
                Cancel
              </Link>
              <Button className="py-2 px-4">Save</Button>
            </CardFooter>
          </form>
        </Card>
      </section>
    </main>
  );
}
