import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type Post = {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    slug: string;
    author: {
        node: {
            avatar: {
                url: string;
            } | null;
            slug: string;
            name: string;
        } | null;
    } | null;
    featuredImage: {
        node: {
            sourceUrl: string | StaticImport;
        } | null;
    } | null;
    categories: {
        nodes: {
            id: string;
            name: string;
            slug: string;
        }[];
    } | null;
};

export const PostsQuery = `
query Posts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
        pageInfo {
            endCursor
            hasNextPage
        }
        nodes {
            id
            title
            date
            slug
            excerpt
            featuredImage {
                node {
                    sourceUrl
                }
            }
            categories {
                nodes {
                    id
                    name
                    slug
                }
            }
            author {
                node {
                    avatar {
                        url
                    }
                    name
                    slug
                }
            }
        }
    }
}
`;



export const AllPostsQuery = `
    query Posts(first: 1000) {
        posts {
            nodes {
                id
                title
                date
                slug
                excerpt
                featuredImage {
                    node {
                        sourceUrl
                    }
                }
                categories {
                    nodes {
                        id
                        name
                        slug
                    }
                }
                author {
                    node {
                        name
                    }
                }
                
            }
        }
    }
`;
export interface Taxonomy {
    key: string;
    value: string;
  }

export type CategoryData = {
    name: string;
    posts: Post[];
  };

export type Category = {
    id: string;
    name: string;
    slug: string;
    count: number;
    };
export type Author = {
    id: string;
    name: string;
    slug: string;
    avatar: {
        url: string;
    };
    };

export type AuthorData = {
    name: string;
    description: string;
    avatar: {
        url: string;
    };
}|null;
export interface PostNode {
        id: string;
        title: string;
        slug: string;
        excerpt: string;
        // date: string;
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

      interface Logo {
        src: string;
        alt: string;
      }
      
      interface MenuItem {
        href: string;
        linkText: string;
      }
      
      interface Buttons {
        readMore: string;
        more: string;
        contactSubmit: string;
        loading: string;
        loadMore: string;
        noMorePosts: string;
        search: string;
        cancel: string;
      }
      
      interface Messages {
        noPosts: string;
        searching: string;
      }
      
      interface Placeholders {
        search: string;
        name: string;
        email: string;
        message: string;
        searchAutors: string;
        searchCategories: string;
      }
      
      interface PageHeadings {
        contact: string;
        categories: string;
        authors: string;
        searchResults: string;
        searchPosts: string;
      }
      
      interface SiteInfo {
        url: string;
        title: string;
        description: string;
        email: string;
        contactFormLink: string;
      }
      
      interface SiteTexts {
        postCount: string;
      }
      
export interface SiteData {
    logo: Logo;
    siteInfo: SiteInfo;
    menuItems: MenuItem[];
    buttons: Buttons;
    messages: Messages;
    placeholders: Placeholders;
    pageHeadings: PageHeadings;
    texts: SiteTexts;
  }