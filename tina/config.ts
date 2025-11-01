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
  // Use env var if present, fall back to local dev server
  contentApiUrlOverride:
    process.env.TINA_CONTENT_API_URL || "http://localhost:4001/graphql",

  /** Where Tina will build its admin UI */
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  /** Media store + path */
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

        // UI niceties for editors
        ui: {
          // Default all new content to Urdu
          defaultItem: { locale: "ur" },
          // Make Tina’s “View on site” button point to /posts/[slug]
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

          // Optional, keep if you use them
          { type: "string", name: "categories", label: "Categories", list: true },
          { type: "string", name: "tags", label: "Tags", list: true },

          // Optional cover
          { type: "image", name: "coverImage", label: "Cover Image" },

          // New: locale (Urdu-first)
          {
            type: "string",
            name: "locale",
            label: "Locale",
            options: ["ur", "en"],
            ui: { component: "select" },
            required: false
          },

          // Main body
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
    ],
  },
});
