import { Author, Category, Post } from "@/lib/actions";
import { fetchAuthors, fetchCategories, getPostList } from "@/lib/api";
import siteData from "@/lib/get-sitedata";

const sitemap = async () => {
    const siteUrl = siteData.siteInfo.url;
    const postsData = await getPostList(null, null, 1000);
  const paths = postsData.nodes?.map((post: Post) => {
    return {
        url: `${siteUrl}/posts/${post.slug}`,
        lastModified: new Date(post.date).toISOString(),
    }
  })

  const categoryData = await fetchCategories();
  const categoryPaths = categoryData.map ((category: Category) => {
    return {
        url: `${siteUrl}/categories/${category.slug}`,
        lastModified: new Date().toISOString(),
    }
  })
  
  const authorData = await fetchAuthors();
  const authorPaths = authorData.map ((author: Author) => {
    return {
        url: `${siteUrl}/authors/${author.slug}`,
        lastModified: new Date().toISOString(),
    }
  })

return [
    {
        url: `${siteUrl}/`,
        lastModified: new Date().toISOString(),
    },
    {
        url: `${siteUrl}/authors`,
        lastModified: new Date().toISOString(),
    },
    {
        url: `${siteUrl}/categories`,
        lastModified: new Date().toISOString(),
    },
   
    {
        url: `${siteUrl}/contact`,
        lastModified: new Date().toISOString(),
    },
    {
        url: `${siteUrl}/privacy-policy`,
        lastModified: new Date().toISOString(),
    },
    ...paths,
    ...categoryPaths,
    ...authorPaths,
]
}
export default sitemap;