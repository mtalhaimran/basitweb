# MDX Text Alignment Components - Editor Guide

## Overview
This guide explains how to use custom text alignment components in the TinaCMS rich-text editor for Snippets and Bonn ka Banjara posts.

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

## How to Use in TinaCMS Editor

1. **Open the Content Editor**
   - Navigate to the TinaCMS admin panel
   - Select either "Snippets" or "Bonn ka Banjara" collection
   - Create a new post or edit an existing one

2. **Add Alignment Component**
   - In the rich-text Body field, click the "+" button to add a component
   - Select one of the alignment options:
     - "Center Aligned Text"
     - "Right Aligned Text"
     - "Left Aligned Text"

3. **Add Content**
   - Type or paste your content inside the component
   - You can use rich-text formatting (bold, italic, links, etc.) within the component
   - Nested content is fully supported

4. **Preview and Save**
   - Use the preview to see how your alignment looks
   - Save your changes when satisfied

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
