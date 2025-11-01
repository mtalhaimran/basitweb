import { tinaClient, TinaPost } from './tinaClient';

const POSTS_QUERY = `#graphql
  query ListPosts($first: Int = 100) {
    postConnection: postConnection(first: $first) {
      edges { node { _sys { filename } title date tags categories coverImage locale } }
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

export async function listPosts(locale: string = 'ur') {
  const res = await tinaClient.request(POSTS_QUERY, { variables: { first: 100 } });
  let items: TinaPost[] = res?.postConnection?.edges?.map((e: any) => e.node) ?? [];
  // Urdu-first: if a post has no locale, treat as Urdu
  if (locale) {
    items = items.filter((p: any) => p.locale ? p.locale === locale : locale === 'ur');
  }
  items.sort((a: any, b: any) => (b.date || '').localeCompare(a.date || ''));
  return items;
}

export async function getPostBySlug(slug: string) {
  const relativePath = `${slug}.md`;
  const res = await tinaClient.request(POST_QUERY, { variables: { relativePath } });
  return res?.post as TinaPost | undefined;
}
