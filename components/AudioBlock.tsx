'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, FileText, Download, SkipBack, SkipForward } from 'lucide-react';

interface AudioBlockProps {
  src: string;
  transcript?: string;
  title?: string;
  lang?: 'en' | 'ur';
}

export function AudioBlock({ src, transcript, title }: AudioBlockProps) { // Removed lang prop as site is now primarily Urdu
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const isUrdu = true; // Always Urdu
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setDuration(audio.duration);
      setIsLoaded(true);
    };
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplaythrough', () => setIsLoaded(true));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplaythrough', () => setIsLoaded(true));
    };
  }, []);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    if (!isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio && duration) {
      const newTime = (parseFloat(e.target.value) / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
    }
  };

  return (
    <div className="minimal-card my-12">
      <div className={`flex items-center justify-between mb-8 ${isUrdu ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-4 flex-row-reverse`}> {/* Always RTL */}
          <div className="p-4 bg-primary-light rounded-2xl"> {/* Use new primary-light */}
            <Volume2 className="w-6 h-6 text-primary" /> {/* Use new primary color */}
          </div>
          <h3 className={`text-heading-4 urdu-heading text-ink`}> {/* Always Urdu, use new ink color */}
            {title || (isUrdu ? 'آڈیو' : 'Audio')}
          </h3>
        </div>

        {transcript && (
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className={`btn btn-secondary text-sm urdu-text flex-row-reverse`} // Always Urdu
          >
            <FileText className="w-4 h-4" />
            <span className={isUrdu ? 'mr-2' : 'ml-2'}>
              {showTranscript 
                ? (isUrdu ? 'ٹرانسکرپٹ چھپائیں' : 'Hide Transcript')
                : (isUrdu ? 'ٹرانسکرپٹ دکھائیں' : 'Show Transcript')
              }
            </span>
          </button>
        )}
      </div>

      {/* Audio Controls */}
      <div className="space-y-6">
        <div className={`flex items-center gap-6 ${isUrdu ? 'flex-row-reverse' : ''}`}>
          {/* Skip Back */}
          <button
            onClick={() => skipTime(-10)}
            disabled={!isLoaded}
            className="btn btn-ghost p-4 rounded-2xl text-ink-muted hover:text-ink" // Use new ink colors
            aria-label={isUrdu ? '10 سیکنڈ پیچھے' : 'Skip back 10 seconds'}
          >
            <SkipBack className="w-5 h-5" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlayback}
            disabled={!isLoaded}
            className="flex items-center justify-center w-16 h-16 bg-primary text-white rounded-2xl hover:bg-primary-hover disabled:opacity-50 transition-all focus-ring shadow-lg" // Use new primary colors
            aria-label={isUrdu ? (isPlaying ? 'رک جائیں' : 'چلائیں') : (isPlaying ? 'Pause' : 'Play')}
          >
            {!isLoaded ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </button>

          {/* Skip Forward */}
          <button
            onClick={() => skipTime(10)}
            disabled={!isLoaded}
            className="btn btn-ghost p-4 rounded-2xl text-ink-muted hover:text-ink" // Use new ink colors
            aria-label={isUrdu ? '10 سیکنڈ آگے' : 'Skip forward 10 seconds'}
          >
            <SkipForward className="w-5 h-5" />
          </button>

          {/* Progress Bar */}
          <div className="flex-1 space-y-3">
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              disabled={!isLoaded}
              className="w-full h-2 bg-line rounded-lg appearance-none cursor-pointer disabled:opacity-50" // Use new line color
              style={{accentColor: 'var(--primary)'}} // Use new primary color
              aria-label={'آڈیو پوزیشن'} // Always Urdu
            />
            <div className={`flex justify-between text-caption text-gray-500 ${
              isUrdu ? 'flex-row-reverse' : ''
            }`}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Download */}
          <a
            href={src}
            download
            className="btn btn-ghost p-4 rounded-2xl text-ink-muted hover:text-ink" // Use new ink colors
            aria-label={isUrdu ? 'آڈیو ڈاؤن لوڈ کریں' : 'Download audio'}
          >
            <Download className="w-5 h-5" />
          </a>
        </div>

        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          className="hidden"
        />

        {/* Transcript */}
        {transcript && showTranscript && (
          <div className={`mt-8 p-8 bg-gray-50 border border-gray-200 rounded-2xl animate-slide-up ${
            isUrdu ? 'text-right' : ''
          }`}> {/* Use new background and border colors */}
            <div className={`flex items-center gap-3 mb-6 flex-row-reverse justify-end`}> {/* Always RTL */}
              <FileText className="w-5 h-5 text-primary" /> {/* Use new primary color */}
              <h4 className={`text-heading-4 urdu-heading text-ink`}> {/* Always Urdu, use new ink color */}
                {isUrdu ? 'ٹرانسکرپٹ' : 'Transcript'}
              </h4>
            </div>
            <div className={`prose max-w-none urdu-text`}> {/* Always Urdu */}
              {transcript.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}