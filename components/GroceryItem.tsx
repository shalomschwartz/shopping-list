"use client";

interface Props {
  name: string;
  imageUrl: string;
  checked: boolean;
  onToggle: () => void;
}

export default function GroceryItem({ name, imageUrl, checked, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-center gap-4 p-4 rounded-2xl shadow-sm transition-all text-left ${
        checked
          ? "bg-green-50 border-2 border-green-400 opacity-70"
          : "bg-white border-2 border-transparent"
      }`}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={name}
          className={`w-20 h-20 object-cover rounded-xl flex-shrink-0 transition-all ${
            checked ? "grayscale" : ""
          }`}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/80x80?text=?";
          }}
        />
      ) : (
        <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
          🛍️
        </div>
      )}

      <div className="flex-1">
        <p
          className={`text-lg font-semibold capitalize ${
            checked ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {name}
        </p>
        <p className="text-sm text-gray-400 mt-0.5">
          {checked ? "✅ Got it!" : "Tap when found"}
        </p>
      </div>

      <div
        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
          checked
            ? "bg-green-400 border-green-400 text-white"
            : "border-gray-200"
        }`}
      >
        {checked && "✓"}
      </div>
    </button>
  );
}
