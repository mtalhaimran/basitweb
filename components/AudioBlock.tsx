'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, FileText, Download } from 'lucide-react';

interface AudioBlockProps {
  src: string;
  transcript?: string;
  title?: string;
  lang?: 'en' | 'ur';
}

export function AudioBlock({ src, transcript, title, lang = 'en' }: AudioBlockProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const isUrdu = lang === 'ur';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
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
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = (parseFloat(e.target.value) / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="bg-muted/50 rounded-xl p-6 my-8 audio-controls">
      <div className={`flex items-center justify-between mb-6 ${isUrdu ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center space-x-3 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <div className="p-2 bg-primary/10 rounded-lg">
            <Volume2 className="w-5 h-5 text-primary" />
          </div>
          <h3 className={`text-lg font-semibold ${isUrdu ? 'font-urdu-heading' : ''}`}>
            {title || (isUrdu ? 'آڈیو' : 'Audio')}
          </h3>
        </div>

        {transcript && (
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className={`flex items-center space-x-2 text-sm text-primary hover:underline focus-ring rounded ${
              isUrdu ? 'flex-row-reverse space-x-reverse font-urdu-body' : ''
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>
              {showTranscript 
                ? (isUrdu ? 'ٹرانسکرپٹ چھپائیں' : 'Hide Transcript')
                : (isUrdu ? 'ٹرانسکرپٹ دکھائیں' : 'Show Transcript')
              }
            </span>
          </button>
        )}
      </div>

      {/* Audio Controls */}
      <div className="space-y-4">
        <div className={`flex items-center space-x-4 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <button
            onClick={togglePlayback}
            className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors focus-ring"
            aria-label={isUrdu ? (isPlaying ? 'رک جائیں' : 'چلائیں') : (isPlaying ? 'Pause' : 'Play')}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          <div className="flex-1 space-y-2">
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer audio-player"
            />
            <div className={`flex justify-between text-xs text-muted-foreground ${
              isUrdu ? 'flex-row-reverse' : ''
            }`}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          className="hidden"
        />

        {/* Transcript */}
        {transcript && showTranscript && (
          <div className={`mt-6 p-4 bg-background rounded-lg border ${isUrdu ? 'text-right' : ''}`}>
            <div className={`flex items-center space-x-2 mb-3 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <FileText className="w-4 h-4 text-muted-foreground" />
              <h4 className={`text-sm font-medium ${isUrdu ? 'font-urdu-heading' : ''}`}>
                {isUrdu ? 'ٹرانسکرپٹ' : 'Transcript'}
              </h4>
            </div>
            <p className={`text-sm leading-relaxed text-muted-foreground ${
              isUrdu ? 'font-urdu-body' : ''
            }`}>
              {transcript}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}