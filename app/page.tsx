import CategoryPosts from "@/components/category-section";
import Container from "@/components/container";
import PostSlider from "@/components/post-slider";

export default async function Home() {
  return (
    <>
    <div className="w-full p-0 m-0 md:block">
      <PostSlider categorySlug="et" numberOfPosts={5} />
    </div>
    
    <Container className="py-8">
      <CategoryPosts categorySlug="molestiae" numberOfPosts={4} imageLoading="eager"/>
      <CategoryPosts categorySlug="qui" numberOfPosts={4} />
      <CategoryPosts categorySlug="similique" numberOfPosts={4} />
      <CategoryPosts categorySlug="voluptatem" numberOfPosts={4} />
      <CategoryPosts categorySlug="et" numberOfPosts={4} />
    </Container>
    </>
    
  );
}
