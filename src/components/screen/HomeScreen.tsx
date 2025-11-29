import { useState } from "react";
interface Bird {
  top: number;
  delay: number;
  duration: number;
}

export function HomeScreen() {
  const [birds] = useState<Bird[]>(() =>
    [...Array(5)].map(() => ({
      top: Math.random() * 80 + 10,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
    }))
  );

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(31,41,55,0.95) 100%)`,
      }}
    >
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col-reverse lg:flex-row items-center gap-10 relative z-10">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-6 transition-transform duration-300 "
            style={{ color: "var(--color-text)" }}
          >
            Discover the Wonders of Birds <br /> From Every Corner of the World
          </h1>
          <p
            className="text-lg sm:text-xl mb-8"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Learn, explore, and appreciate the beauty of birds with our global
            bird encyclopedia.
          </p>
          <a
            href="/birds"
            className="inline-block font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-110 hover:shadow-lg"
            style={{
              backgroundColor: "var(--color-success)",
              color: "var(--color-text)",
            }}
          >
            Explore Birds
          </a>
        </div>

        <div className="lg:w-1/2">
          <img
            src="bird.svg"
            alt="Beautiful Bird"
            className="w-full rounded-xl transform transition duration-500"
            style={{ cursor: "pointer" }}
            onMouseMove={(e) => {
              const x =
                (e.nativeEvent.offsetX / e.currentTarget.offsetWidth - 0.5) *
                10;
              const y =
                (e.nativeEvent.offsetY / e.currentTarget.offsetHeight - 0.5) *
                10;
              e.currentTarget.style.transform = `rotateX(${y}deg) rotateY(${x}deg) scale(1.05)`;
            }}
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform =
                "rotateX(0) rotateY(0) scale(1)")
            }
          />
        </div>
      </div>

      <div
        className="absolute top-0 left-0 w-40 h-40 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        style={{ backgroundColor: "var(--color-success-dark)" }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-60 h-60 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-pulse"
        style={{ backgroundColor: "var(--color-primary)" }}
      ></div>

      <div
        className="absolute top-10 right-20 w-80 h-0.5 bg-white opacity-5 rotate-12"
        style={{ filter: "blur(2px)" }}
      ></div>
      <div
        className="absolute bottom-32 left-10 w-60 h-0.5 bg-white opacity-5 -rotate-6"
        style={{ filter: "blur(2px)" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/4 w-96 h-0.5 bg-white opacity-3 rotate-3"
        style={{ filter: "blur(1px)" }}
      ></div>

      <style>{`
        ${birds
          .map(
            (_, i) => `
          @keyframes flyBird${i} {
            0% { transform: translateX(0); }
            100% { transform: translateX(110vw); }
          }
        `
          )
          .join("\n")}
      `}</style>
    </section>
  );
}
