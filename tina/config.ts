import { defineConfig } from "tinacms";

export default defineConfig({
  branch:
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main",

  contentApiUrlOverride:
    process.env.TINA_CONTENT_API_URL || "http://localhost:4001/graphql",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        format: "md",

        ui: {
          defaultItem: { 
            locale: "ur",
            date: new Date().toISOString(),
          },
          router: ({ document }) => {
            const locale = document.locale || 'ur';
            const slug = document._sys.filename;
            return locale === 'ur' ? `/posts/${slug}` : `/en/posts/${slug}`;
          },
          filename: {
            slugify: (values) =>
              (values?.title || "untitled")
                .toString()
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\u0600-\u06FFa-z0-9\-]/g, ""),
          },
        },

        fields: [
          { 
            type: "string", 
            name: "title", 
            label: "Title", 
            isTitle: true, 
            required: true 
          },
          { 
            type: "datetime", 
            name: "date", 
            label: "Date", 
            required: true,
            ui: {
              dateFormat: 'YYYY-MM-DD',
            }
          },
          { 
            type: "string", 
            name: "locale", 
            label: "Language",
            required: true,
            options: [
              { value: "ur", label: "اردو (Urdu)" },
              { value: "en", label: "English" }
            ],
            ui: { 
              component: "select",
            },
          },
          { 
            type: "string", 
            name: "categories", 
            label: "Categories", 
            list: true 
          },
          { 
            type: "string", 
            name: "tags", 
            label: "Tags", 
            list: true 
          },
          { 
            type: "image", 
            name: "coverImage", 
            label: "Cover Image" 
          },
          { 
            type: "rich-text", 
            name: "body", 
            label: "Body", 
            isBody: true 
          },
        ],
      },
    ],
  },
});