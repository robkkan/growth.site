"use client"

import { motion } from "framer-motion"
import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsProps {
  defaultValue: string
  onValueChange?: (value: string) => void
  children?: React.ReactNode
  className?: string
}

const TabsContext = React.createContext<{
  selectedTab: string
  setSelectedTab: (value: string) => void
} | null>(null)

const Tabs = ({ defaultValue, onValueChange, children, className }: TabsProps) => {
  const [selectedTab, setSelectedTab] = React.useState(defaultValue)

  const handleTabChange = (value: string) => {
    setSelectedTab(value)
    onValueChange?.(value)
  }

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab: handleTabChange }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  )
}

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-[0.375rem] bg-fill p-[0.25rem] shadow-inset-tertiary",
      className
    )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    if (!context) throw new Error("TabsTrigger must be used within Tabs")
    const { selectedTab, setSelectedTab } = context

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={selectedTab === value}
        data-state={selectedTab === value ? "active" : "inactive"}
        onClick={() => setSelectedTab(value)}
        className={cn(
          "relative inline-flex items-center justify-center whitespace-nowrap rounded-[0.125rem] px-[0.875rem] pt-[0.33rem] pb-[0.305rem]",
          "b_mono text-secondary-color transition-colors",
          "hover:text-primary-color focus-visible:outline-none",
          "data-[state=active]:text-primary-color",
          className
        )}
        {...props}
      >
        {selectedTab === value && (
          <motion.span
            layoutId="bubble"
            className="absolute inset-[0.0625rem] z-0 bg-white rounded-[0.125rem]"
            transition={{ type: "spring", bounce: 0.15, duration: 0.3 }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </button>
    )
  }
)
TabsTrigger.displayName = "TabsTrigger"

export { Tabs, TabsList, TabsTrigger }
