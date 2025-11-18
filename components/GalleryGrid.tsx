'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { getImagePath } from '@/lib/utils/frontmatter';

interface GalleryImage {
  slug: string;
  title: string;
  image: string;
  caption?: string;
  location?: string;
  date: string;
  source: 'cms' | 'folder';
}

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {images.map((image, index) => (
          <motion.div
            key={image.slug}
            variants={itemVariants}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            onClick={() => setSelectedImage(image)}
            className="relative cursor-pointer"
          >
            <motion.div
              className="relative aspect-square bg-surface-elevated rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.02, y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {image.image ? (
                <Image
                  src={getImagePath(image.image)}
                  alt={image.caption || image.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-ink-muted font-urdu-body">
                  [{image.title}]
                </div>
              )}

              {/* Always visible metadata overlay at bottom */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 pt-12"
                initial={{ y: 0 }}
                animate={{ y: hoveredIndex === index ? 0 : 20 }}
                transition={{ duration: 0.3 }}
                dir="rtl"
              >
                <motion.h3
                  className="text-white font-urdu-heading text-xl text-right mb-2 leading-relaxed"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                >
                  {image.title}
                </motion.h3>

                {/* Metadata that appears on hover */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? 0 : 10,
                  }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  {image.caption && (
                    <div className="flex items-start gap-2">
                      <span className="text-white/70 text-lg mt-0.5">💬</span>
                      <p className="text-white/90 font-urdu-body text-sm leading-relaxed">
                        {image.caption}
                      </p>
                    </div>
                  )}

                  {image.location && (
                    <div className="flex items-center gap-2">
                      <span className="text-white/70 text-lg">📍</span>
                      <p className="text-white/80 font-urdu-body text-sm">
                        {image.location}
                      </p>
                    </div>
                  )}

                  {image.date && (
                    <div className="flex items-center gap-2">
                      <span className="text-white/60 text-sm">📅</span>
                      <p className="text-white/70 font-urdu-body text-xs">
                        {new Date(image.date).toLocaleDateString('ur-PK', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  )}
                </motion.div>
              </motion.div>

              {/* Hover border effect */}
              <motion.div
                className="absolute inset-0 border-4 border-primary/0 rounded-xl pointer-events-none"
                animate={{
                  borderColor:
                    hoveredIndex === index
                      ? 'rgba(59, 130, 246, 0.5)'
                      : 'rgba(59, 130, 246, 0)',
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedImage(null)}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
              variants={overlayVariants}
            />

            {/* Modal Content */}
            <motion.div
              className="relative max-w-6xl w-full max-h-[90vh] bg-surface-elevated rounded-2xl overflow-hidden shadow-2xl"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Top Right */}
              <motion.button
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200 backdrop-blur-sm"
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                aria-label="Close"
              >
                <span className="text-xl">✕</span>
              </motion.button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative aspect-square lg:aspect-auto">
                  {selectedImage.image && (
                    <Image
                      src={getImagePath(selectedImage.image)}
                      alt={selectedImage.caption || selectedImage.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  )}
                </div>

                {/* Metadata Section */}
                <div className="p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-surface-elevated to-surface" dir="rtl">
                  <div className="space-y-6">
                    <motion.h2
                      className="text-4xl font-bold text-ink font-urdu-heading leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {selectedImage.title}
                    </motion.h2>

                    {selectedImage.caption && (
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-primary text-xl">💬</span>
                          <h3 className="text-sm font-semibold text-ink-muted font-urdu-body">
                            تفصیل
                          </h3>
                        </div>
                        <p className="text-lg text-ink font-urdu-body leading-relaxed">
                          {selectedImage.caption}
                        </p>
                      </motion.div>
                    )}

                    {selectedImage.location && (
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-primary text-xl">📍</span>
                          <h3 className="text-sm font-semibold text-ink-muted font-urdu-body">
                            مقام
                          </h3>
                        </div>
                        <p className="text-lg text-ink font-urdu-body">
                          {selectedImage.location}
                        </p>
                      </motion.div>
                    )}

                    {selectedImage.date && (
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-primary text-xl">📅</span>
                          <h3 className="text-sm font-semibold text-ink-muted font-urdu-body">
                            تاریخ
                          </h3>
                        </div>
                        <p className="text-lg text-ink font-urdu-body">
                          {new Date(selectedImage.date).toLocaleDateString('ur-PK', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
