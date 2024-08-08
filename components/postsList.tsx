'use client';

import Link from "next/link";
import LoadMore from "./load-more";
import { useState } from "react";
import Image from "next/image";
import { PostNode } from "@/lib/actions";
import siteData from "@/lib/get-sitedata";

interface PageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
}



interface Posts {
  pageInfo: PageInfo;
  nodes: PostNode[];
}

interface PostListProps {
  initialPosts: Posts;
  taxonomy?: { key: string; value: string } | null; // Add taxonomy prop
}

export default function PostList({ initialPosts, taxonomy = null }: PostListProps) {
  const [posts, setPosts] = useState<Posts>(initialPosts);

  return (
    <div className="bg-slate-100 p-2">
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {posts.nodes.map((post: PostNode) => (
          <li key={post.id} className="flex flex-col gap-2 rounded-md shadow-md justify-between bg-slate-50">
            {post.featuredImage?.node?.sourceUrl ? (
              <Image
                src={post.featuredImage.node.sourceUrl ?? ""}
                width={400}
                height={300}
                alt={post.title || "Post Image"}
                className="aspect-[4/3] object-cover object-center w-full"
                loading="lazy"
              />
            ) : null}
            <div className="p-4 flex flex-col items-start justify-around gap-2">
              <h2 className="text-xl">
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-sm italic font-bold">
                <Link href={`/authors/${post.author.node.slug}`}>{post.author.node.name}</Link>
                </p>
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
              className="bg-slate-950 text-slate-50 hover:bg-slate-800 transition-all duration-300 rounded-sm px-4 py-2 mx-auto my-2 mb-4"
            >
              {siteData.buttons.readMore}
            </Link>
          </li>
        ))}
      </ul>
      <div className="py-4 text-center">
        <LoadMore posts={posts} setPosts={setPosts} taxonomy={taxonomy} />
      </div>
    </div>
  );
}
