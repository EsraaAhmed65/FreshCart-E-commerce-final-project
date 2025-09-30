import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-red-500">
          No products available in this category!
        </h1>
        <p className="text-gray-600">
          Please try again later or choose another category.
        </p>
        <Link
          href="/categories"
          className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          ← Back to Categories
        </Link>
      </div>
    </div>
  );
}
