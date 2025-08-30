'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioBlockProps {
  src: string;
  transcript?: string;
  title?: string;
  lang?: 'ur' | 'en';
}

export function AudioBlock({ src, transcript, title = "Audio", lang = 'ur' }: AudioBlockProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isUrdu = lang === 'ur';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="my-8">
      <audio ref={audioRef} src={src} preload="metadata" />
      
      {/* Audio Player */}
      <div className="bg-surface-white rounded-2xl border border-line p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 flex-row-reverse">
          <h3 className="text-heading-4 urdu-heading text-ink">{title}</h3>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Volume2 className="w-4 h-4 text-ink-muted" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, var(--brand) 0%, var(--brand) ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-caption urdu-text text-ink-muted mt-2 flex-row-reverse">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 space-x-reverse">
          <motion.button
            onClick={() => skip(-10)}
            className="p-3 text-ink-muted hover:text-brand transition-colors rounded-lg hover:bg-surface-elevated"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isUrdu ? '10 سیکنڈ پیچھے' : 'Skip back 10 seconds'}
          >
            <SkipBack className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={togglePlay}
            className="p-4 bg-brand text-white rounded-full hover:bg-brand-hover transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isPlaying ? (isUrdu ? 'رک جائیں' : 'Pause') : (isUrdu ? 'چلائیں' : 'Play')}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </motion.button>

          <motion.button
            onClick={() => skip(10)}
            className="p-3 text-ink-muted hover:text-brand transition-colors rounded-lg hover:bg-surface-elevated"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isUrdu ? '10 سیکنڈ آگے' : 'Skip forward 10 seconds'}
          >
            <SkipForward className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Transcript */}
      {transcript && (
        <div className="mt-4">
          <motion.button
            onClick={() => setShowTranscript(!showTranscript)}
            className="flex items-center space-x-2 space-x-reverse text-brand hover:text-brand-hover transition-colors urdu-text"
            whileHover={{ scale: 1.02 }}
          >
            <FileText className="w-4 h-4" />
            <span>{isUrdu ? 'متن دیکھیں' : 'Show Transcript'}</span>
          </motion.button>

          <AnimatePresence>
            {showTranscript && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-surface-elevated rounded-lg border border-line"
              >
                <p className="urdu-text text-ink leading-relaxed text-right">
                  {transcript}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}