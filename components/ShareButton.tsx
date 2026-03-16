"use client";

import { useState } from "react";

interface Props {
  getUrl: () => string;
}

export default function ShareButton({ getUrl }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = getUrl();
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <button
      onClick={handleCopy}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
    >
      {copied ? "✅ Link copied! Send it to your husband" : "📋 Copy shopping list link"}
    </button>
  );
}
