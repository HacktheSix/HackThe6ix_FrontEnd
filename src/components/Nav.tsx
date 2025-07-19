"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HomeIcon, 
  CloudArrowUpIcon, 
  ChartBarIcon, 
  ArrowsRightLeftIcon 
} from "@heroicons/react/24/outline";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  isActive: boolean;
}

function NavLink({ href, children, icon, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
        isActive
          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shadow-md"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 hover:shadow-sm"
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{children}</span>
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group animate-slide-in-left">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <ArrowsRightLeftIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              ModelCompare
            </span>
          </Link>

          <div className="flex items-center gap-2 animate-slide-in-right">
            <NavLink
              href="/"
              icon={<HomeIcon className="w-5 h-5" />}
              isActive={pathname === "/"}
            >
              Home
            </NavLink>
            <NavLink
              href="/upload"
              icon={<CloudArrowUpIcon className="w-5 h-5" />}
              isActive={pathname === "/upload"}
            >
              Upload
            </NavLink>
            <NavLink
              href="/compare"
              icon={<ArrowsRightLeftIcon className="w-5 h-5" />}
              isActive={pathname === "/compare"}
            >
              Compare
            </NavLink>
            <NavLink
              href="/dashboard"
              icon={<ChartBarIcon className="w-5 h-5" />}
              isActive={pathname === "/dashboard"}
            >
              Dashboard
            </NavLink>
          </div>

          <div className="flex items-center gap-2 animate-slide-in-right">
            <Link
              href="/signin"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 transform hover:scale-105 hover:shadow-sm rounded-lg"
            >
              Sign In
            </Link>
            <Link
              href="/get-started"
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 hover:shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 