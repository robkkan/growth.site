"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { useRef, useState, useEffect } from "react"

import { cn } from "@/lib/utils"
import ChevronDown from '/public/images/icons/chevron-down.svg'
import { useHoverEffect } from '@/hooks/useHoverEffect';
import { HoverEffectWrapper } from '../hoverEffectWrapper';
import { Project, allProjects } from "@/lib/data/projectData";

interface AccordionContextProps {
  hoveredItem: string | null;
  handleMouseEnter: (id: string) => void;
  handleMouseLeave: () => void;
  selectedContent: string | null;
  setSelectedContent: (value: string | null) => void;
  selectedYear: string | null;
  setSelectedYear: (value: string | null) => void;
  currentProject: Project | null;
}

const DEFAULT_CONTEXT: AccordionContextProps = {
  hoveredItem: null,
  handleMouseEnter: () => {},
  handleMouseLeave: () => {},
  selectedContent: null,
  setSelectedContent: () => {},
  selectedYear: null,
  setSelectedYear: () => {},
  currentProject: null
};

const AccordionContext = React.createContext<AccordionContextProps>(DEFAULT_CONTEXT);

const useAccordionContext = () => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordionContext must be used within an AccordionProvider');
  }
  return context;
};

type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
  type: 'single' | 'multiple';
  defaultSelectedContent?: string;
  collapsible?: boolean;
};

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ className, defaultSelectedContent = '2024-005', ...props }, ref) => {
  const { hoveredItem, handleMouseEnter, handleMouseLeave } = useHoverEffect();
  const [selectedContent, setSelectedContent] = React.useState<string | null>(defaultSelectedContent);
  const [selectedYear, setSelectedYear] = React.useState<string | null>(null);

  const currentProject = React.useMemo(() => {
    if (!selectedContent) return null;
    const [year, num] = selectedContent.split('-');
    return allProjects.find(project => project.num === num && project.date === year) || null;
  }, [selectedContent]);

  const contextValue = React.useMemo(() => ({
    hoveredItem,
    handleMouseEnter,
    handleMouseLeave,
    selectedContent,
    setSelectedContent,
    selectedYear,
    setSelectedYear,
    currentProject
  }), [hoveredItem, handleMouseEnter, handleMouseLeave, selectedContent, selectedYear, currentProject]);

  return (
    <LayoutGroup id="accordion">
      <AccordionContext.Provider value={contextValue}>
        <AnimatePresence initial={false}>
          <AccordionPrimitive.Root
            ref={ref}
            className={cn('accordion-root', className)}
            {...props}
          />
        </AnimatePresence>
      </AccordionContext.Provider>
    </LayoutGroup>
  );
});
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const { hoveredItem, handleMouseEnter, handleMouseLeave } = React.useContext(AccordionContext);
  
  return (
    <HoverEffectWrapper
      id={props.value as string}
      hoveredItem={hoveredItem}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("b_mono text-secondary-color", className)}
    >
      <AccordionPrimitive.Item
        ref={ref}
        className={cn("data-[state=open]:pb-[0.375rem]")}
        {...props}
      />
    </HoverEffectWrapper>
  )
})
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const { setSelectedYear } = React.useContext(AccordionContext);

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "b_mono flex flex-1 items-center justify-between py-0",
          "[&[data-state=open]>div>svg]:rotate-180",
          className
        )}
        onClick={() => {
          // Don't reset selectedContent when clicking the year
          setSelectedYear(children as string);
        }}
        {...props}
      >
        {children}
        <div className="b_mono flex items-center justify-center shrink-0">
          <ChevronDown className="w-3 h-3 text-secondary-color" /> 
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
    contentId: string;
  }
>(({ className, children, contentId, ...props }, ref) => {
  const { selectedContent, setSelectedContent } = useAccordionContext();
  const isSelected = selectedContent === contentId;
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        "data-[state=closed]:animate-accordion-up",
        "data-[state=open]:animate-accordion-down",
        className
      )}
      {...props}
    >
      <div 
        ref={contentRef}
        data-content-id={contentId}
        className={cn(
          "relative pb-[0.35rem] pt-[0.4rem] px-[0.75rem] rounded-[0.375rem] cursor-pointer",
          isSelected ? "text-primary-color" : "hover:text-primary-color",
        )}
        onClick={() => setSelectedContent(contentId)}
      >
        <AnimatePresence mode="wait">
          {isSelected && (
            <motion.span
              layoutId="accordion-bubble"
              className="absolute inset-[0.0625rem] z-0 bg-select rounded-[0.375rem]"
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.6
              }}
            />
          )}
        </AnimatePresence>
        <span className="relative z-10">{children}</span>
      </div>
    </AccordionPrimitive.Content>
  );
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, AccordionContext, useAccordionContext }
