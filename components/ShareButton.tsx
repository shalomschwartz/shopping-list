"use client";

import { useState } from "react";

interface Props {
  getUrl: () => string;
}

export default function ShareButton({ getUrl }: Props) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    const generated = getUrl();
    setUrl(generated);
    try {
      await navigator.clipboard.writeText(generated);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard failed — URL is shown in the input below for manual copy
    }
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleGenerate}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
      >
        {copied ? "✅ Link copied! Send it to your husband" : "📋 Generate & copy shopping list link"}
      </button>

      {url && (
        <div className="flex gap-2">
          <input
            readOnly
            value={url}
            onFocus={(e) => e.target.select()}
            className="flex-1 text-xs border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 text-gray-600 truncate"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(url).catch(() => {});
              setCopied(true);
              setTimeout(() => setCopied(false), 2500);
            }}
            className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl text-gray-600 font-medium"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
