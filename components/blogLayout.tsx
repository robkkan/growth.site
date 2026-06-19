import React from "react";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Footer from "@/components/ui/footer";

interface BlogLayoutProps {
  date: string;
  children: React.ReactNode;
}

export function BlogLayout({ date, children }: BlogLayoutProps) {
  return (
    <main id="main" className="page-container page-container-narrow">
      <div className="flex flex-col gap-4 items-start w-full mx-auto">
        <Breadcrumbs crumbs={[{ label: date }]} />
        <div className="w-full flex gap-[2.5rem] flex-col">
          <section className="w-full flex flex-col">{children}</section>
          <hr className="w-full border-tertiary-color opacity-60" />
          <Footer />
        </div>
      </div>
    </main>
  );
}
