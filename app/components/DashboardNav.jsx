// Navigation links for the dashboard side bar
"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Plus, ListTodo, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

// Navigation items and their icons
export const navItems = [
  {
    name: "My Tasks",
    href: "/dashboard",
    icon: ListTodo,
  },
  {
    name: "New Task",
    href: "/dashboard/newtask",
    icon: Plus,
  },
];

export function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="grid items-start gap-2 mt-4">
      {/* Navigation links mapped from the navItems array */}
      {navItems.map((item, index) => (
        <Link href={item.href} key={index}>
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 mr-3 ml-3 font-medium hover:bg-accent hover:text-primary",
              pathname === item.href ? "bg-accent" : "bg-transparent"
            )}
          >
            {item.icon && <item.icon className="w-5 h-5 mr-2 text-primary" />}
            <span>{item.name}</span>
          </span>
        </Link>
      ))}

      {/* Logout button */}
      <Link
        href={"/"}
        className="flex items-center justify-center gap-2 rounded-md px-3 py-3 m-3 bg-primary text-primary-foreground font-medium border hover:bg-transparent hover:border-primary hover:text-primary"
      >
        <span>Logout</span>
        <LogOut className="w-5 h-5 mr-2" />
      </Link>
    </nav>
  );
}
