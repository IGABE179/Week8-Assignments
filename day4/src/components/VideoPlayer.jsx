import { useRef } from 'react';

// Extension: control a <video> with play() and pause().
// public/videos/demo.mp4 is a generated test-pattern clip (no copyright issues).
export default function VideoPlayer() {
  const videoRef = useRef(null);

  async function play() {
    try {
      await videoRef.current?.play();
    } catch (error) {
      console.error('Playback blocked', error);
    }
  }

  function pause() {
    videoRef.current?.pause();
  }

  return (
    <div>
      <video
        ref={videoRef}
        src="/videos/demo.mp4"
        controls
        width="320"
        aria-label="Demo test-pattern video"
      />
      <div>
        <button type="button" onClick={play}>
          Play
        </button>
        <button type="button" onClick={pause}>
          Pause
        </button>
      </div>
    </div>
  );
}
