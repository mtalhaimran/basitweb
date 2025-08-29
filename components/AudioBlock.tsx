'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

interface AudioBlockProps {
  src: string;
  transcript?: string;
  title?: string;
  lang?: 'en' | 'ur';
}

export function AudioBlock({ src, transcript, title, lang = 'en' }: AudioBlockProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const isUrdu = lang === 'ur';

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

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="bg-muted/50 rounded-lg p-6 my-8">
      <div className={`flex items-center justify-between mb-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center space-x-3 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <Volume2 className="w-5 h-5 text-muted-foreground" />
          <h3 className={`text-lg font-medium ${isUrdu ? 'urdu-heading' : ''}`}>
            {title || (isUrdu ? 'آڈیو' : 'Audio')}
          </h3>
        </div>
      </div>

      <div className="space-y-4">
        <div className={`flex items-center space-x-4 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <button
            onClick={togglePlayback}
            className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
            aria-label={isUrdu ? (isPlaying ? 'رک جائیں' : 'چلائیں') : (isPlaying ? 'Pause' : 'Play')}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          <audio
            ref={audioRef}
            src={src}
            onEnded={handleEnded}
            className="flex-1 audio-player"
            controls
          />
        </div>

        {transcript && (
          <div className={isUrdu ? 'text-right' : ''}>
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className={`text-sm font-medium text-primary hover:underline ${isUrdu ? 'urdu-text' : ''}`}
            >
              {showTranscript 
                ? (isUrdu ? 'ٹرانسکرپٹ چھپائیں' : 'Hide Transcript')
                : (isUrdu ? 'ٹرانسکرپٹ دکھائیں' : 'Show Transcript')
              }
            </button>
            
            {showTranscript && (
              <div className={`mt-3 p-4 bg-background rounded border text-sm leading-relaxed ${
                isUrdu ? 'urdu-text text-right' : ''
              }`}>
                {transcript}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}