import type { AuthorData, CategoryData, Taxonomy, Author, Category } from "./actions";

export const fetchData = async (query: string, variables?: any) => {
  try {
    

    const response = await fetch(`${process.env.NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });
    
    // Handle response...
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("Error in fetchData:", error);
    throw error;
  }
};


export const fetchPostBySlug = async (slug: string) => {
    const encodedSlug = encodeURIComponent(slug);
    const query = `
      query ($slug: String!) {
        postBy(slug: $slug) {
          id
          content
          title
          author {
            node {
              name
              slug
              avatar {
          url
        }
            }
          }
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            nodes {
              name
              id
              slug
            }
          }
        }
      }
    `;
  
    const variables = { slug: encodedSlug };
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });
  
      const result = await response.json();
      return result.data.postBy;
    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  };

//Categories

// /lib/api.ts
export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${process.env.WP_GRAPHQL_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        {
          categories {
            nodes {
              id
              name
              slug
              count
            }
          }
        }
      `,
    }),
  });
  const { data } = await response.json();
  const filteredCategories = data.categories.nodes.filter(
    (category: Category) => category.count > 0 && category.slug !== 'uncategorized'
  );

  return filteredCategories;
};




export const fetchPostsByCategory = async (slug: string): Promise<CategoryData> => {
    const query = `
      query GetPostsByCategory($slug: ID!) {
        category(id: $slug, idType: SLUG) {
          name
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
      }
    `;
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables: { slug } }),
      });
  
      const data = await response.json();
      const category = data.data.category;
      const posts = category.posts.nodes;
      return {
        name: category.name,
        posts,
      };
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      return {
        name: '',
        posts: [],
      };
    }
  };

//Authors
// /lib/api.ts


export const fetchAuthors = async (): Promise<Author[]> => {
  try {
    const response = await fetch(`${process.env.WP_GRAPHQL_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query getAuthors {
            users(where: {hasPublishedPosts: POST}, first: 1000) {
              nodes {
                id
                name
                slug
                avatar {
                  url
                }
              }
            }
          }
        `,
      }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return [];
    }
    return data.data.users.nodes;
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
};


export const fetchAuthorBySlug = async (slug: string): Promise<AuthorData> => {
  const query = `
  query getAuthorBySlug ($slug: ID!) {
  user(id: $slug, idType: SLUG) {
    avatar {
      url
    }
    name
    description
  }
}
`

try {
const response = await fetch(`${process.env.NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT}`, {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
},
body: JSON.stringify({ query, variables: { slug } }),
});

const data = await response.json();

if (data.errors) {
console.error('GraphQL errors:', data.errors);
return null;
}
const authorData = data.data.user;

return authorData;
} catch (error) {
console.error('Error fetching posts:', error);
return null;
}
}

export const getPostList = async (endCursor: string | null | undefined, taxonomy: Taxonomy | null, first: number = 10) => {
  let condition = `first: ${first}, where: {orderby: {field: DATE, order: DESC}}`;

  if (endCursor) {
    condition = `after: "${endCursor}", ` + condition;
  }
  if (taxonomy) {
    const taxonomyCondition = `${taxonomy.key}: "${taxonomy.value}"`;
    condition = condition.replace(
      'orderby: {field: DATE, order: DESC}',
      `orderby: {field: DATE, order: DESC}, ${taxonomyCondition}`
    );
  }

  const query = `
    query getAllPosts {
        posts(${condition}) {
            pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
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
    }`;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return null;
    }
    return data.data.posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return null;
  }
};
