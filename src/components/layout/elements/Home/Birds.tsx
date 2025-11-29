import { useState } from "react";

interface Bird {
  top: number;
  delay: number;
  duration: number;
}

interface BirdsProps {
  count?: number;
}

export function Birds({ count = 5 }: BirdsProps) {
  const [birds] = useState<Bird[]>(() =>
    [...Array(count)].map(() => ({
      top: Math.random() * 80 + 10,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
    }))
  );

  return (
    <>
      {birds.map((bird, i) => (
        <img
          key={i}
          src="https://i.pinimg.com/originals/a6/d4/7a/a6d47abcb3101e81f62a6041abed48eb.gif"
          alt="Flying bird"
          className="absolute pointer-events-none"
          style={{
            top: `${bird.top}%`,
            left: `-10%`,
            width: "50px",
            animation: `flyBird${i} ${bird.duration}s linear infinite`,
            animationDelay: `${bird.delay}s`,
            zIndex: 0,
          }}
        />
      ))}

      <style>{`
        ${birds
          .map(
            (_, i) => `@keyframes flyBird${i} {
            0% { transform: translateX(0); }
            100% { transform: translateX(110vw); }
          }`
          )
          .join("\n")}
      `}</style>
    </>
  );
}
