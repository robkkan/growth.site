"use client";

import React from "react";
import HeaderMain from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { useRouter } from "next/navigation";
import ItemEntry from "@/components/ui/itemEntry";
import { HoverEffectWrapper } from "@/components/hoverEffectWrapper";
import { useHoverEffect } from "@/hooks/useHoverEffect";
import { useStaggerAnimation } from "@/hooks/useStaggerAnimation";
import { StaggerWrapper } from "@/components/staggerWrapper";

// Define the writing entry type
interface WritingEntry {
  num: string;
  title: string;
  date: string;
  href: string;
  slug: string;
}

interface WritingClientProps {
  initialEntries: WritingEntry[];
}

export default function WritingClient({ initialEntries }: WritingClientProps) {
  const router = useRouter();
  const [, startTransition] = React.useTransition();
  const [selectedButton, setSelectedButton] = React.useState<string>("writing");
  const { hoveredItem, handleMouseEnter, handleMouseLeave } = useHoverEffect();
  const { getTransition } = useStaggerAnimation({ baseDelay: 0.1 });
  const [writingEntries] = React.useState<WritingEntry[]>(initialEntries);

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
    if (buttonName === "home") {
      startTransition(() => {
        router.push("/");
      });
    }
  };

  // Memoize the getTransition calls
  const transitions = React.useMemo(
    () => writingEntries.map((_, index) => getTransition(index + 1)),
    [writingEntries.length, getTransition]
  );

  const headerTransition = React.useMemo(
    () => getTransition(0),
    [getTransition]
  );

  const footerTransition = React.useMemo(
    () => getTransition(writingEntries.length + 1),
    [writingEntries.length, getTransition]
  );

  return (
    <main className="page-container page-container-default">
      <div className="flex flex-col gap-[2.25rem] items-center w-full">
        <section className="flex flex-col gap-[0.75rem] w-full">
          <HeaderMain
            headerText="Writing."
            selectedButton={selectedButton}
            handleButtonClick={handleButtonClick}
          />

          <div className="flex flex-col w-full">
            {writingEntries.length > 0 ? (
              writingEntries.map((entry, index) => (
                <StaggerWrapper key={entry.num} {...transitions[index]}>
                  <HoverEffectWrapper
                    id={entry.num}
                    hoveredItem={hoveredItem}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ItemEntry
                      num={entry.num}
                      title={entry.title}
                      date={entry.date}
                      href={entry.href}
                    />
                  </HoverEffectWrapper>
                </StaggerWrapper>
              ))
            ) : (
              <p className="b_mono">No writing entries found.</p>
            )}
          </div>
        </section>
        <StaggerWrapper {...footerTransition}>
          <Footer />
        </StaggerWrapper>
      </div>
    </main>
  );
}
