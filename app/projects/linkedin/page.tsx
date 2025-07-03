"use client";

import React, { Suspense, useState, useEffect } from "react";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Footer from "@/components/ui/footer";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import SerifChar from "@/components/serifChar";
import mainImage from "@/public/images/linkedin/main.png";
import externalAuditImage from "@/public/images/linkedin/externalAudit.png";
import internalAuditImage from "@/public/images/linkedin/internalAudit.png";
import entryPointImage1 from "@/public/images/linkedin/entryPoint1.png";
import entryPointImage2 from "@/public/images/linkedin/entryPoint2.png";
import entryPointImage3 from "@/public/images/linkedin/entryPoint3.png";
import toneImage from "@/public/images/linkedin/tone.png";
import placementImage1 from "@/public/images/linkedin/placement1.png";
import placementImage2 from "@/public/images/linkedin/placement2.png";
import brand from "@/public/images/linkedin/brand.png";
import aiRewrite from "@/public/images/linkedin/aiRewrite.png";
import createImage from "@/public/images/linkedin/createImage.png";
import { Button } from "@/components/ui/button";
import { StaggerWrapper } from "@/components/staggerWrapper";
import { useStaggerAnimation } from "@/hooks/useStaggerAnimation";

function LinkedInContent() {
  const searchParams = useSearchParams();
  const fromAllWorks = searchParams.get("from") === "all-works";
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const { getTransition } = useStaggerAnimation({ baseDelay: 0.1 });

  useEffect(() => {
    const authStatus = localStorage.getItem("linkedinAuth") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "growth") {
      setIsAuthenticated(true);
      localStorage.setItem("linkedinAuth", "true");
    } else {
      alert("Incorrect password");
    }
  };

  const crumbs = fromAllWorks
    ? [
        { label: "ALL WORKS", href: "/archive" },
        { label: "LINKEDIN BRAND KIT" },
      ]
    : [{ label: "LINKEDIN BRAND KIT" }];

  return (
    <main className="page-container page-container-study">
      <div className="flex flex-col gap-4 items-start w-full mx-auto">
        <Breadcrumbs crumbs={crumbs} />

        <article className="w-full flex flex-col gap-[5rem]">
          <StaggerWrapper {...getTransition(0)}>
            <section className="flex flex-col gap-[1.5rem]">
              <div className="flex flex-col gap-[0.75rem]">
                <h2>
                  Bringing brands to life with AI-enhanced marketing on LinkedIn
                </h2>
                <p className="b_serif">
                  From May to August 2024, as a product design intern, I led a
                  key initiative to design a feature that enabled marketers to
                  create on-brand AI assets directly within LinkedIn
                  <SerifChar>'</SerifChar>s Accelerate Campaign. You can read
                  more about{" "}
                  <a
                    href="https://business.linkedin.com/marketing-solutions/ads/linkedin-accelerate"
                    className="link-underline"
                    rel="noopener noreferrer"
                  >
                    Accelerate
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
                <h4>CONTEXT</h4>
                <h3>An unexpected switch up</h3>
                <p className="b_serif">
                  Two weeks before our start date, we were reassigned to form an
                  intern team with an APM and a SWE intern to ship Brand Kit. At
                  the time, it was just an idea with minimal progress across
                  product, design, and engineering. It was up to the three of us
                  to bring it to life—a challenge that was both exciting and
                  daunting.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <h3>Accelerate in a nutshell</h3>
                  <p className="b_serif">
                    LinkedIn<SerifChar>'</SerifChar>s newest campaign format
                    that leverages AI to drive faster results through smart
                    targeting, streamlined campaign setup, and more.
                  </p>
                </div>
                <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full object-cover"
                  >
                    <source
                      src="/videos/linkedin/accelerate.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </section>
          </StaggerWrapper>

          <StaggerWrapper {...getTransition(2)}>
            <div className="w-full h-[0.0625rem] bg-tertiary-color opacity-[0.6]"></div>
          </StaggerWrapper>

          {!isAuthenticated ? (
            <StaggerWrapper {...getTransition(3)}>
              <section className="flex flex-col gap-2 justify-center">
                <div className="flex flex-col gap-1">
                  <h3>This project isn't public yet</h3>
                  <p className="b_serif">
                    If you don't have the password, please send me an email.
                  </p>
                </div>
                <form
                  onSubmit={handlePasswordSubmit}
                  className="flex flex-row gap-1 w-full"
                >
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="ENTER THE SECRET WORD"
                    className="b_mono px-2 pt-[0.66rem] pb-[0.61rem] rounded-md shadow-inset-tertiary bg-fill w-full"
                  />
                  <Button type="submit" className="pt-[0.66rem] pb-[0.61rem]">
                    SUBMIT
                  </Button>
                </form>
                <div className="w-full h-[0.0625rem] bg-tertiary-color opacity-[0.6] mt-[4rem]"></div>
              </section>
            </StaggerWrapper>
          ) : (
            <>
              <StaggerWrapper {...getTransition(4)}>
                <section className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <h4>PROBLEM</h4>
                    <h3>Accelerate generates robotic, off-brand content</h3>
                    <p className="b_serif">
                      25% of users found the generated content off-brand, while
                      18% described it as generic or robotic, leading marketers
                      to create branded assets outside the platform.
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4>GOAL</h4>
                    <h3>Integrate company branding into Accelerate</h3>
                    <p className="b_serif">
                      Help marketers create higher-quality, on-brand content
                      while keeping the magical feeling Accelerate currently
                      has.
                    </p>
                  </div>
                </section>
              </StaggerWrapper>

              <StaggerWrapper {...getTransition(5)}>
                <div className="w-full h-[0.0625rem] bg-tertiary-color opacity-[0.6]"></div>
              </StaggerWrapper>

              <StaggerWrapper {...getTransition(6)}>
                <section className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <h4>AUDIT</h4>
                      <h3>Current inputs for accelerate</h3>
                      <p className="b_serif">
                        Currently, we use Shutterstock to source images and
                        generate product descriptions from a company’s website
                        to craft ad copy.
                      </p>
                    </div>
                    <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                      <Image
                        src={internalAuditImage}
                        alt="Internal audit"
                        width={1200}
                        height={675}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <h3>Looking outside at competitors</h3>
                      <p className="b_serif">
                        I conducted an audit of six major players in the
                        AI-generated ads space, learning key design patterns and
                        brand fundamentals.
                      </p>
                    </div>
                    <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                      <Image
                        src={externalAuditImage}
                        alt="External audit"
                        width={1200}
                        height={675}
                      />
                    </div>
                  </div>
                </section>
              </StaggerWrapper>

              <StaggerWrapper {...getTransition(7)}>
                <section className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <h4>PRINCIPLES</h4>
                      <h3>I learned that a brand kit is...</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      <div className="rounded-[0.375rem] bg-fill px-2 py-[0.875rem] inner-shadow-tertiary">
                        <p className="b_serif">
                          <span className="font-medium">Visible:</span> Easy to
                          access, with most products offering dedicated pages.
                        </p>
                      </div>
                      <div className="rounded-[0.375rem] bg-fill px-2 py-[0.875rem] inner-shadow-tertiary">
                        <p className="b_serif">
                          <span className="font-medium">Consistent:</span> Brand
                          elements remain consistent to build brand equity.
                        </p>
                      </div>
                      <div className="rounded-[0.375rem] bg-fill px-2 py-[0.875rem] inner-shadow-tertiary">
                        <p className="b_serif">
                          <span className="font-medium">Simple:</span>{" "}
                          Simplifies branding, making it easy for users to get
                          started.
                        </p>
                      </div>
                      <div className="rounded-[0.375rem] bg-fill px-2 py-[0.875rem] inner-shadow-tertiary">
                        <p className="b_serif">
                          <span className="font-medium">Foundational:</span> A
                          core input for AI ad generation, influencing all
                          elements.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </StaggerWrapper>

              <StaggerWrapper {...getTransition(8)}>
                <section className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <h4>FEATURE PRIORITIZATION</h4>
                    <h3>A bottom-up approach </h3>
                    <p className="b_serif">
                      We prioritized small businesses, focusing on features that
                      offered quick, high-value impact. I worked with engineers
                      and PMs to plan internal and MVP releases, deliberately
                      excluding complex branding elements less relevant to this
                      audience.
                    </p>
                  </div>
                </section>
              </StaggerWrapper>

              <StaggerWrapper {...getTransition(9)}>
                <div className="w-full h-[0.0625rem] bg-tertiary-color opacity-[0.6]"></div>
              </StaggerWrapper>

              <StaggerWrapper {...getTransition(10)}>
                <section className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <h4>DECISIONS</h4>
                      <h3>Ideal entry points</h3>
                      <p className="b_serif">
                        We wanted the Brand Kit to be accessible without
                        diminishing the sense of magic in the campaign creation
                        flow. This meant ensuring users could incorporate their
                        brand assets effortlessly, without interrupting their
                        creative process.
                      </p>
                    </div>
                    <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                      <Image
                        src={entryPointImage1}
                        alt="Entry point 1"
                        width={1200}
                        height={675}
                      />
                    </div>
                    <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                      <Image
                        src={entryPointImage2}
                        alt="Entry point 2"
                        width={1200}
                        height={675}
                      />
                    </div>
                    <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                      <Image
                        src={entryPointImage3}
                        alt="Entry point 3"
                        width={1200}
                        height={675}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <h3>Tone selection</h3>
                      <p className="b_serif">
                        LinkedIn already had a component for generating and
                        selecting ad copy, so I explored adding a tone selection
                        feature. However, I could not alter the base layout.
                      </p>
                    </div>
                    <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                      <Image
                        src={toneImage}
                        alt="Tone selection"
                        width={1200}
                        height={675}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <h3>Brand kit placement</h3>
                      <p className="b_serif">
                        Advertiser Profile served as the hub for all
                        Accelerate-related inputs. Brand kit and product
                        description are connected which created lots of
                        discussion.
                      </p>
                    </div>
                    <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                      <Image
                        src={placementImage1}
                        alt="ClubsNEU main interface"
                        width={1200}
                        height={675}
                      />
                    </div>
                    <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                      <Image
                        src={placementImage2}
                        alt="ClubsNEU main interface"
                        width={1200}
                        height={675}
                      />
                    </div>
                  </div>
                </section>
              </StaggerWrapper>

              <StaggerWrapper {...getTransition(11)}>
                <div className="w-full h-[0.0625rem] bg-tertiary-color opacity-[0.6]"></div>
              </StaggerWrapper>

              <StaggerWrapper {...getTransition(12)}>
                <section className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                  <h4>FINAL DESIGNS</h4>
                  <h3>A brand that is consistently reinforced</h3>
                  <p className="b_serif">
                    Though these designs target small businesses, they lay the
                    foundation for future features as Accelerate scales and
                    evolves to reach broader audiences.
                  </p>
                </div>
                <div className="flex flex-col gap-[3rem]">
                  <div className="flex flex-col gap-1">
                    <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full object-cover"
                      >
                        <source
                          src="/videos/linkedin/createBrand.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <h4 className="text-primary-color-light">
                      Let AI craft your brand, so you only need a few finishing
                      touches.
                    </h4>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                      <Image
                        src={brand}
                        alt="Brand"
                        width={1200}
                        height={675}
                      />
                    </div>
                    <h4 className="text-primary-color-light">
                      One brand, one product. View, refine, and make it yours
                      whenever you need.
                    </h4>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full object-cover"
                      >
                        <source
                          src="/videos/linkedin/chooseTone.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <h4 className="text-primary-color-light">
                      AI-drafted copy no longer sounds robotic, thanks to a
                      refined tone.
                    </h4>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                      <Image
                        src={aiRewrite}
                        alt="AI rewrite"
                        width={1200}
                        height={675}
                      />
                    </div>
                    <h4 className="text-primary-color-light">
                      Coach AI helps ensure your desired tone stays consistent
                      as you write.
                    </h4>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="w-full inner-shadow-tertiary rounded-[0.375rem]">
                      <Image
                        src={createImage}
                        alt="Create image"
                        width={1200}
                        height={675}
                      />
                    </div>
                    <h4 className="text-primary-color-light">
                      Your brand colors, fonts, and logo come together to craft
                      impactful ads.
                    </h4>
                  </div>
                </div>
                </section>
              </StaggerWrapper>
            </>
          )}

          <StaggerWrapper {...getTransition(13)}>
            <section className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
              <h4>REFLECTION</h4>
              <h3>Details are time consuming</h3>
              <p className="b_serif">
                The details will often take a long time, think about the 80/20
                rule. It is best to design for the whole story first and worry
                about the details later.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3>Present for feedback</h3>
              <p className="b_serif">
                The goal of a presentation isn’t just to inform what you’ve been
                up to. It is also to receive the right type of feedback by
                guiding the audience towards a specific focus.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3>Explore micro interactions</h3>
              <p className="b_serif">
                Micro interactions are often overlooked but enhance user
                experience by providing information and adding delight.
              </p>
            </div>
            </section>
          </StaggerWrapper>
        </article>
        <StaggerWrapper {...getTransition(14)} className="w-full">
          <div className="w-full h-[0.0625rem] bg-tertiary-color opacity-[0.6]"></div>
        </StaggerWrapper>
        <StaggerWrapper {...getTransition(15)} className="w-full">
          <Footer />
        </StaggerWrapper>
      </div>
    </main>
  );
}

export default function LinkedIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LinkedInContent />
    </Suspense>
  );
}
