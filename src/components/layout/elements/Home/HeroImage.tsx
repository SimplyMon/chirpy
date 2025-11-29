export function HeroImage() {
  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const x = (e.nativeEvent.offsetX / e.currentTarget.offsetWidth - 0.5) * 10;
    const y = (e.nativeEvent.offsetY / e.currentTarget.offsetHeight - 0.5) * 10;
    e.currentTarget.style.transform = `rotateX(${y}deg) rotateY(${x}deg) scale(1.05)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.style.transform = "rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <div className="lg:w-1/2">
      <img
        src="bird.svg"
        alt="Beautiful Bird"
        className="w-full rounded-xl transform transition duration-500"
        style={{ cursor: "pointer" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}
