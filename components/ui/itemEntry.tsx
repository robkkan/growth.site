import React from 'react';
import Link from 'next/link';

interface ItemEntryProps {
  num: string;
  title: string;
  date: string;
  href: string;
}

const ItemEntry: React.FC<ItemEntryProps> = React.memo(({ num, title, date, href }) => {
  return (
    <Link href={href} className="block w-full">
      <div className="flex items-center py-[0.75rem]">
        <div className="flex items-center gap-1">
          <span className="b_mono text-secondary-color">{num}</span>
          <span className="b_mono text-primary-color">{title}</span>
        </div>
        <div className="flex-grow mx-[0.25rem] mt-[0.625rem]">
          <div className="h-[0.0625rem] bg-tertiary-color opacity-[0.6]"></div>
        </div>
        <span className="b_mono text-secondary-color">{date}</span>
      </div>
    </Link>
  );
});

export default ItemEntry;
