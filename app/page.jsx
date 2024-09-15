// Home page
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Welcom to the task manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src="/images/task-management.gif"
            alt="task management illustration"
            width={180}
            height={180}
            className="mx-auto"
            priority
            unoptimized={true}

          />
          <p className="text-center">Manage your tasks easily</p>
        </CardContent>
        <CardFooter>
          <Link
            href={"/dashboard"}
            className="w-full rounded-sm bg-green-500 hover:bg-green-600 p-3 text-white text-center"
          >
            Go to Dashboard
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
