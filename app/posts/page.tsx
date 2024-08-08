import Container from "@/components/container";
import PostList from "@/components/postsList";
import { getPostList } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ThoughtsMate | All Posts",
  description: "Companion of your thoughts",
  openGraph: {
    images: [
      {
        url: "/images/og-logo.png",
        width: 400,
        height: 400,
        alt: "ThoughtsMate",
      },
    ],
  },
};


export default async function BlogPosts() {
  const initialPosts = await getPostList(null, null);
  return (
    <Container className="py-8">
        <PostList initialPosts={initialPosts} />
    </Container>
  );
}
