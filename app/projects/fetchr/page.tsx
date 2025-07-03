"use client";

import React, { Suspense } from "react";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Footer from "@/components/ui/footer";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import SerifChar from "@/components/serifChar";
import chatImage from "@/public/images/fetchr/chat.png";
import styleImage from "@/public/images/fetchr/style.png";
import waistImage from "@/public/images/fetchr/waist.png";
import { StaggerWrapper } from "@/components/staggerWrapper";
import { useStaggerAnimation } from "@/hooks/useStaggerAnimation";

function FetchrContent() {
  const searchParams = useSearchParams();
  const fromAllWorks = searchParams.get("from") === "all-works";
  const { getTransition } = useStaggerAnimation({ baseDelay: 0.1 });

  const crumbs = fromAllWorks
    ? [{ label: "ALL WORKS", href: "/archive" }, { label: "FETCHR APP" }]
    : [{ label: "FETCHR APP" }];

  return (
    <main className="page-container page-container-study">
      <div className="flex flex-col gap-4 items-start w-full mx-auto">
        <Breadcrumbs crumbs={crumbs} />

        <article className="w-full flex flex-col gap-[5rem]">
          <StaggerWrapper {...getTransition(0)}>
            <section className="flex flex-col gap-[1.5rem]">
              <div className="flex flex-col gap-[0.75rem]">
                <h2>
                  Building a AI personal clothing shopper that learns your
                  style
                </h2>
                <p className="b_serif">
                  As the sole designer at Fetchr, a pre-seed YC-backed startup, I
                  am leading the design of an AI stylist that builds trust and
                  confidence by recommending clothes that match each user's
                  unique style. Learn more about{" "}
                  <a
                    href="https://www.fetchr.so/"
                    className="link-underline"
                    rel="noopener noreferrer"
                  >
                    Fetchr
                  </a>{" "}
                  here.
                </p>
              </div>
              <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                <Image
                  src={styleImage}
                  alt="ClubsNEU main interface"
                  width={1200}
                  height={675}
                />
              </div>
              <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                <Image
                  src={chatImage}
                  alt="ClubsNEU main interface"
                  width={1200}
                  height={675}
                />
              </div>
              <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                <Image
                  src={waistImage}
                  alt="ClubsNEU main interface"
                  width={1200}
                  height={675}
                />
              </div>
            </section>
          </StaggerWrapper>
        </article>
        <StaggerWrapper {...getTransition(1)} className="w-full">
          <div className="w-full h-[0.0625rem] bg-tertiary-color opacity-[0.6]"></div>
        </StaggerWrapper>
        <StaggerWrapper {...getTransition(2)} className="w-full">
          <Footer />
        </StaggerWrapper>
      </div>
    </main>
  );
}

export default function Fetchr() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FetchrContent />
    </Suspense>
  );
}
