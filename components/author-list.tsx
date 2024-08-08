'use client';

import { useState, useEffect } from "react";
import { Author } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import siteData from "@/lib/get-sitedata";
interface AuthorListProps {
  authors: Author[];
}

const AuthorList = ({ authors }: AuthorListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAuthors, setFilteredAuthors] = useState(authors);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    setFilteredAuthors(
      authors.filter(
        author => 
          author.name.toLowerCase().includes(query) || 
          author.slug.toLowerCase().includes(query)
      )
    );
  }, [searchQuery, authors]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder={siteData.placeholders.searchAutors}
        className="mb-4 p-2 border rounded w-full"
      />
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredAuthors.map((author: Author) => (
          <li key={author.id}>
            <Link href={`/authors/${author.slug}`}>
              <div className="author-card flex items-center gap-3 bg-slate-500 rounded-md shadow-sm p-2">
                <Image
                  src={author.avatar?.url}
                  width={50}
                  height={50}
                  alt={author.name}
                  className="aspect-square object-cover object-center rounded-full"
                  loading="lazy"
                />
                <p className="text-xl text-slate-50">{author.name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AuthorList;
