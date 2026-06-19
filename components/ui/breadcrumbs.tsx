"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ArrowLeftIcon from '@/public/images/icons/arrow-left.svg';
import ChevronRightIcon from '@/public/images/icons/chevron-right.svg';

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs }) => {
  const router = useRouter();

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-[0.25rem] w-full">
      <Button
        onClick={() => router.back()}
        className="flex items-center gap-[0.25rem] pl-[0.5rem]"
      >
        <ArrowLeftIcon aria-hidden="true" className="w-3 h-3" />
        BACK
      </Button>
      <ol className="flex items-center gap-[0.25rem]">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-[0.25rem]">
              <ChevronRightIcon aria-hidden="true" className="w-3 h-3 text-tertiary-color" />
              <Button
                variant={isLast ? "selected" : "default"}
                className={isLast ? "shadow-inset-tertiary" : ""}
                onClick={() => crumb.href && router.push(crumb.href)}
                aria-current={isLast ? "page" : undefined}
              >
                {crumb.label}
              </Button>
            </li>
          );
        })}
      </ol>
      <div className="flex-grow ml-[0.25rem] mt-[0.625rem]">
        <div className="h-[0.0625rem] bg-tertiary-color opacity-[0.6]"></div>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
