interface Props {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
  disabled?: boolean;
}

const formatLabel = (category: string) => {
  if (/\s/.test(category)) return category;
  return category.charAt(0).toUpperCase() + category.slice(1);
};

export default function CategoryFilter({
  categories,
  active,
  onChange,
  disabled,
}: Props) {
  const chips = ["", ...categories];

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {chips.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat || "all"}
            onClick={() => !disabled && onChange(cat)}
            disabled={disabled}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
              disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            }`}
            style={{
              backgroundColor: isActive
                ? "var(--color-success)"
                : "var(--color-card-dark)",
              color: isActive ? "#ffffff" : "var(--color-text-secondary)",
              borderColor: isActive
                ? "var(--color-success)"
                : "var(--color-border-dark)",
            }}
          >
            {cat ? formatLabel(cat) : "All"}
          </button>
        );
      })}
    </div>
  );
}
