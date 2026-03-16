"use client";

import { useState } from "react";
import { GroceryItemData } from "@/app/page";

interface Props {
  onAdd: (item: GroceryItemData) => void;
}

export default function ItemForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageOptions, setImageOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageIndex, setImageIndex] = useState(0);

  async function fetchImages(query: string) {
    setLoading(true);
    setError("");
    setImageOptions([]);
    setImageUrl("");
    setImageIndex(0);
    try {
      const res = await fetch(`/api/image?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.images?.length) {
        setImageOptions(data.images);
        setImageUrl(data.images[0]);
      } else {
        setError("No image found — try searching with a different word below.");
      }
    } catch {
      setError("Could not fetch image.");
    } finally {
      setLoading(false);
    }
  }

  function handleNameBlur() {
    if (name.trim()) {
      setSearchTerm(name.trim());
      fetchImages(name.trim());
    }
  }

  function handleNameKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && name.trim()) {
      setSearchTerm(name.trim());
      fetchImages(name.trim());
    }
  }

  function handleRetrySearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchTerm.trim()) fetchImages(searchTerm.trim());
  }

  function tryNextImage() {
    const next = imageIndex + 1;
    if (next < imageOptions.length) {
      setImageIndex(next);
      setImageUrl(imageOptions[next]);
    }
  }

  function handleAdd() {
    if (!name.trim()) return;
    onAdd({ name: name.trim(), imageUrl });
    setName("");
    setImageUrl("");
    setImageOptions([]);
    setImageIndex(0);
    setSearchTerm("");
    setError("");
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleNameBlur}
          onKeyDown={handleNameKeyDown}
          placeholder="e.g. whole milk, sourdough bread…"
          spellCheck={true}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleAdd}
          disabled={!name.trim()}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-200 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          Add
        </button>
      </div>

      {loading && (
        <p className="text-sm text-gray-400 animate-pulse">Finding photo…</p>
      )}

      {(imageUrl || error) && (
        <div className="space-y-3">
          {imageUrl && (
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={name}
                className="w-20 h-20 object-cover rounded-xl border border-gray-100"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/80x80?text=?";
                }}
              />
              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-400">Photo preview</p>
                {imageOptions.length > 1 && imageIndex < imageOptions.length - 1 && (
                  <button
                    onClick={tryNextImage}
                    className="text-xs text-blue-500 hover:underline text-left"
                  >
                    Try a different photo →
                  </button>
                )}
              </div>
            </div>
          )}

          {error && <p className="text-sm text-orange-400">{error}</p>}

          {/* Search differently */}
          <form onSubmit={handleRetrySearch} className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search with a different word…"
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl text-gray-600 font-medium"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
