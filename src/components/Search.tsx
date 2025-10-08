/* eslint-disable react-hooks/rules-of-hooks */
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

export const SearchForm = () => {
  const [search, setSearch] = React.useState("");
    const router = useRouter();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
        if(search.trim() === '') return 
    router.push('/list?search=' + search.trim());
  }

  return (
    <form className="relative mb-6" onSubmit={handleSubmit}>
        <Button className="cursor-pointer">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </Button>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </form>
  );
};
