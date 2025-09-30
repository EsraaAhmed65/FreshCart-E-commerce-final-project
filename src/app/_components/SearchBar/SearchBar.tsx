"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const [value, setValue] = useState(sp.get("q") || "");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildUrl = (q: string) => {
    const params = new URLSearchParams(sp.toString());
    if (q.trim()) params.set("q", q.trim());
    else params.delete("q");
    params.delete("page");
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      router.replace(buildUrl(value), { scroll: false });
    }, 350);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [value, router, pathname, sp]); 

  return (
    <div className="w-full mb-6">
      <input
        className="w-full rounded-xl border  px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="search...."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
