import { tinaClient, TinaPost } from './tinaClient';

const POSTS_QUERY = `#graphql
  query ListPosts($first: Int = 100, $locale: String) {
    postConnection(
      first: $first
      filter: { locale: { eq: $locale } }
      sort: "date"
    ) {
      edges { 
        node { 
          _sys { filename } 
          title 
          date 
          tags 
          categories 
          coverImage 
          locale 
        } 
      }
    }
  }
`;

const POST_QUERY = `#graphql
  query GetPost($relativePath: String!) {
    post(relativePath: $relativePath) {
      _sys { filename }
      title
      date
      tags
      categories
      coverImage
      body
      locale
    }
  }
`;

export async function listPosts(locale: string = 'ur'): Promise {
  try {
    const res = await tinaClient.request(POSTS_QUERY, { 
      variables: { 
        first: 100,
        locale: locale 
      } 
    });
    
    let items: TinaPost[] = res?.postConnection?.edges?.map((e: any) => e.node) ?? [];
    
    // Sort by date descending
    items.sort((a: any, b: any) => {
      const dateA = new Date(a.date || 0).getTime();
      const dateB = new Date(b.date || 0).getTime();
      return dateB - dateA;
    });
    
    return items;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise {
  try {
    const relativePath = `${slug}.md`;
    const res = await tinaClient.request(POST_QUERY, { 
      variables: { relativePath } 
    });
    return res?.post as TinaPost | undefined;
  } catch (error) {
    console.error('Error fetching post:', error);
    return undefined;
  }
}