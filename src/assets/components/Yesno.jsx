import React, { useState, useEffect } from 'react';

const Yesno = () => {
  const [yesScale, setYesScale] = useState(1);
  const [showImage, setShowImage] = useState(false);
  const [imageScale, setImageScale] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    let animationFrame;
    if (showImage && imageScale < 1) {
      animationFrame = requestAnimationFrame(() => {
        setImageScale(prev => Math.min(prev + 0.1, 1));
      });
    }
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [showImage, imageScale]);

  useEffect(() => {
    if (imageScale >= 1) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [imageScale]);

  const handleNoClick = () => {
    setYesScale(prev => prev + 0.25);
  };

  const handleYesClick = () => {
    setYesScale(1);
    setShowImage(true);
    setImageScale(0);
  };

  return (
    <>
      {showImage && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <img
            src="/sidecat.JPG"
            alt="celebration"
            className="transition-transform duration-500"
            style={{
              transform: `scale(${imageScale})`,
              opacity: imageScale,
            }}
          />
        </div>
      )}

      {/* Conditionally render buttons only if showImage is false */}
      {!showImage && (
        <div className="flex space-x-4">
          <div
            className="bg-emerald-700 text-emerald-100 px-4 py-2 rounded-lg hover:bg-emerald-800 transition-all duration-200 cursor-pointer font-pixel"
            style={{
              transform: `scale(${yesScale})`,
              width: `${yesScale * 100}%`,
            }}
            onClick={handleYesClick}
          >
            yes
          </div>

          <div
            className="bg-red-700 text-red-100 px-4 py-2 rounded-lg hover:bg-red-800 transition-colors duration-200 cursor-pointer font-pixel"
            onClick={handleNoClick}
          >
            no
          </div>
        </div>
      )}

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => {
            const left = `${Math.random() * 100}%`;
            const animationDuration = `${Math.random() * 2 + 2}s`;
            const delay = `${Math.random()}s`;
            
            return (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left,
                  top: '-10px',
                  backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
                  animation: `fall ${animationDuration} linear ${delay} forwards`,
                }}
              />
            );
          })}
        </div>
      )}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
          }
        }
      `}</style>
    </>
  );
};

export default Yesno;