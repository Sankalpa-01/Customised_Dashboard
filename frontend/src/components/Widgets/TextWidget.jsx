import React from "react";

const TextWidget = ({ config, onChange }) => {
  return (
    <textarea
      className="w-full h-full bg-transparent text-green-300 p-2 font-mono text-sm border-none focus:ring-0 resize-none placeholder-green-800/50 focus:bg-green-900/10 rounded"
      value={config.content}
      onChange={(e) => onChange({ ...config, content: e.target.value })}
      placeholder="// Enter system notes..."
    />
  );
};

export default TextWidget;
