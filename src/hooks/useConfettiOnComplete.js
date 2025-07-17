import { useEffect, useState } from 'react';

export default function useConfettiOnComplete(progress) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeOutConfetti, setFadeOutConfetti] = useState(false);
  useEffect(() => {
    if (progress === 100) {
      setShowConfetti(true); // Show confetti when progress hits 100
      setTimeout(() => {
        setFadeOutConfetti(true); // Start fade-out effect after 10 seconds
        setTimeout(() => {
          setShowConfetti(false); // Hide confetti after fade-out completes
        }, 2000); // Fade-out duration
      }, 10000); // 10000 milliseconds = 10 seconds
    }
  }, [progress]);
  return { showConfetti, fadeOutConfetti };
}
