export default function Loader({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-transparent">
      <div className="flex flex-col items-center gap-4">
        <svg
          className="w-12 h-12 text-blue-600 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <div className="text-gray-700 dark:text-gray-300">{message}</div>
      </div>
    </div>
  );
}
