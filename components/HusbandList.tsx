"use client";

import { useState } from "react";
import GroceryItem from "./GroceryItem";

interface Props {
  items: { name: string; imageUrl: string }[];
}

export default function HusbandList({ items }: Props) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  const remaining = items.length - checked.size;

  return (
    <div>
      <p className="text-center text-sm text-gray-400 mb-4">
        {remaining === 0
          ? "✅ All done! Great job!"
          : `${remaining} item${remaining !== 1 ? "s" : ""} left`}
      </p>
      <div className="space-y-3">
        {items.map((item, i) => (
          <GroceryItem
            key={i}
            name={item.name}
            imageUrl={item.imageUrl}
            checked={checked.has(i)}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </div>
  );
}
