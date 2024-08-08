import { getPostList } from "../lib/api";
import { useState } from "react";
import { Taxonomy } from "@/lib/actions";
import siteData from "@/lib/get-sitedata";
interface PageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
}

interface PostNode {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  categories: {
    nodes: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
  author: {
    node: {
      avatar: {
        url: string;
      };
      name: string;
      slug: string;
    };
  };
}

interface Posts {
  pageInfo: PageInfo;
  nodes: PostNode[];
}

interface LoadMoreProps {
  posts: Posts;
  setPosts: (posts: Posts) => void;
  taxonomy?: Taxonomy | null;
}

const LoadMore: React.FC<LoadMoreProps> = ({ posts, setPosts, taxonomy = null }) => {
  const initialButtonText = posts.pageInfo.hasNextPage ? `${siteData.buttons.loadMore}` : `${siteData.buttons.noMorePosts}`;
  const initialButtonDisabled = !posts.pageInfo.hasNextPage;

  const [buttonText, setButtonText] = useState(initialButtonText);
  const [buttonDisabled, setButtonDisabled] = useState(initialButtonDisabled);

  const handleOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setButtonText(`${siteData.buttons.loading}`);
    setButtonDisabled(true);

    try {
      const morePosts = await getPostList(posts.pageInfo.endCursor, taxonomy);

      if (!morePosts) {
        throw new Error("No more posts available or invalid response structure");
      }


      let updatedPosts: Posts = {
        pageInfo: morePosts.pageInfo,
        nodes: [...posts.nodes, ...morePosts.nodes],
      };

      setPosts(updatedPosts);

      if (morePosts.pageInfo.hasNextPage) {
        setButtonText(`${siteData.buttons.loadMore}`);
        setButtonDisabled(false);
      } else {
        setButtonText(`${siteData.buttons.noMorePosts}`);
        setButtonDisabled(true);
      }
    } catch (error) {
      console.error("Error fetching more posts:", error);
      setButtonText("Error loading posts");
      setButtonDisabled(true);
    }
  };

  return (
    <button
      className="load-more font-bold bg-slate-950 text-slate-50 px-4 py-2 hover:bg-slate-800"
      onClick={handleOnClick}
      disabled={buttonDisabled}
    >
      {buttonText}
    </button>
  );
};

export default LoadMore;
