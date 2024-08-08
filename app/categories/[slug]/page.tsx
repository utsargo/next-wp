import type { Category } from "@/lib/actions";
import { fetchCategories, getPostList } from "@/lib/api";
import Container from "@/components/container";
import PostList from "@/components/postsList";
import type { Metadata } from "next";
import siteData from "@/lib/get-sitedata";

interface CategoryPageProps {
  params: { 
    slug: string;
  };
}


// Fetch all categories to generate static paths
export async function generateStaticParams() {
  const categories = await fetchCategories();
  return categories.map((category: Category) => ({
    slug: category.slug,
  }));
}
// Metadata
export const generateMetadata = async ({ params }: CategoryPageProps): Promise<Metadata> =>{
  const { slug } = params;
  

  // Fetch the category name based on the slug
  const categories = await fetchCategories();
  const category = categories.find((cat: Category) => cat.slug === slug);
  const name = category ? category.name : "Category";

  return {
    title: `${siteData.siteInfo.title} | ${name}`,
    description: `Latest posts from ${name}`,
    openGraph: {
      title: `${siteData.siteInfo.title} | $${name}`,
      description: `Latest posts from ${name}`,
      type: "website",
      url: `/categories/${slug}`,
      images: [
        { url: "/images/og-logo.png", type: "image/png" },
        
      ]
    },
  };
} 
const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = params;
  

  // Fetch the category name based on the slug
  const categories = await fetchCategories();
  const category = categories.find((cat: Category) => cat.slug === slug);
  const name = category ? category.name : "Category";
  // Fetch initial posts for the category
  const initialPosts = await getPostList(null, { key: "categoryName", value: slug }); // Use correct key for category filtering

  return (
    <>
      
      <Container className="py-8">
      <div className="w-full flex justify-between items-center p-2 bg-slate-600 mb-0 rounded-t-md"><h1 className="text-4xl text-slate-50 font-bold">{name}</h1></div>
        
        <PostList initialPosts={initialPosts} taxonomy={{ key: "categoryName", value: slug }} /> {/* Use correct taxonomy key */}
      </Container>
    </>
  );
};

export default CategoryPage;
