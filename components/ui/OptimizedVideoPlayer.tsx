"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Import ReactPlayer dynamically for better performance
const ReactPlayer = dynamic(() => import('react-player'), { 
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-black/50">
            <div className="text-white text-sm animate-pulse">Chargement...</div>
        </div>
    )
});

interface OptimizedVideoPlayerProps {
    url: string;
    playing: boolean;
    onEnded?: () => void;
    onReady?: () => void;
    className?: string;
    style?: React.CSSProperties;
    // Only load video when it's current or next slide
    shouldPreload?: boolean;
}

export const OptimizedVideoPlayer = ({
    url,
    playing,
    onEnded,
    onReady,
    className = "",
    style = {},
    shouldPreload = false
}: OptimizedVideoPlayerProps) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [internalPlaying, setInternalPlaying] = React.useState(false);
    const playerRef = React.useRef<any>(null);
    const playingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    // Determine if we should load this video
    const shouldLoad = playing || shouldPreload;

    // Stabilize playing state to prevent rapid play/pause calls
    React.useEffect(() => {
        // Clear any pending timeout
        if (playingTimeoutRef.current) {
            clearTimeout(playingTimeoutRef.current);
        }

        if (playing) {
            // Small delay to ensure player is ready before playing
            playingTimeoutRef.current = setTimeout(() => {
                setInternalPlaying(true);
            }, 100);
        } else {
            setInternalPlaying(false);
        }

        return () => {
            if (playingTimeoutRef.current) {
                clearTimeout(playingTimeoutRef.current);
            }
        };
    }, [playing]);

    const handleReady = () => {
        setIsLoaded(true);
        if (onReady) {
            onReady();
        }
        // If we should be playing, start after ready
        if (playing) {
            setTimeout(() => {
                setInternalPlaying(true);
            }, 200);
        }
    };

    const handleError = (error: any) => {
        console.warn('Video player error:', error);
        // Silently handle abort errors (play/pause race conditions)
        if (error?.message?.includes('AbortError') || error?.name === 'AbortError') {
            return;
        }
    };

    // Preload strategy: auto when playing or preloading, metadata for next, none otherwise
    const preload = React.useMemo(() => {
        if (playing) {
            return 'auto'; // Full load when playing
        }
        if (shouldPreload) {
            return 'metadata'; // Preload metadata for next slide
        }
        return 'none';
    }, [playing, shouldPreload]);

    // Show placeholder only if video shouldn't load yet
    if (!shouldLoad) {
        return (
            <div className={`w-full h-full flex items-center justify-center bg-black/30 ${className}`} style={style}>
                <div className="text-white/40 text-xs">Vidéo en attente</div>
            </div>
        );
    }

    return (
        <div className={`relative w-full h-full ${className}`} style={style}>
            {!isLoaded && playing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                    <div className="text-white text-sm animate-pulse">Chargement de la vidéo...</div>
                </div>
            )}
            <ReactPlayer
                key={url}
                ref={playerRef}
                url={url}
                playing={internalPlaying}
                onEnded={onEnded}
                onReady={handleReady}
                onError={handleError}
                onStart={() => setIsLoaded(true)}
                width="100%"
                height="100%"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                config={{
                    file: {
                        attributes: {
                            playsInline: true,
                            controlsList: 'nodownload',
                            disablePictureInPicture: true,
                            preload: preload,
                            'webkit-playsinline': true,
                        },
                        forceVideo: true,
                    }
                }}
                volume={1}
                muted={false}
                controls={false}
                playsinline
                pip={false}
                stopOnUnmount={true}
                progressInterval={100}
                light={false}
            />
        </div>
    );
};

