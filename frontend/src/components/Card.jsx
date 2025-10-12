import React from "react";

export default function Card({ 
  title, 
  subtitle, 
  children, 
  footer, 
  onClick, 
  className = "" 
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all duration-200 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 cursor-pointer ${className}`}
    >
      {title && (
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {subtitle}
        </p>
      )}
      <div className="text-gray-700 dark:text-gray-300">
        {children}
      </div>
      {footer && (
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
          {footer}
        </div>
      )}
    </div>
  );
}
