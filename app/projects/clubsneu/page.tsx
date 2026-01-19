"use client";

import React, { Suspense } from "react";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Footer from "@/components/ui/footer";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import SerifChar from '@/components/serifChar';
import mainImage from "@/public/images/clubsneu/main.png";
import participationImage from "@/public/images/clubsneu/participation.png";
import instagramImage from "@/public/images/clubsneu/instagram.png";
import fallfestImage from "@/public/images/clubsneu/fallfest.png";
import anthologyImage from "@/public/images/clubsneu/anthology.png";
import productImage from "@/public/images/clubsneu/clubsneu.png";
import toolbarIterationImage from "@/public/images/clubsneu/toolbarIteration.png";
import toolbarFinalImage from "@/public/images/clubsneu/toolbarFinal.png";
import cardImage from "@/public/images/clubsneu/clubCard.png";
import searchIterationImage from "@/public/images/clubsneu/searchIteration.png";
import searchFinalImage from "@/public/images/clubsneu/searchFinal.png";
import finalDatabase from "@/public/images/clubsneu/finalDatabase.png";
import finalClubPage from "@/public/images/clubsneu/finalClub.png";
import finalMobile from "@/public/images/clubsneu/finalMobile.png";
import { StaggerWrapper } from "@/components/staggerWrapper";
import { useStaggerAnimation } from "@/hooks/useStaggerAnimation";

function ClubsNEUContent() {
  const searchParams = useSearchParams();
  const fromAllWorks = searchParams.get("from") === "all-works";

  const crumbs = fromAllWorks
    ? [
        { label: "ALL WORKS", href: "/archive" },
        { label: "CLUBSNEU DATABASE" },
      ]
    : [{ label: "CLUBSNEU DATABASE" }];

  const { getTransition } = useStaggerAnimation({ baseDelay: 0.1 });

  return (
    <main className="page-container page-container-study">
      <div className="flex flex-col gap-4 items-start w-full mx-auto">
        <Breadcrumbs crumbs={crumbs} />

        <article className="w-full flex flex-col gap-[5rem]">
          <StaggerWrapper {...getTransition(0)}>
            <section className="flex flex-col gap-[1.5rem]">
              <div className="flex flex-col gap-[0.75rem]">
                <h2>
                  Community database focused on discovery and student-club
                  connection
                </h2>
                <p className="b_serif">
                  From March to December 2023, as the founding designer, I worked
                  with an engineer to ship a new platform that helps Northeastern
                  students discover and connect with clubs. Check out the{" "}
                  <a
                    href="https://github.com/festillis/clubsneu"
                    className="link-underline"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a>{" "}
                  here.
                </p>
              </div>
              <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                <Image
                  src={mainImage}
                  alt="ClubsNEU main interface"
                  width={1200}
                  height={675}
                />
              </div>
            </section>
          </StaggerWrapper>

          <StaggerWrapper {...getTransition(1)}>
            <section className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h4>CONTEXT & RESEARCH</h4>
                <h3>Alumni biggest regret: not joining clubs</h3>
                <p className="b_serif">
                  During an alumni AMA, panelists were asked about their biggest
                  regret at Northeastern. Surprisingly, they all shared the same
                  one<SerifChar>:</SerifChar> not joining enough clubs. Having faced a similar issue, I
                  decided to explore it further.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <h3>Northeastern club participation</h3>
                  <p className="b_serif">
                    While finding exact statistics on members for every club was
                    difficult, I analyzed the application or participation rates
                    of 5 well-known campus clubs.
                  </p>
                </div>
                <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                  <Image
                    src={participationImage}
                    alt="ClubsNEU main interface"
                    width={1200}
                    height={675}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <h3>Why was participation low<SerifChar>?</SerifChar></h3>
                  <p className="b_serif">
                    Talking to 10<SerifChar>+</SerifChar> students and reviewing existing platforms gave
                    us valuable insights. Students mentioned three products, each
                    with distinct pain points.
                  </p>
                </div>
                <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                  <Image
                    src={instagramImage}
                    alt="ClubsNEU main interface"
                    width={1200}
                    height={675}
                  />
                </div>
                <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                  <Image
                    src={fallfestImage}
                    alt="ClubsNEU main interface"
                    width={1200}
                    height={675}
                  />
                </div>
                <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                  <Image
                    src={anthologyImage}
                    alt="ClubsNEU main interface"
                    width={1200}
                    height={675}
                  />
                </div>
              </div>
            </section>
          </StaggerWrapper>

          <StaggerWrapper {...getTransition(2)}>
            <div className="w-full h-[0.0625rem] bg-tertiary-color opacity-[0.6]"></div>
          </StaggerWrapper>

          <StaggerWrapper {...getTransition(3)}>
            <section className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h4>PROBLEM</h4>
                <h3>Too many incomplete platforms</h3>
                <p className="b_serif">
                  Students switch between platforms, leading to frustration, a
                  higher barrier to entry, and a weaker sense of community.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <h4>SOLUTION</h4>
                  <h3>A single platform for all clubs</h3>
                  <p className="b_serif">
                    An always-accessible platform helping students find their
                    community with better search, personalized recommendations,
                    and complete club information.
                  </p>
                </div>
                <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                  <Image
                    src={productImage}
                    alt="ClubsNEU main interface"
                    width={1200}
                    height={675}
                  />
                </div>
              </div>
            </section>
          </StaggerWrapper>

          <StaggerWrapper {...getTransition(4)}>
            <section className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <h4>DECISIONS</h4>
                  <h3>Toolbar Orientation</h3>
                  <p className="b_serif">
                    The toolbar is the primary interaction point for filtering and
                    sorting the database. There were two options<SerifChar>:</SerifChar> horizontal and
                    vertical, each with their pros and cons.
                  </p>
                </div>
                <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                  <Image
                    src={toolbarIterationImage}
                    alt="ClubsNEU main interface"
                    width={1200}
                    height={675}
                  />
                </div>
                <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                  <Image
                    src={toolbarFinalImage}
                    alt="ClubsNEU main interface"
                    width={1200}
                    height={675}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <h3>Club card exploration</h3>
                  <p className="b_serif">
                    These cards show basic club info to encourage further
                    exploration. They greatly influenced ClubsNEU<SerifChar>'</SerifChar>s visual design
                    and underwent many iterations.
                  </p>
                </div>
                <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                  <Image
                    src={cardImage}
                    alt="ClubsNEU main interface"
                    width={1200}
                    height={675}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <h3>Maximizing search efficiency</h3>
                  <p className="b_serif">
                    When clicking into a club card, we chose between loading a new
                    page or using a full screen overlay. The overlay proved more
                    efficient and simpler for browsing clubs.
                  </p>
                </div>
                <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                  <Image
                    src={searchIterationImage}
                    alt="ClubsNEU main interface"
                    width={1200}
                    height={675}
                  />
                </div>
                <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                  <Image
                    src={searchFinalImage}
                    alt="ClubsNEU main interface"
                    width={1200}
                    height={675}
                  />
                </div>
              </div>
            </section>
          </StaggerWrapper>

          <StaggerWrapper {...getTransition(5)}>
            <section className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <h4>FINAL DESIGNS</h4>
                <h3>An MVP ready for distribution</h3>
                <p className="b_serif">
                  With the database, club page, and onboarding completed, it was
                  time to pitch the product to clubs and students to test its
                  market fit.
                </p>
              </div>
              <div className="flex flex-col gap-[3rem]">
                <div className="flex flex-col gap-1">
                  <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                    <Image
                      src={finalDatabase}
                      alt="ClubsNEU main interface"
                      width={1200}
                      height={675}
                    />
                  </div>
                  <h4 className="text-primary-color-light">
                    Simply search, filter, and discover clubs that match your
                    interests.
                  </h4>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                    <Image
                      src={finalClubPage}
                      alt="ClubsNEU main interface"
                      width={1200}
                      height={675}
                    />
                  </div>
                  <h4 className="text-primary-color-light">
                    Your go-to for club info, pulled from socials, calendars, and
                    websites.
                  </h4>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                    <Image
                      src={finalMobile}
                      alt="ClubsNEU main interface"
                      width={1200}
                      height={675}
                    />
                  </div>
                  <h4 className="text-primary-color-light">
                    Responsive design ensures ClubsNEU adapts seamlessly across
                    all devices.
                  </h4>
                </div>
              </div>
            </section>
          </StaggerWrapper>

          <StaggerWrapper {...getTransition(6)}>
            <section className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h4>REFLECTION & RESULTS</h4>
                <h3>Distribution can break a product </h3>
                <p className="b_serif">
                  Poor distribution led to the sunsetting of ClubsNEU in early
                  2024. This was my first experience launching a product, and it
                  taught me a valuable lesson.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h3>Don’t be afraid to iterate</h3>
                <p className="b_serif">
                  Focusing on a specific design can lead to attachment, but it’s
                  important to set aside sunk cost and iterate when needed to
                  build something great.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h3>Scope creep hinders MVP development</h3>
                <p className="b_serif">
                  There were tons of features brainstormed that kept on pushing
                  the release date. For an MVP, limiting the scope early will save
                  time in the long run.
                </p>
              </div>
            </section>
          </StaggerWrapper>
        </article>
        <StaggerWrapper {...getTransition(7)} className="w-full">
          <div className="w-full h-[0.0625rem] bg-tertiary-color opacity-[0.6]"></div>
        </StaggerWrapper>
        <StaggerWrapper {...getTransition(8)} className="w-full">
          <Footer />
        </StaggerWrapper>
      </div>
    </main>
  );
}

export default function ClubsNEU() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClubsNEUContent />
    </Suspense>
  );
}
