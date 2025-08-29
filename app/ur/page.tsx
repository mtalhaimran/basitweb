```diff
--- a/app/ur/page.tsx
+++ b/app/ur/page.tsx
@@ -27,7 +27,7 @@
       <script
         type="application/ld+json"
         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
       />
       
-      <div className="min-h-screen" lang="ur" dir="rtl">
-        <Header lang="ur" />
+      <div className="min-h-screen"> {/* Removed lang/dir as it's now in root layout */}
+        <Header />
         <main id="main-content">
           <PortfolioGrid lang="ur" />
         </main>
```