# MDX Text Alignment Components - Editor Guide

## ✅ MDX Format Enabled

The TinaCMS collections are now configured to use **MDX format**, which fully supports custom text alignment components. Changes you make in the TinaCMS editor will now be properly saved to `.mdx` files.

## Overview
This guide explains how to use custom text alignment components in the TinaCMS rich-text editor for Snippets, Bonn ka Banjara posts, and Books.

## How to Access the Editor

**Important**: Content editing is done through the **TinaCMS Admin Panel**, not through visual editing on the live pages.

### To Edit Content:
1. Navigate to `/admin` in your browser (e.g., `http://localhost:3000/admin`)
2. You'll be redirected to the TinaCMS admin interface
3. Select the collection you want to edit:
   - **Snippets (مضامین)** - for snippet posts
   - **Bonn ka Banjara (بون کا بنجارہ)** - for Bonn ka Banjara posts
   - **Books (کتابیں)** - for book descriptions
4. Click on an existing post to edit it, or create a new one

### Note on Visual Editing
The current implementation uses the **TinaCMS Admin Panel** for editing. The alignment components work within the admin panel's rich-text editor, not through on-page visual editing. If you try to edit directly on the published pages (e.g., `/snippets/[slug]`), you'll see a message that there's nothing to edit - this is expected behavior. All content editing should be done through the `/admin` panel.

## Available Components

### 1. CenterText - Center Aligned Text
Centers text horizontally with automatic text direction detection.

**Use case**: Center important headings, quotes, or special content

**Properties**:
- Text alignment: Center
- Direction: Auto (adapts to content)

### 2. RightAlign - Right Aligned Text
Aligns text to the right, optimized for RTL languages like Urdu.

**Use case**: Urdu poetry, quotes, or any RTL text that needs right alignment

**Properties**:
- Text alignment: Right
- Direction: RTL (right-to-left)

### 3. LeftAlign - Left Aligned Text
Aligns text to the left, optimized for LTR languages like English.

**Use case**: English quotes, code snippets, or any LTR text that needs left alignment

**Properties**:
- Text alignment: Left
- Direction: LTR (left-to-right)

## How to Use in TinaCMS Admin Editor

> **Note**: The alignment components are available in the **Visual Editor** mode within the TinaCMS admin panel. If you're in the raw text/markdown editor mode, you won't see the "+" button.

1. **Open the TinaCMS Admin Panel**
   - Navigate to `/admin` in your browser (the main editing interface)
   - Select either "Snippets", "Bonn ka Banjara", or "Books" collection
   - Create a new post or edit an existing one

2. **Switch to Visual Editor Mode** (if not already in it)
   - Look for an editor mode toggle (usually in the editor toolbar)
   - Switch from "Raw/Markdown" mode to "Visual/WYSIWYG" mode
   - The alignment component templates only work in visual editor mode

3. **Add Alignment Component**
   - In the rich-text Body field, click the "+" button to add a component
   - Select one of the alignment options:
     - "Center Aligned Text"
     - "Right Aligned Text"
     - "Left Aligned Text"

4. **Add Content**
   - Type or paste your content inside the component
   - You can use rich-text formatting (bold, italic, links, etc.) within the component
   - Nested content is fully supported

5. **Save**
   - Click the **Save** button
   - Changes will be written to `.mdx` files in the content directory
   - Refresh the published page to see your aligned text

## Troubleshooting

### I don't see the "+" button

**Solution**: Make sure you're:
1. In the **TinaCMS Admin Panel** at `/admin` (not on the published page)
2. In the **Visual Editor** mode within the admin panel, not the raw text/markdown editor mode
3. Looking at the "Body (مواد)" field - the alignment components only work in rich-text fields

The alignment component templates are only available in the visual editor within the admin panel.

### I see "Looks like there's nothing to edit on this page" when clicking on posts

**Solution**: This is expected behavior. The published pages (like `/snippets/[slug]` or `/bonn-ka-banjara/[slug]`) are not configured for visual editing. You need to edit content through the **TinaCMS Admin Panel** at `/admin`. The message you're seeing indicates that on-page visual editing is not enabled for these pages - all editing happens in the admin panel.

### The templates don't appear in the list

**Solution**: 
1. Ensure you've saved the TinaCMS configuration changes
2. Restart the TinaCMS development server (`npm run dev`)
3. Clear your browser cache and refresh the page
4. Verify you're editing a "Snippet", "Bonn ka Banjara", or "Books" post (templates are only configured for these collections)

### Changes aren't saving

**Solution**:
1. Make sure you're running `npm run dev` (not just `next dev`)
2. Check the terminal for any errors when you click Save
3. Verify the `.mdx` file was created/updated in the content directory
4. If using existing `.md` files, they will be kept as-is until you edit and save them (which creates a new `.mdx` file)

## Examples

### Example 1: Center-aligned Heading
```
[CenterText Component]
  # Welcome to My Blog
  This is centered content
```

### Example 2: Right-aligned Urdu Text
```
[RightAlign Component]
  یہ اردو متن دائیں طرف ہے
  یہ شاعری کے لیے بہترین ہے
```

### Example 3: Left-aligned English Quote
```
[LeftAlign Component]
  "The only way to do great work is to love what you do."
  - Steve Jobs
```

## Tips

1. **Mixing Languages**: Use CenterText with `dir="auto"` when mixing languages in the same section
2. **Consistency**: Maintain consistent alignment patterns throughout your content
3. **Mobile Responsiveness**: All alignment components are mobile-responsive
4. **Nested Content**: You can nest paragraphs, headings, and other rich-text elements within alignment components

## Technical Details

The alignment components are implemented as MDX components that:
- Use Tailwind CSS classes for styling
- Set appropriate `dir` attributes for proper text direction
- Are fully compatible with the existing rich-text system
- Work seamlessly with Urdu and English content

## Support

For issues or questions about using these components, please refer to the repository documentation or open an issue on GitHub.
