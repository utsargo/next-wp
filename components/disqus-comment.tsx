"use client";
import { DiscussionEmbed } from "disqus-react";
import type { Post } from "@/lib/actions";

const DisqusComment = ({post}: {post: Post}) => {
    const pageUrl = typeof window !== "undefined" ? window.location.href : "";
    const disqusShortname = "thoughtsmate"; // Replace with your Disqus shortname
    const disqusConfig = {
        url: pageUrl,
        identifier: post.id,
        title: post.title,
    };
    
    return (
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    );
    }

export default DisqusComment;
