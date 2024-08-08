import { PostNode } from "@/lib/actions";
import { getPostList } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import CategoryName from "./category-name";
import siteData from "@/lib/get-sitedata";
import trimExcerpt from "@/lib/utils/trim-excerpt";

interface CategoryPostsProps {
  categorySlug: string;
  numberOfPosts: number;
  imageLoading?: 'lazy' | 'eager'; // Adding the imageLoading prop
}

const CategoryPosts = async ({ categorySlug, numberOfPosts, imageLoading = 'lazy' }: CategoryPostsProps) => {
  const postsData = await getPostList(null, { key: "categoryName", value: categorySlug }, numberOfPosts);
  const posts = postsData ? postsData.nodes : [];

  if (!posts.length) {
    return <div>{siteData.messages.noPosts}</div>;
  }

  return (
    <div className="p-0 bg-slate-100 mb-4 flex flex-col items-center rounded-md">
        <div className="w-full flex justify-between items-center p-2 bg-slate-600 mb-2 rounded-t-md">
        <Link href={`/categories/${categorySlug}`}><h2 className="text-2xl text-slate-50"><CategoryName categorySlug={categorySlug} /></h2></Link>
        
        <Link href={`/categories/${categorySlug}`} className="bg-slate-950 text-slate-50 hover:bg-slate-800 transition-all duration- rounded-md px-2 py-1 text-sm">{siteData.buttons.more}</Link>
        </div>
        
      <ul className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2 p-4">
        {posts.map((post: PostNode) => (
          <li key={post.id} className="flex flex-col gap-2 rounded-md shadow-md justify-between bg-slate-50">
            {post.featuredImage?.node?.sourceUrl && (
              <Image
                src={post.featuredImage.node.sourceUrl}
                width={400}
                height={300}
                alt={post.title || "Post Image"}
                className="aspect-[4/3] object-cover object-center w-full"
                loading={imageLoading} // Using the imageLoading prop
              />
            )}
            <div className="p-4 flex flex-col items-start justify-around gap-2">
              <h2 className="text-xl">
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-sm italic font-bold"><Link href={`/authors/${post.author.node.slug}`}>{post.author.node.name}</Link></p>
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
              <div dangerouslySetInnerHTML={{ __html: trimExcerpt(post.excerpt, 110) }} />
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
    </div>
  );
};

export default CategoryPosts;
