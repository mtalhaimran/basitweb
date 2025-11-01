import { createClient } from '@tinacms/graphql';

const apiURL =
  process.env.TINA_CONTENT_API_URL ||
  process.env.NEXT_PUBLIC_TINA_API_URL ||
  'http://localhost:4001/graphql';

const token = process.env.TINA_TOKEN; // optional for local dev

export const tinaClient = createClient({
  url: apiURL,
  token,
});

export type TinaPost = {
  _sys: { filename: string };
  title?: string;
  date?: string;
  categories?: string[];
  tags?: string[];
  coverImage?: string;
  body?: any;
  locale?: string;
};
