"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Plus, SquareCheck, Square, ListTodo } from "lucide-react";
import { usePathname } from "next/navigation";

export const navItems = [
  {
    name: "My Tasks",
    href: "/dashboard",
    icon: ListTodo,
  },
  {
    name: "Completed",
    href: "/dashboard/completed",
    icon: SquareCheck,
  },
  {
    name: "Incomplete",
    href: "/dashboard/incomplete",
    icon: Square,
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
      {navItems.map((item, index) => (
        <Link href={item.href} key={index}>
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 mr-3 ml-3 font-medium hover:bg-accent hover:text-primary", pathname === item.href ? "bg-accent" : "bg-transparent"
            )}
          >
            {item.icon &&<item.icon className="w-5 h-5 mr-2 text-primary" />}
            <span>{item.name}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}
