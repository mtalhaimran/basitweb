export const dynamic = 'force-static';

export default async function EnHomePage() {
  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="container mx-auto px-4 py-12" dir="ltr">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-ink">
            Abdul Basit Zafar
          </h1>
          <p className="text-2xl text-ink-muted mb-8">
            Writer and Storyteller
          </p>
          <p className="text-lg leading-relaxed text-ink mb-12">
            Based in Bonn, Germany, I explore the intersection of technology, culture, and human experience. My writing bridges the digital and literary worlds.
          </p>

          {/* Milestones */}
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4">
              <span className="text-brand font-bold">2018</span>
              <span className="text-ink">The Journey to Germany Began.</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-brand font-bold">2021</span>
              <span className="text-ink">Published the First Novel.</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-brand font-bold">2024</span>
              <span className="text-ink">Launched the Bonn ka Banjara Series.</span>
            </div>
          </div>

          {/* Quote */}
          <blockquote className="border-l-4 pl-6 border-brand py-2 mb-12">
            <p className="text-xl italic text-ink-muted">
              "Every story is a journey, and every word is a step."
            </p>
          </blockquote>

          {/* CTA */}
          <div className="flex gap-4">
            <a 
              href="/en/posts" 
              className="inline-block rounded-xl border-2 border-brand px-6 py-3 text-brand hover:bg-brand hover:text-white transition-colors font-medium"
            >
              English Posts
            </a>
            <a 
              href="/" 
              className="inline-block rounded-xl border-2 border-ink-muted px-6 py-3 text-ink-muted hover:bg-ink-muted hover:text-white transition-colors font-medium"
            >
              View Urdu Site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
