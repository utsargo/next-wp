'use client';
import { useState } from "react";
import GoBackLink from "./go-back-link";
import HomeLink from "./home-link";
import ShareModal from "./share-modal";
import SearchModal from "./search-modal";
import { ShareIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const QuickMenu = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <div className="quick-menu flex max-[767px]:flex-row items-center justify-center h-fit w-fit max-[767px]:w-full max-[767px]:bottom-0 flex-col gap-4 fixed bg-slate-700 p-2 z-[999]">
      <HomeLink />
      <GoBackLink />
      <button
        type="button"
        title="Share"
        onClick={() => setIsShareModalOpen(true)}
        className="bg-slate-950 text-slate-50 p-2 rounded-lg"
      >
        <ShareIcon className="h-5" />
      </button>
      <button
        type="button"
        title="Search"
        onClick={() => setIsSearchModalOpen(true)}
        className="bg-slate-950 text-slate-50 p-2 rounded-lg"
      >
        <MagnifyingGlassIcon className="h-5" />
      </button>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </div>
  );
};

export default QuickMenu;
