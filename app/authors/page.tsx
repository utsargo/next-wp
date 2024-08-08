// /app/authors/page.tsx
import Container from "@/components/container";
import { Author } from "@/lib/actions";
import { fetchAuthors } from "@/lib/api";
import AuthorList from "@/components/author-list";
import { Metadata } from "next";
import siteData from "@/lib/get-sitedata";

export const revalidate = 60; // Revalidate every 60 seconds
export const metadata: Metadata = {
    title: `${siteData.siteInfo.title} | ${siteData.pageHeadings.authors}`,
    description: siteData.siteInfo.description,
    openGraph: {
      images: [
        {
          url: "/images/og-logo.png",
          width: 400,
          height: 400,
          alt: siteData.siteInfo.title,
        },
      ],
    },
  };
const AuthorIndex = async () => {
  const authors: Author[] = await fetchAuthors();

  return (
    <Container className="py-8 min-h-screen">
      <h1 className="text-4xl mb-4">{siteData.pageHeadings.authors}</h1>
      <AuthorList authors={authors} />
    </Container>
  );
};

export default AuthorIndex;
