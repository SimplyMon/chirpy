export function BackgroundEffects() {
  return (
    <>
      <div
        className="absolute top-6 left-6 w-48 h-48 rounded-full blur-2xl opacity-80"
        style={{
          background: "radial-gradient(circle, #FFD27F, #FFB347, #FF9A00)",
        }}
      />

      {/* <div
        className="absolute top-0 left-0 w-40 h-40 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        style={{ backgroundColor: "var(--color-success-dark)" }}
      /> */}
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

      <div
        className="cloud cloud-slow absolute top-20 left-0 w-72 h-28 rounded-full opacity-40 blur-2xl"
        style={{ backgroundColor: "white" }}
      />

      <div
        className="cloud cloud-medium absolute top-40 left-0 w-96 h-32 rounded-full opacity-35 blur-2xl"
        style={{ backgroundColor: "white" }}
      />

      <div
        className="cloud cloud-fast absolute top-64 left-0 w-64 h-24 rounded-full opacity-30 blur-xl"
        style={{ backgroundColor: "white" }}
      />
    </>
  );
}
