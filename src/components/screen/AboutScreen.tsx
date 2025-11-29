import bro1 from "../../assets/images/bro1.svg";
import bro from "../../assets/images/bro.svg";

export function AboutScreen() {
  return (
    <section
      className="relative overflow-hidden min-h-screen"
      style={{
        background: `linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(31,41,55,0.95) 100%)`,
      }}
    >
      <div
        className="absolute top-0 left-0 w-32 h-32 sm:w-40 sm:h-40 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        style={{ backgroundColor: "var(--color-success-dark)" }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-48 h-48 sm:w-60 sm:h-60 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-pulse"
        style={{ backgroundColor: "var(--color-primary)" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 relative z-10 flex flex-col gap-16">
        <div className="text-center">
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-4"
            style={{ color: "var(--color-text)" }}
          >
            About
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            I built this app to explore my love of birds and share it with
            others. It’s a simple space to learn, document, and enjoy the beauty
            of birds from around the world.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={bro1}
              alt="Why I Built This"
              className="w-full max-w-md rounded-xl transform transition duration-500 hover:scale-105"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ color: "var(--color-text)" }}
            >
              Why I Built This
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              Birds have always fascinated me, especially my albino cockatiel,{" "}
              <strong>Piko</strong>. Spending time with Piko made me curious to
              learn more about birds, which inspired me to create this app as a
              place to explore and share that curiosity.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={bro}
              alt="How This Started"
              className="w-full max-w-md rounded-xl transform transition duration-500 hover:scale-105"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ color: "var(--color-text)" }}
            >
              How This Started
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              This began as a small experiment to track and learn about birds.
              Over time, I turned it into an interactive platform that combines
              my love of nature with web development—something fun, simple, and
              personal that reflects my curiosity and Piko’s inspiration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
