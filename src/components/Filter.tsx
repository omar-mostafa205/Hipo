"use client";

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';
import { ArrowUpRightFromSquare } from 'lucide-react';
import Link from 'next/link';

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
        const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
        router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="my-12 flex justify-between max-w-7xl mx-auto">
      <div className="flex gap-6 flex-wrap">
      <Button>
        <Link  href="/" className='flex gap-2'>
          <ArrowUpRightFromSquare />
          Home
          </Link>
        </Button>
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
          defaultValue={searchParams.get('min') || ''}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
          defaultValue={searchParams.get('max') || ''}
        />
        

        
        {/* All Filters - needs implementation */}
        <select
          name="filters"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
          defaultValue={searchParams.get('filters') || ''}
        >
          <option value="">All Filters</option>
          {/* Add more filter options as needed */}
        </select>
      </div>
      
      <div>
        <select
          name="sort"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
          onChange={handleFilterChange}
          defaultValue={searchParams.get('sort') || ''}
        >
          <option value="">Sort By</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="asc lastUpdated">Newest</option>
          <option value="desc lastUpdated">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;