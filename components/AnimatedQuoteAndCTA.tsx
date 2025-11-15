'use client';

import { motion } from 'framer-motion';

interface AnimatedQuoteAndCTAProps {
  quote: string;
  cta: string;
}

export function AnimatedQuoteAndCTA({ quote, cta }: AnimatedQuoteAndCTAProps) {
  return (
    <>
      {/* Quote */}
      <motion.blockquote 
        className="border-r-4 pr-6 border-brand py-2 mb-12"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xl italic text-ink-muted font-urdu-body text-right">
          &ldquo;{quote}&rdquo;
        </p>
      </motion.blockquote>

      {/* CTA */}
      <motion.div 
        className="text-right"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.a 
          href="/work" 
          className="inline-block rounded-xl border-2 border-brand px-6 py-3 text-brand hover:bg-brand hover:text-white transition-colors font-medium font-urdu-body"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {cta}
        </motion.a>
      </motion.div>
    </>
  );
}
