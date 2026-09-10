import { useEffect, useState } from "react";
import { Star } from "lucide-react";

function StarRating({ value = 0, onRate }) {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleClick = (star) => {
    setSelected(star); // Color immediately
    onRate(star);      // Save to backend
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          className="transition hover:scale-110"
        >
          <Star
            size={22}
            className={
              star <= selected
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }
          />
        </button>
      ))}
    </div>
  );
}

export default StarRating;