// /components/category-list.tsx
'use client';

import { useState } from "react";
import { Category } from "@/lib/actions";
import Link from "next/link";
import siteData from "@/lib/get-sitedata";

interface CategoryListProps {
  categories: Category[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredCategories(categories.filter(
      category => category.name.toLowerCase().includes(query) ||
        category.slug.toLowerCase().includes(query)
    ));
  };

  return (
    <>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder={siteData.placeholders.searchCategories}
        className="mb-4 p-2 border rounded w-full"
      />
      <ul className="flex items-start justify-center flex-wrap gap-4">
        {filteredCategories.map((category: Category) => (
          <Link key={category.id} href={`/categories/${category.slug}`}>
            <li className="bg-slate-500 text-slate-50 p-4 rounded-lg w-[150px] h-auto flex flex-col items-center justify-center shadow-md hover:shadow-xl hover:scale-110 transition-all ease-in-out duration-300">
              <h2 className="text-xl font-semibold mb-1 transition-all ease-in-out duration-300">
                {category.name}
              </h2>
              <p className="post-count text-lg">
                {category.count}&nbsp;{siteData.texts.postCount}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default CategoryList;
