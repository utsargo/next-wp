import Container from "@/components/container";
import PostList from "@/components/postsList";
import { Author } from "@/lib/actions";
import { fetchAuthorBySlug, fetchAuthors, getPostList } from "@/lib/api";
import Image from "next/image";
import type { Metadata } from "next";
import siteData from "@/lib/get-sitedata";


interface AuthorPageProps {
    params: {
        slug: string;
    };
}

export const generateStaticParams = async () => {
    const authors = await fetchAuthors();
    return authors.map ((author: Author) => ({
        slug: author.slug,
    }));
}

export const generateMetadata = async ({ params }: AuthorPageProps): Promise<Metadata> =>{
    const { slug } = params;
    
  
    // Fetch the category name based on the slug
    const AuthorData = await fetchAuthorBySlug(slug);
    const authorAvatar = AuthorData?.avatar.url;
  
    return {
      title: `${siteData.siteInfo.title} | ${AuthorData?.name}`,
      description: `Latest posts by ${AuthorData?.name}`,
      openGraph: {
        title: `${siteData.siteInfo.title} | ${AuthorData?.name}`,
        description: `Latest posts from ${AuthorData?.name}`,
        type: "website",
        url: `/authors/${slug}`,
        images: authorAvatar ? [
          { url: authorAvatar, type: "image/png"},
          { url: authorAvatar, type: "image/jpeg"},
          { url: authorAvatar, type: "image/webp"},
        ]:[
            { url: "/images/default-avatar.png", type: "image/png" },
        ]
      },
    };
  } 

const AuthorPage = async ({ params }: AuthorPageProps) => {
    const { slug } = params;
    const AuthorData = await fetchAuthorBySlug(slug);
    const initialPosts = await getPostList(null, { key: "authorName", value: slug });
    const defaultAvatarUrl = "/images/default-avatar.png"
    return(
        <Container className="py-8">
            <div className="author-box p-4 rounded-lg flex flex-col max-[767px]:items-center md:flex-row gap-4 mb-6 bg-slate-100">
            {AuthorData ? (
            <Image
                            src={AuthorData.avatar?.url }
                            width={200}
                            height={200}
                            alt={AuthorData.name}
                            className="aspect-square object-cover object-center rounded-md bg-slate-300 p-[2px] shadow-sm max-[767px]:w-[100px] max-[767px]:rounded-full"
                            loading="eager"
                        />
            ): null}
                <div className="flex flex-col gap-4 max-[767px]:items-center">
                <h1 className="text-4xl font-bold mb-2 md:mb-4 max-[767px]:text-center">{AuthorData?.name}</h1>
                <p className="text-lg">{AuthorData?.description}</p>
                </div>
            </div>
            
            <PostList initialPosts={initialPosts} taxonomy={{ key: "authorName", value: slug }} />
        </Container>
    )

};
export default AuthorPage;