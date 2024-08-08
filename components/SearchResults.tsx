'use client';
import { useState, useEffect } from 'react';
import { getPostList } from '@/lib/api';
import type { PostNode } from '@/lib/actions';
import Link from 'next/link';
import Image from 'next/image';
import siteData from '@/lib/get-sitedata';

interface SearchResultsProps {
  query: string;
}

const fetchSearchResults = async (query: string) => {
  
  const result = await getPostList(null, { key: "search", value: query });
  return result?.nodes || [];
};

const SearchResults = ({ query }: SearchResultsProps) => {
  const [results, setResults] = useState<PostNode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const data = await fetchSearchResults(query);
      setResults(data);
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="loader" /> {/* Add a spinner or loading animation here */}
        <p>{siteData.messages.searching}</p>
      </div>
    );
  }

  if (!results.length) {
    return <div>{siteData.messages.noPosts}</div>;
  }

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {results.map((post) => (
        <li key={post.id} className="flex flex-col gap-2 rounded-md shadow-md justify-between">
          {post.featuredImage?.node?.sourceUrl && (
            <Image
              priority
              src={post.featuredImage.node.sourceUrl}
              width={400}
              height={300}
              alt={post.title || "Post Image"}
              className="aspect-[4/3] object-cover object-center"
            />
          )}
          <div className="p-4 flex flex-col items-start justify-around gap-2">
            <h2 className="text-xl">
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <div className="categories flex flex-row flex-wrap gap-2">
              {post.categories?.nodes.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="bg-slate-950 text-slate-50 hover:bg-slate-800 transition-all duration- rounded-lg px-2 py-1 text-sm"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </div>
          <Link
            href={`/posts/${post.slug}`}
            className="bg-slate-950 text-slate-50 hover:bg-slate-800 transition-all duration-300 rounded-sm px-4 py-2 mx-auto my-2"
          >
            {siteData.buttons.readMore}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
