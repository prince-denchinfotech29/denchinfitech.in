"use client";

import { useState, useRef, useEffect, FC } from "react";
import { Play, Pause, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface HomeAbout {
  about_heading?: string;
  about_content?: string;
}

interface AboutSectionProps {
  homeAbout?: HomeAbout;
}

const AboutSection: FC<AboutSectionProps> = ({ homeAbout }) => {
  if (!homeAbout || Object.keys(homeAbout).length === 0) return null;

  const heading = homeAbout.about_heading || "About Us";
  const content = homeAbout.about_content || "No content available.";

  const imageSrc1x = "/imges/aboutus-Dench.webp"; // your image path
  const videoSrc = "/imges/DenchVideo.mp4";

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;

    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen()?.then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen()?.then(() => setIsFullscreen(false));
    }
  };

  const handleEnded = () => setIsPlaying(false);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  return (
    <section id="about" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Video/Image Area */}
        <div className="relative w-full aspect-video bg-black/50 rounded-lg overflow-hidden">
          {!isPlaying ? (
            <>
              <Image
                src={imageSrc1x}
                alt="About Us"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 570px"
                className="object-cover"
                priority={true}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="rounded-full w-16 h-16 bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                  onClick={() => setIsPlaying(true)}
                  aria-label="Play video"
                >
                  <Play className="h-6 w-6 text-white" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-cover"
                onEnded={handleEnded}
                controls={false}
                autoPlay
                playsInline
                preload="metadata"
                muted={false}
                draggable={false}
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 rounded-md px-4 py-2">
                <Button
                  size="sm"
                  className="text-white"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button
                  size="sm"
                  className="text-white"
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Text Area */}
        <div className="space-y-6 text-center lg:text-left">
          <Badge variant="outline" className="text-blue-600 border-blue-600 mx-auto lg:mx-0">
            Your Growth Partner in
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">{heading}</h1>
          <p
            className="text-gray-600 text-base sm:text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
