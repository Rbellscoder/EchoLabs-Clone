"use client";

import { useEffect, useRef, useState } from "react";

export function useAudioPlayback(file: File | Blob | null | undefined) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!file) {
      setIsPlaying(false);
      return;
    }

    const url = URL.createObjectURL(file);
    const audio = new Audio(url);
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
      URL.revokeObjectURL(url);
      audioRef.current = null;
      setIsPlaying(false);
    };
  }, [file]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return { isPlaying, togglePlay };
}