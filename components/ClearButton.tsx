"use client";

interface ClearButtonProps {
  onClear: () => void;
  disabled?: boolean;
  className?: string;
}

export default function ClearButton({
  onClear,
  disabled = false,
  className = "",
}: ClearButtonProps) {
  return (
    <button
      onClick={onClear}
      disabled={disabled}
      className={`rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400 ${className}`}
    >
      🗑️ Clear
    </button>
  );
}