"use client";

import React from 'react';
import Grid from '@/components/ui/grid';
import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/ui/breadcrumbs';

export default function GrowthPage() {
  const crumbs = [
    { label: 'MY GROWTH', href: '/growth' }
  ];

  return (
    <main
      id="main"
      className="w-full mx-auto"
      style={{
        maxWidth: 'calc(40.7rem + 6rem)',
        padding: '12vh 3rem 4vh',
      }}
    >
      <h1 className="sr-only">My growth</h1>
      {/* Breadcrumbs Section */}
      <div className="mb-[4.8rem]">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      {/* Grid Section */}
      <div className="w-full flex justify-center mx-auto">
        <motion.div
          layoutId="expandingGrid"
          className="w-full"
          initial={{ 
            maxWidth: '29.4375rem',
            aspectRatio: '29.4375 / 21.3125',
          }}
          animate={{ 
            maxWidth: '40.6875rem',
            aspectRatio: '40.6875 / 32.5625',
          }}
          transition={{ 
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <motion.div 
            layoutId="gridInner"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%'
            }}
          >
            <Grid rows={8} cols={10} />
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
