export function BackgroundEffects() {
  return (
    <>
      <div
        className="absolute top-0 left-0 w-40 h-40 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        style={{ backgroundColor: "var(--color-success-dark)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-60 h-60 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-pulse"
        style={{ backgroundColor: "var(--color-primary)" }}
      />
      <div
        className="absolute top-10 right-20 w-80 h-0.5 bg-white opacity-5 rotate-12"
        style={{ filter: "blur(2px)" }}
      />
      <div
        className="absolute bottom-32 left-10 w-60 h-0.5 bg-white opacity-5 -rotate-6"
        style={{ filter: "blur(2px)" }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-96 h-0.5 bg-white opacity-3 rotate-3"
        style={{ filter: "blur(1px)" }}
      />
    </>
  );
}
