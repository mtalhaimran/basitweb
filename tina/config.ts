import { defineConfig } from "tinacms";

export default defineConfig({
  // whichever branch you keep your content on
  branch:
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main",

  /** ──────────────────────────────
   *  SELF-HOSTED / LOCAL SETTINGS
   *  ────────────────────────────── */
  contentApiUrlOverride: "http://localhost:4001/graphql",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    // keep uploads inside /public/images
    store: { name: "local" },
    publicFolder: "public",
    mediaRoot: "images",
  },

  /** ──────────────────────────────
   *  CONTENT SCHEMA
   *  ────────────────────────────── */
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        format: "md",
        ui: {
          // make Tina’s “View on site” button point to /posts/[slug]
          router: ({ document }) => `/posts/${document._sys.filename}`,
          filename: {
            slugify: (values) =>
              (values?.title || "untitled")
                .toString()
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9\-]/g, ""),
          },
        },
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Date", required: true },
          { type: "string", name: "categories", label: "Categories", list: true },
          { type: "string", name: "tags", label: "Tags", list: true },
          { type: "image", name: "coverImage", label: "Cover Image" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
    ],
  },
});
