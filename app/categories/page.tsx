// /app/categories/page.tsx
import Container from "@/components/container";
import { fetchCategories } from "@/lib/api";
import CategoryList from "@/components/category-list";
import type { Category } from "@/lib/actions";
import type { Metadata } from "next";
import siteData from "@/lib/get-sitedata";

export const revalidate = 60;
export const metadata: Metadata = {
  title: `${siteData.siteInfo.title} | ${siteData.pageHeadings.categories}`,
  description: "Companion of your thoughts",
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

const CategoryIndex = async () => {
  const categories: Category[] = await fetchCategories();
 

  return (
    <Container className="py-8">
      <h1 className="text-4xl font-bold mb-4">{siteData.pageHeadings.categories}</h1>
      <CategoryList categories={categories} />
    </Container>
  );
};

export default CategoryIndex;
