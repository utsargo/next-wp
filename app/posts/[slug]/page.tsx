import { fetchPostBySlug } from "@/lib/api";
import Container from "@/components/container";
import { isImageUrlValid } from "@/lib/utils/validate-image";
import { JSDOM } from "jsdom";
import DisqusComment from "@/components/disqus-comment";
import type { Metadata } from "next";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import type { Category } from "@/lib/actions";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export const generateMetadata = async ({ params }: BlogPostProps): Promise<Metadata> => {
  const { slug } = params;
  const post = await fetchPostBySlug(slug);
  const coverImage = post.featuredImage?.node?.sourceUrl;

  return {
    title: `Thoughtsmate | ${post.title}`,
    description: post.title,
    openGraph: {
      title: `Thoughtsmate | ${post.title}`,
      description: post.title,
      type: "website",
      url: `/posts/${slug}`,
      images: coverImage ? [
        { url: coverImage, type: "image/png" },
        { url: coverImage, type: "image/jpeg" },
        { url: coverImage, type: "image/webp" },
      ] : undefined,
    },
  };
}

const BlogPost = async ({ params }: BlogPostProps) => {
  const { slug } = params;
  const post = await fetchPostBySlug(slug);

  // Function to validate and clean up image URLs in content
  const cleanUpContent = async (content: string) => {
    const dom = new JSDOM(content);
    const { document } = dom.window;
    const images = Array.from(document.querySelectorAll('img')); // Convert NodeList to array

    for (const img of images) {
      const src = img.getAttribute('src');
      const isValid = src ? await isImageUrlValid(src) : false;
      if (!isValid) {
        img.remove();
      }
    }

    return document.body.innerHTML;
  };

  const cleanedContent = await cleanUpContent(post.content);

  const coverImage = post.featuredImage?.node?.sourceUrl;
  
  return (
    <>
      <section
          className="post-cover w-full max-w-[100vw] flex flex-col items-center justify-center min-h-[50vh] h-[50vh] bg-no-repeat bg-cover bg-center p-0"
          style={{ backgroundImage: coverImage ? `url(${coverImage})` : 'none' }}
        >
          
          <div className="w-full h-full min-h-[50vh] flex flex-col items-start justify-center bg-slate-900/40">
          <Container>
            <div className="bg-slate-950/50 p-10 max-sm:p-4 rounded-sm flex flex-col gap-2 min-w-[80%] md:min-w-[60%]">
              <h1 className="text-4xl max-sm:text-3xl text-slate-50">{post.title}</h1>
              <div className="post-author flex items-center gap-2">
                {post.author?.node?.avatar?.url ? (
                  <Image
                    src={post.author.node.avatar.url}
                    width={48}
                    height={48}
                    alt={post.author.node.name}
                    className="rounded-full"
                    loading="lazy"
                  />

                ) : null}
                {post.author?.node?.name ? (
                <p className="text-xl text-slate-50"><Link href={`/authors/${post.author.node.slug}`}>{post.author.node.name}</Link></p>
              ) : null}
              </div>
              <p className="date text-md text-slate-50">
              {format(new Date(post.date), "MMMM dd, yyyy")}
              
            </p>
            <div className="categories flex flex-row flex-wrap gap-2">
              {post.categories?.nodes.map((category: Category) => (
                <Link key={category.id} href={`/categories/${category.slug}`} className="bg-slate-950 text-slate-50 hover:bg-slate-800 transition-all duration- rounded-lg px-2 py-1 text-sm">{category.name}</Link>
              ))}
            </div>
            </div>
            </Container>
          </div>
          
        </section>
        <Container className="py-8 flex flex-col items-start">
          <div className="text-[20px] py-4" dangerouslySetInnerHTML={{ __html: cleanedContent }} />
          
          <div className="px-4 w-full">
          <DisqusComment post={post} />
          </div>
          
        </Container>
      
    </>
  );
};

export default BlogPost;
