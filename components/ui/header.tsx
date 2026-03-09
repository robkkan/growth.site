import React, { useEffect, useTransition } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from 'next/navigation';

interface HeaderMainProps {
  headerText: string;
  selectedButton: string;
  handleButtonClick: (buttonName: string) => void;
}

const HeaderMain: React.FC<HeaderMainProps> = ({
  headerText,
  selectedButton,
  handleButtonClick,
}) => {
  const router = useRouter();

  // Prefetch both routes on mount so tab switches are instant
  useEffect(() => {
    router.prefetch('/');
    router.prefetch('/writing');
  }, [router]);

  const handleTabChange = (value: string) => {
    handleButtonClick(value);
  };

  return (
    <header className="w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="font-tiempos-headline">{headerText}</h1>
        <nav className="flex flex-row gap-1">
          <Tabs defaultValue={selectedButton} onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="home">HOME</TabsTrigger>
              <TabsTrigger value="writing">WRITING</TabsTrigger>
            </TabsList>
          </Tabs>
        </nav>
      </div>
    </header>
  );
};

export default HeaderMain;
