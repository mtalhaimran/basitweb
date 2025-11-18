'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ContentItem {
  type: 'book' | 'snippet' | 'bonn' | 'gallery';
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  image?: string;
  caption?: string;
  location?: string;
}

interface WorkPageClientProps {
  content: ContentItem[];
}

export function WorkPageClient({ content }: WorkPageClientProps) {
  const [filter, setFilter] = useState<'all' | 'book' | 'snippet' | 'bonn' | 'gallery'>('all');

  const filteredContent = filter === 'all' ? content : content.filter(item => item.type === filter);

  const getTypeBadge = (type: string) => {
    const badges = {
      book: '📚 کتاب',
      snippet: '✍️ اقتباس',
      bonn: '🌆 بون کا بنجارہ',
      gallery: '📷 گیلری'
    };
    return badges[type as keyof typeof badges] || type;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      book: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
      snippet: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
      bonn: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
      gallery: 'from-orange-500/20 to-red-500/20 border-orange-500/30'
    };
    return colors[type as keyof typeof colors] || 'from-gray-500/20 to-gray-500/20 border-gray-500/30';
  };

  const getLink = (item: ContentItem) => {
    const links = {
      book: `/books/${item.slug}`,
      snippet: `/snippets/${item.slug}`,
      bonn: `/bonn-ka-banjara/${item.slug}`,
      gallery: `/gallery/${item.slug}`
    };
    return links[item.type];
  };

  return (
    <div className="bg-surface pt-40">
      <div className="container mx-auto px-4 pb-24" dir="rtl">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-16 text-right"
          >
            <h1 className="text-6xl font-bold text-ink font-urdu-heading mb-6">
              کام
            </h1>
            <p className="text-xl text-ink-muted font-urdu-body leading-relaxed max-w-3xl mr-auto">
              میری تمام تخلیقات، کہانیاں، کتابیں، اقتباسات اور تصاویر کا مجموعہ
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-l from-brand to-transparent mt-6 origin-right"
            />
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-12 justify-end"
          >
            {[
              { value: 'all', label: 'تمام' },
              { value: 'book', label: '📚 کتابیں' },
              { value: 'bonn', label: '🌆 بون کا بنجارہ' },
              { value: 'snippet', label: '✍️ اقتباسات' },
              { value: 'gallery', label: '📷 گیلری' }
            ].map((btn) => (
              <motion.button
                key={btn.value}
                onClick={() => setFilter(btn.value as any)}
                className={`px-6 py-3 rounded-full font-urdu-body text-lg transition-all ${
                  filter === btn.value
                    ? 'bg-brand text-white shadow-lg scale-105'
                    : 'bg-surface-white text-ink hover:bg-surface-elevated hover:scale-105'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {btn.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Content Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-right mb-8"
          >
            <p className="text-ink-muted font-urdu-body">
              {filteredContent.length} {filter === 'all' ? 'تخلیقات' : 'اشیاء'} موجود ہیں
            </p>
          </motion.div>

          {/* Content Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredContent.map((item, index) => (
              <motion.div
                key={`${item.type}-${item.slug}`}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 100
                }}
              >
                <Link href={getLink(item)}>
                  <motion.div
                    className={`group relative bg-gradient-to-br ${getTypeColor(
                      item.type
                    )} border rounded-xl overflow-hidden shadow-md h-full`}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {/* Image/Visual Section */}
                    <div className="aspect-video relative overflow-hidden bg-surface-elevated">
                      {item.image ? (
                        <Image
                          src={item.image.startsWith('/') ? item.image : `/images/${item.image}`}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl">{getTypeBadge(item.type).split(' ')[0]}</span>
                        </div>
                      )}
                      
                      {/* Type Badge Overlay */}
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white text-sm font-urdu-body">
                          {getTypeBadge(item.type)}
                        </span>
                      </div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content Section */}
                    <div className="p-5">
                      <motion.h3
                        className="text-xl font-bold text-ink group-hover:text-brand transition-colors font-urdu-heading text-right mb-2 line-clamp-2"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 + 0.2 }}
                      >
                        {item.title}
                      </motion.h3>

                      <p className="text-sm text-ink-muted font-urdu-body text-right mb-3">
                        {new Date(item.date).toLocaleDateString('ur-PK', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>

                      {(item.excerpt || item.caption) && (
                        <p className="text-ink-muted font-urdu-body text-right line-clamp-2 text-sm">
                          {item.excerpt || item.caption}
                        </p>
                      )}

                      {item.location && (
                        <p className="text-brand text-sm font-urdu-body text-right mt-2">
                          📍 {item.location}
                        </p>
                      )}
                    </div>

                    {/* Hover Effect Border */}
                    <motion.div
                      className="absolute inset-0 border-2 border-brand rounded-xl opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredContent.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-ink-muted font-urdu-body">
                اس زمرے میں کوئی مواد دستیاب نہیں ہے
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
