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
        name: "bonnKaBanjara",
        label: "Bonn ka Banjara (بون کا بنجارہ)",
        path: "content/bonn-ka-banjara",
        format: "mdx",

        ui: {
          defaultItem: { 
            locale: "ur",
            date: new Date().toISOString(),
          },
          router: ({ document }) => {
            const slug = document._sys.filename;
            return `/bonn-ka-banjara/${slug}`;
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
            label: "Title (عنوان)", 
            isTitle: true, 
            required: true 
          },
          { 
            type: "datetime", 
            name: "date", 
            label: "Date (تاریخ)", 
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
            label: "Cover Image (سرورق)" 
          },
          { 
            type: "rich-text", 
            name: "body", 
            label: "Body (مواد)", 
            isBody: true,
            templates: [
              {
                name: 'CenterText',
                label: 'Center Aligned Text',
                fields: [
                  {
                    name: 'children',
                    label: 'Content',
                    type: 'rich-text',
                  },
                ],
              },
              {
                name: 'RightAlign',
                label: 'Right Aligned Text',
                fields: [
                  {
                    name: 'children',
                    label: 'Content',
                    type: 'rich-text',
                  },
                ],
              },
              {
                name: 'LeftAlign',
                label: 'Left Aligned Text',
                fields: [
                  {
                    name: 'children',
                    label: 'Content',
                    type: 'rich-text',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "snippet",
        label: "Snippets (مضامین)",
        path: "content/snippets",
        format: "mdx",

        ui: {
          defaultItem: { 
            locale: "ur",
            date: new Date().toISOString(),
          },
          router: ({ document }) => {
            const slug = document._sys.filename;
            return `/snippets/${slug}`;
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
            label: "Title (عنوان)", 
            isTitle: true, 
            required: true 
          },
          { 
            type: "datetime", 
            name: "date", 
            label: "Date (تاریخ)", 
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
            name: "tags", 
            label: "Tags", 
            list: true 
          },
          { 
            type: "image", 
            name: "coverImage", 
            label: "Cover Image (سرورق)" 
          },
          { 
            type: "rich-text", 
            name: "body", 
            label: "Body (مواد)", 
            isBody: true,
            templates: [
              {
                name: 'CenterText',
                label: 'Center Aligned Text',
                fields: [
                  {
                    name: 'children',
                    label: 'Content',
                    type: 'rich-text',
                  },
                ],
              },
              {
                name: 'RightAlign',
                label: 'Right Aligned Text',
                fields: [
                  {
                    name: 'children',
                    label: 'Content',
                    type: 'rich-text',
                  },
                ],
              },
              {
                name: 'LeftAlign',
                label: 'Left Aligned Text',
                fields: [
                  {
                    name: 'children',
                    label: 'Content',
                    type: 'rich-text',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "book",
        label: "Books (کتابیں)",
        path: "content/books",
        format: "mdx",

        ui: {
          defaultItem: { 
            locale: "ur",
            publishDate: new Date().toISOString(),
          },
          router: ({ document }) => {
            const slug = document._sys.filename;
            return `/books/${slug}`;
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
            label: "Title (عنوان)", 
            isTitle: true, 
            required: true 
          },
          { 
            type: "image", 
            name: "coverImage", 
            label: "Cover Image (سرورق)", 
            required: true 
          },
          { 
            type: "datetime", 
            name: "publishDate", 
            label: "Publish Date (تاریخ اشاعت)", 
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
            name: "publisher", 
            label: "Publisher (ناشر)" 
          },
          { 
            type: "string", 
            name: "quotes", 
            label: "Quotes (اقتباسات)", 
            list: true 
          },
          { 
            type: "rich-text", 
            name: "body", 
            label: "Description (تفصیل)", 
            isBody: true,
            templates: [
              {
                name: 'CenterText',
                label: 'Center Aligned Text',
                fields: [
                  {
                    name: 'children',
                    label: 'Content',
                    type: 'rich-text',
                  },
                ],
              },
              {
                name: 'RightAlign',
                label: 'Right Aligned Text',
                fields: [
                  {
                    name: 'children',
                    label: 'Content',
                    type: 'rich-text',
                  },
                ],
              },
              {
                name: 'LeftAlign',
                label: 'Left Aligned Text',
                fields: [
                  {
                    name: 'children',
                    label: 'Content',
                    type: 'rich-text',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "gallery",
        label: "Gallery",
        path: "content/gallery",
        format: "mdx",

        ui: {
          defaultItem: { 
            date: new Date().toISOString(),
          },
          router: ({ document }) => {
            const slug = document._sys.filename;
            return `/gallery/${slug}`;
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
            label: "Title (عنوان)", 
            isTitle: true, 
            required: true 
          },
          { 
            type: "image", 
            name: "image", 
            label: "Image (تصویر)", 
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
            name: "caption", 
            label: "Caption (تفصیل)" 
          },
          { 
            type: "string", 
            name: "location", 
            label: "Location (مقام)" 
          },
        ],
      },
    ],
  },
});