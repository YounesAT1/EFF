import React from "react";

export default function Loader() {
  return (
    <div
      className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-gray-200 dark:text-slate-800 "
      role="status"
    ></div>
  );
}
