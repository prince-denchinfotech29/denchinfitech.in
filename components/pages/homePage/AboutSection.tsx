import { useState, useRef, useEffect, FC } from "react";
import { Play, Pause, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

  // Use Next.js public folder for static assets or env var with NEXT_PUBLIC_
  const imageSrc1x = "/imges/aboutus-Dench572_245.png"; // regular
  const imageSrc2x = "/imges/aboutus-Dench.webp";       // retina
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
    <section id="about" className="container mx-auto px-4 py-12 lg:py-20 mt-16">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Video or Thumbnail */}
        <div className="relative aspect-[2.33] bg-black/50 rounded-lg overflow-hidden">
          {!isPlaying ? (
            <>
              <img
                src={imageSrc1x}
                alt="About Us"
                className="w-full h-full object-cover"
                loading="lazy"
                draggable={false}
                srcSet={`${imageSrc1x} 1x, ${imageSrc2x} 2x`}
                sizes="(max-width: 768px) 100vw, 570px"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="rounded-full w-16 h-16 bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                  onClick={() => setIsPlaying(true)}
                  aria-label="Play video"
                >
                  <Play className="h-6 w-6 ml-1 text-white" />
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

        {/* Text Section */}
        <div className="space-y-6">
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            Your Growth Partner in
          </Badge>
          <h1 className="text-6xl lg:text-4xl font-bold">{heading}</h1>
          <p
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
