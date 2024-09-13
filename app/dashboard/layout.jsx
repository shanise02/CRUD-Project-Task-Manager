import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import { Navigation } from "../components/DashboardNav";

export default function DashboardLayout({ children }) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[288px_1fr]">
      <div className="hidden border-r bg-background lg:block">
        <div className="flex flex-col gap-2 sticky top-0 h-screen">
          <div className="flex h-[60px] items-center px-6">
            <Link
              href={"/dashboard"}
              className="flex items-center gap-2 font-medium"
              prefetch={false}
            >
              <Image src={logo} alt="logo" className="w-10 h-10" />
              <span className="font-bold text-2xl">Task Manager</span>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Navigation />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg-h-[60px] items-center bg-background gap-4 border-b px-6 sticky top-0 z-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href={"/dashboard"}
                  className="flex items-center gap-2 font-semibold"
                  prefetch={false}
                >
                  <span className="font-bold text-2xl">Task Manager</span>
                </Link>
                <Navigation />
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
