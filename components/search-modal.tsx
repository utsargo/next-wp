'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/solid";
import siteData from "@/lib/get-sitedata";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    router.push(`/search?query=${searchQuery}`);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white p-4 rounded-md">
        <h2 className="text-2xl mb-4">{siteData.pageHeadings.searchPosts}</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 w-full mb-4"
            placeholder={siteData.placeholders.search}
          />
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-slate-950 text-slate-50 p-2 rounded-lg flex items-center gap-2"
            >
              <MagnifyingGlassIcon className="h-5" /> <span>{siteData.buttons.search}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-slate-50 p-2 rounded-lg ml-2 flex items-center gap-2"
            >
              <XCircleIcon className="h-5" />{siteData.buttons.cancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchModal;
