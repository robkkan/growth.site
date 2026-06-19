import React, { useContext } from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import ArrowRight from '/public/images/icons/arrow-right.svg';
import { AccordionContext } from './accordion';
import { HoverEffectWrapper } from '../hoverEffectWrapper';

interface AccordionLikeButtonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const AccordionLikeButton: React.FC<AccordionLikeButtonProps> = ({ href, className, children }) => {
  const { hoveredItem, handleMouseEnter, handleMouseLeave } = useContext(AccordionContext);
  const buttonId = 'view-all';

  return (
    <HoverEffectWrapper
      id={buttonId}
      hoveredItem={hoveredItem}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <Link
        href={href}
        className={cn(
          "flex items-center justify-between w-full py-0",
          "b_mono text-primary-color",
          "transition-all duration-400 ease-in-out"
        )}
      >
        <span>{children}</span>
        <ArrowRight aria-hidden="true" className="w-3 h-3 text-secondary-color transition-colors duration-400 ease-in-out" />
      </Link>
    </HoverEffectWrapper>
  );
};

export default AccordionLikeButton;
