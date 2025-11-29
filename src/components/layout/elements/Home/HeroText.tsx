export function HeroText() {
  return (
    <div className="lg:w-1/2 text-center lg:text-left">
      <h1
        className="text-4xl sm:text-5xl font-extrabold mb-6 transition-transform duration-300"
        style={{ color: "var(--color-text)" }}
      >
        Discover the Wonders of Birds <br /> From Every Corner of the World
      </h1>
      <p
        className="text-lg sm:text-xl mb-8"
        style={{ color: "var(--color-text-secondary)" }}
      >
        Learn, explore, and appreciate the beauty of birds with our global bird
        encyclopedia.
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
  );
}
