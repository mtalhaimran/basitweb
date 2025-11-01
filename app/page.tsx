export const dynamic = 'force-static';

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              The best way to track
              <br />
              user feedback
            </h1>
            
            {/* Sub-headline */}
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Noora helps you build better products by letting you centralize, 
              and act on, user feedback.
            </p>
            
            {/* CTA Button */}
            <div className="pt-4">
              <a 
                href="#get-started" 
                className="inline-block px-8 py-4 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Get started for free
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <p className="text-center text-sm text-gray-500 mb-8 uppercase tracking-wider">
            Trusted by the world&apos;s best product teams
          </p>
          
          {/* Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-50">
            <div className="w-32 h-12 bg-gray-800 rounded flex items-center justify-center">
              <span className="text-gray-600 font-semibold">Company</span>
            </div>
            <div className="w-32 h-12 bg-gray-800 rounded flex items-center justify-center">
              <span className="text-gray-600 font-semibold">Brand</span>
            </div>
            <div className="w-32 h-12 bg-gray-800 rounded flex items-center justify-center">
              <span className="text-gray-600 font-semibold">Studio</span>
            </div>
            <div className="w-32 h-12 bg-gray-800 rounded flex items-center justify-center">
              <span className="text-gray-600 font-semibold">Team</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}