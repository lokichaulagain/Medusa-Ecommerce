"use client";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="p-4 h-screen flex items-center justify-center">{children}</div>;
}