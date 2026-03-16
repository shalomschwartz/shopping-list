"use client";

import { useState } from "react";
import ItemForm from "@/components/ItemForm";
import ShareButton from "@/components/ShareButton";

export interface GroceryItemData {
  name: string;
  imageUrl: string;
}

export default function Home() {
  const [items, setItems] = useState<GroceryItemData[]>([]);

  function addItem(item: GroceryItemData) {
    setItems((prev) => [...prev, item]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function getShareUrl() {
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(items))));
    return `${window.location.origin}/list/${encoded}`;
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🛒 Grocery Helper</h1>
        <p className="text-gray-500 mt-2">
          Build a visual shopping list for your husband
        </p>
      </div>

      <ItemForm onAdd={addItem} />

      {items.length > 0 && (
        <>
          <div className="mt-6 space-y-3">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-3"
              >
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/64x64?text=?";
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    🛍️
                  </div>
                )}
                <span className="flex-1 font-medium text-gray-700 capitalize">
                  {item.name}
                </span>
                <button
                  onClick={() => removeItem(i)}
                  className="text-gray-300 hover:text-red-400 transition-colors text-xl"
                  aria-label="Remove"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <ShareButton getUrl={getShareUrl} />
          </div>
        </>
      )}
    </main>
  );
}
