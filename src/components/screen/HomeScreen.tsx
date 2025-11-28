export function HomeScreen() {
  return (
    <>
      <section
        className="relative"
        style={{
          background:
            "linear-gradient(to right, var(--accent-leaf), var(--accent-bird))",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col-reverse lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1
              className="text-4xl sm:text-5xl font-extrabold mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Discover the Wonders of Birds <br /> From Every Corner of the
              World
            </h1>
            <p
              className="text-lg sm:text-xl mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Learn, explore, and appreciate the beauty of birds with our global
              bird encyclopedia.
            </p>
            <a
              href="/birds"
              className="inline-block font-bold py-3 px-6 rounded-lg transition duration-300"
              style={{
                backgroundColor: "var(--accent-bird)",
                color: "var(--text-primary)",
              }}
            >
              Explore Birds
            </a>
          </div>

          <div className="lg:w-1/2">
            <img
              src="https://www.svgrepo.com/show/530309/bird.svg"
              alt="Beautiful Bird"
              className="w-full rounded-xl  transform hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        <div
          className="absolute top-0 left-0 w-40 h-40 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{ backgroundColor: "var(--accent-leaf)" }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-60 h-60 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"
          style={{ backgroundColor: "var(--accent-bird)" }}
        ></div>
      </section>
    </>
  );
}
