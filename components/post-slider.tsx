'use client';
import { useEffect, useState } from 'react';
import { getPostList } from "@/lib/api";
import { Swiper, SwiperSlide } from 'swiper/react';
import { PostNode } from "@/lib/actions";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import Image from "next/image";
import Link from "next/link";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Container from './container';
import SliderSkeliton from './slider-skeliton';
import siteData from '@/lib/get-sitedata';
import trimExcerpt from '@/lib/utils/trim-excerpt';

interface PostSliderProps {
    categorySlug: string;
    numberOfPosts: number;
}

const PostSlider = ({ categorySlug, numberOfPosts }: PostSliderProps) => {
  
  const [posts, setPosts] = useState<PostNode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPosts = async () => {
      setLoading(true);
      const postsData = await getPostList(null, { key: "categoryName", value: categorySlug }, numberOfPosts);
      setPosts(postsData.nodes);
      setLoading(false);
    };

    fetchAllPosts();
  }, [categorySlug, numberOfPosts]);
  
  if (loading) {
    return <SliderSkeliton />;
  }

  return (
    <>
      <div className="w-full bg-slate-700 mt-2 px-16 max-[767px]:p-2 md:max-h-[332px] md:h-[332px] max-h-[200px] h-[200px]">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          autoplay={{ delay: 3000 }}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {posts.map((post: PostNode) => (
            <SwiperSlide key={post.id}>
              <div className="w-full post-slide flex flex-col items-center justify-center p-4 max-[767px]:px-2 rounded shadow-md">
                <Container className='w-4/5 max-[767px]:w-full max-[767px]:h-[140px] flex flex-row items-start gap-4'>
                  {post.featuredImage?.node?.sourceUrl && (
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      width={400}
                      height={300}
                      alt={post.title || "Post Image"}
                      className="lg:aspect-[4/3] max-[767px]:aspect-[4/5] md:aspect-[4/5] w-auto object-cover object-top rounded-md h-[300px] max-[767px]:h-[130px]"
                      loading="lazy"
                    />
                  )}
                  <div className="flex flex-col lg:justify-around pb-4 md:justify-start md:gap-2 items-start gap-2 md:max-h-[300px] md:h-[300px] max-[767px]:h-[130px]">
                    <h2 className="lg:text-4xl text-lg md:text-2xl mb-2 md:mb-2 lg:mb-4 text-slate-50">
                      <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <div className='text-slate-50 mb-2 lg:mb-4 max-[640px]:hidden lg:text-xl md:text-lg md:w-[80%]' dangerouslySetInnerHTML={{ __html: trimExcerpt(post.excerpt, 110) }} />
                    <Link
                      href={`/posts/${post.slug}`}
                      className="mt-1 max-[767px]:mt-0 bg-slate-950 text-slate-50 hover:bg-slate-800 transition-all duration-300 rounded-sm px-4 py-2"
                    >
                      {siteData.buttons.readMore}
                    </Link>
                  </div>
                </Container>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default PostSlider;
