"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <div
      className={`flex ${selected ? "text-[#413ce6]" : "text-slate-500"}  cursor-pointer text-lg`}
      onClick={() => {
        router.push(href);
      }}
    >
      <div className="mr-3">{icon}</div>
      <div
        className={`font-bold ${selected ? "text-[#413ce6]" : "text-slate-500"}`}
      >
        {title}
      </div>
    </div>
  );
};
