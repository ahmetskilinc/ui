"use client";

import {
  ComponentProps,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { IconPlaceholder } from "@/components/icon-placeholder";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] as const;

export type VideoPlayerHandle = {
  play: () => Promise<void>;
  pause: () => void;
  seek: (time: number) => void;
  getVideoElement: () => HTMLVideoElement | null;
};

export type VideoPlayerProps = Omit<
  ComponentProps<"video">,
  "controls" | "ref"
> & {
  src: string;
  poster?: string;
  className?: string;
  containerClassName?: string;
  autoHideControlsMs?: number;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

export const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  function VideoPlayer(
    {
      src,
      poster,
      className,
      containerClassName,
      autoHideControlsMs = 2500,
      onPlay,
      onPause,
      onTimeUpdate,
      onLoadedMetadata,
      onVolumeChange,
      onEnded,
      ...videoProps
    },
    ref,
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPip, setIsPip] = useState(false);
    const [playbackRate, setPlaybackRate] = useState<number>(1);
    const [controlsVisible, setControlsVisible] = useState(true);
    const [isBuffering, setIsBuffering] = useState(false);
    const [pipSupported, setPipSupported] = useState(false);

    useEffect(() => {
      setPipSupported(
        typeof document !== "undefined" &&
          Boolean(document.pictureInPictureEnabled),
      );
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        play: async () => {
          await videoRef.current?.play();
        },
        pause: () => videoRef.current?.pause(),
        seek: (time: number) => {
          if (videoRef.current) videoRef.current.currentTime = time;
        },
        getVideoElement: () => videoRef.current,
      }),
      [],
    );

    const showControls = useCallback(() => {
      setControlsVisible(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (autoHideControlsMs > 0 && isPlaying) {
        hideTimerRef.current = setTimeout(
          () => setControlsVisible(false),
          autoHideControlsMs,
        );
      }
    }, [autoHideControlsMs, isPlaying]);

    useEffect(() => {
      showControls();
      return () => {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      };
    }, [showControls]);

    useEffect(() => {
      const onFsChange = () =>
        setIsFullscreen(document.fullscreenElement === containerRef.current);
      document.addEventListener("fullscreenchange", onFsChange);
      return () => document.removeEventListener("fullscreenchange", onFsChange);
    }, []);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;
      const onEnter = () => setIsPip(true);
      const onLeave = () => setIsPip(false);
      video.addEventListener("enterpictureinpicture", onEnter);
      video.addEventListener("leavepictureinpicture", onLeave);
      return () => {
        video.removeEventListener("enterpictureinpicture", onEnter);
        video.removeEventListener("leavepictureinpicture", onLeave);
      };
    }, []);

    const togglePlay = useCallback(async () => {
      const video = videoRef.current;
      if (!video) return;
      if (video.paused) {
        await video.play();
      } else {
        video.pause();
      }
    }, []);

    const toggleMute = useCallback(() => {
      const video = videoRef.current;
      if (!video) return;
      video.muted = !video.muted;
    }, []);

    const toggleFullscreen = useCallback(async () => {
      const container = containerRef.current;
      if (!container) return;
      if (document.fullscreenElement === container) {
        await document.exitFullscreen();
      } else {
        await container.requestFullscreen();
      }
    }, []);

    const togglePip = useCallback(async () => {
      const video = videoRef.current;
      if (!video) return;
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else if (document.pictureInPictureEnabled && video.readyState >= 1) {
          await video.requestPictureInPicture();
        }
      } catch {}
    }, []);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        const video = videoRef.current;
        if (!video) return;
        const tag = (event.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;

        switch (event.key) {
          case " ":
          case "k":
            event.preventDefault();
            void togglePlay();
            break;
          case "ArrowLeft":
            event.preventDefault();
            video.currentTime = Math.max(0, video.currentTime - 5);
            break;
          case "ArrowRight":
            event.preventDefault();
            video.currentTime = Math.min(
              video.duration || 0,
              video.currentTime + 5,
            );
            break;
          case "ArrowUp":
            event.preventDefault();
            video.volume = Math.min(1, video.volume + 0.05);
            video.muted = false;
            break;
          case "ArrowDown":
            event.preventDefault();
            video.volume = Math.max(0, video.volume - 0.05);
            break;
          case "m":
            event.preventDefault();
            toggleMute();
            break;
          case "f":
            event.preventDefault();
            void toggleFullscreen();
            break;
        }
      },
      [togglePlay, toggleMute, toggleFullscreen],
    );

    return (
      <TooltipProvider delayDuration={300}>
        <div
          ref={containerRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseMove={showControls}
          onMouseLeave={() => {
            if (isPlaying) setControlsVisible(false);
          }}
          className={cn(
            "group relative isolate overflow-hidden rounded-lg bg-black text-white outline-none focus-visible:ring-2 focus-visible:ring-ring",
            containerClassName,
          )}
          data-slot="video-player"
          data-playing={isPlaying ? "true" : "false"}
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className={cn("h-full w-full", className)}
            onClick={togglePlay}
            onPlay={(e) => {
              setIsPlaying(true);
              showControls();
              onPlay?.(e);
            }}
            onPause={(e) => {
              setIsPlaying(false);
              setControlsVisible(true);
              onPause?.(e);
            }}
            onTimeUpdate={(e) => {
              setCurrentTime(e.currentTarget.currentTime);
              onTimeUpdate?.(e);
            }}
            onLoadedMetadata={(e) => {
              setDuration(e.currentTarget.duration);
              setVolume(e.currentTarget.volume);
              setMuted(e.currentTarget.muted);
              onLoadedMetadata?.(e);
            }}
            onVolumeChange={(e) => {
              setVolume(e.currentTarget.volume);
              setMuted(e.currentTarget.muted);
              onVolumeChange?.(e);
            }}
            onProgress={(e) => {
              const ranges = e.currentTarget.buffered;
              if (ranges.length > 0) {
                setBuffered(ranges.end(ranges.length - 1));
              }
            }}
            onWaiting={() => setIsBuffering(true)}
            onPlaying={() => setIsBuffering(false)}
            onCanPlay={() => setIsBuffering(false)}
            onEnded={(e) => {
              setIsPlaying(false);
              setControlsVisible(true);
              onEnded?.(e);
            }}
            onRateChange={(e) => setPlaybackRate(e.currentTarget.playbackRate)}
            {...videoProps}
          />

          {isBuffering && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <IconPlaceholder
                lucide="Loader2Icon"
                tabler="IconLoader2"
                hugeicons="Loading03Icon"
                phosphor="CircleNotchIcon"
                className="size-10 animate-spin opacity-80"
              />
            </div>
          )}

          {!isPlaying && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Play"
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 transition-opacity"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-transform hover:scale-110">
                <IconPlaceholder
                  lucide="PlayIcon"
                  tabler="IconPlayerPlay"
                  hugeicons="PlayIcon"
                  phosphor="PlayIcon"
                  className="size-7 translate-x-0.5"
                />
              </span>
            </button>
          )}

          <div
            data-visible={controlsVisible || !isPlaying ? "true" : "false"}
            className={cn(
              "absolute inset-x-0 bottom-0 z-20 flex flex-col gap-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 transition-opacity duration-200",
              "data-[visible=false]:pointer-events-none data-[visible=false]:opacity-0",
            )}
          >
            <div className="flex items-center gap-2">
              <span className="w-12 text-right font-mono text-[11px] tabular-nums opacity-80">
                {formatTime(currentTime)}
              </span>
              <div className="relative flex-1">
                <div
                  className="absolute inset-y-1/2 h-1 -translate-y-1/2 rounded-full bg-white/20"
                  style={{
                    width: duration ? `${(buffered / duration) * 100}%` : "0%",
                  }}
                />
                <Slider
                  value={[currentTime]}
                  max={duration || 0}
                  step={0.1}
                  onValueChange={([v]) => {
                    if (videoRef.current && typeof v === "number") {
                      videoRef.current.currentTime = v;
                      setCurrentTime(v);
                    }
                  }}
                  aria-label="Seek"
                  className="[&_[data-slot=slider-track]]:bg-white/15 [&_[data-slot=slider-range]]:bg-white [&_[data-slot=slider-thumb]]:border-white/70 [&_[data-slot=slider-thumb]]:bg-white"
                />
              </div>
              <span className="w-12 font-mono text-[11px] tabular-nums opacity-80">
                {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-1.5">
              <div className="flex items-center gap-1.5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={togglePlay}
                      aria-label={isPlaying ? "Pause" : "Play"}
                      className="size-8 text-white hover:bg-white/15 hover:text-white"
                    >
                      {isPlaying ? (
                        <IconPlaceholder
                          lucide="PauseIcon"
                          tabler="IconPlayerPause"
                          hugeicons="PauseIcon"
                          phosphor="PauseIcon"
                          className="size-5"
                        />
                      ) : (
                        <IconPlaceholder
                          lucide="PlayIcon"
                          tabler="IconPlayerPlay"
                          hugeicons="PlayIcon"
                          phosphor="PlayIcon"
                          className="size-5"
                        />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{isPlaying ? "Pause (k)" : "Play (k)"}</TooltipContent>
                </Tooltip>

                <div className="group/volume flex items-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={toggleMute}
                        aria-label={muted ? "Unmute" : "Mute"}
                        className="size-8 text-white hover:bg-white/15 hover:text-white"
                      >
                        {muted || volume === 0 ? (
                          <IconPlaceholder
                            lucide="VolumeOffIcon"
                            tabler="IconVolumeOff"
                            hugeicons="VolumeMute02Icon"
                            phosphor="SpeakerXIcon"
                            className="size-5"
                          />
                        ) : (
                          <IconPlaceholder
                            lucide="Volume2Icon"
                            tabler="IconVolume"
                            hugeicons="VolumeHighIcon"
                            phosphor="SpeakerHighIcon"
                            className="size-5"
                          />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{muted ? "Unmute (m)" : "Mute (m)"}</TooltipContent>
                  </Tooltip>
                  <div className="w-0 overflow-hidden transition-all duration-200 group-hover/volume:w-20 group-focus-within/volume:w-20">
                    <Slider
                      value={[muted ? 0 : volume]}
                      min={0}
                      max={1}
                      step={0.01}
                      aria-label="Volume"
                      onValueChange={([v]) => {
                        if (videoRef.current && typeof v === "number") {
                          videoRef.current.volume = v;
                          if (v > 0 && videoRef.current.muted)
                            videoRef.current.muted = false;
                        }
                      }}
                      className="ml-1 [&_[data-slot=slider-track]]:bg-white/15 [&_[data-slot=slider-range]]:bg-white [&_[data-slot=slider-thumb]]:border-white/70 [&_[data-slot=slider-thumb]]:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <DropdownMenu>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label="Playback speed"
                          className="size-8 text-white hover:bg-white/15 hover:text-white"
                        >
                          <IconPlaceholder
                            lucide="SettingsIcon"
                            tabler="IconSettings"
                            hugeicons="Settings02Icon"
                            phosphor="GearIcon"
                            className="size-5"
                          />
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>Playback speed</TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent align="end" className="min-w-32">
                    <DropdownMenuLabel>Speed</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={playbackRate.toString()}
                      onValueChange={(v) => {
                        const rate = Number(v);
                        if (videoRef.current) videoRef.current.playbackRate = rate;
                        setPlaybackRate(rate);
                      }}
                    >
                      {PLAYBACK_RATES.map((rate) => (
                        <DropdownMenuRadioItem
                          key={rate}
                          value={rate.toString()}
                        >
                          {rate === 1 ? "Normal" : `${rate}x`}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                {pipSupported && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={togglePip}
                        aria-label={
                          isPip
                            ? "Exit picture-in-picture"
                            : "Picture-in-picture"
                        }
                        className="size-8 text-white hover:bg-white/15 hover:text-white"
                      >
                        <IconPlaceholder
                          lucide="PictureInPicture2Icon"
                          tabler="IconPictureInPicture"
                          hugeicons="PictureInPictureOnIcon"
                          phosphor="PictureInPictureIcon"
                          className="size-5"
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isPip ? "Exit PiP" : "Picture-in-picture"}
                    </TooltipContent>
                  </Tooltip>
                )}

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={toggleFullscreen}
                      aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                      className="size-8 text-white hover:bg-white/15 hover:text-white"
                    >
                      {isFullscreen ? (
                        <IconPlaceholder
                          lucide="MinimizeIcon"
                          tabler="IconMinimize"
                          hugeicons="Minimize01Icon"
                          phosphor="CornersInIcon"
                          className="size-5"
                        />
                      ) : (
                        <IconPlaceholder
                          lucide="MaximizeIcon"
                          tabler="IconMaximize"
                          hugeicons="Maximize01Icon"
                          phosphor="CornersOutIcon"
                          className="size-5"
                        />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isFullscreen ? "Exit fullscreen (f)" : "Fullscreen (f)"}
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    );
  },
);
