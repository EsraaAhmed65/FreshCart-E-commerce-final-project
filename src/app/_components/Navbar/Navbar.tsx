"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { cartContext } from "@/Context/CartContext";
import { WishlistContext } from "@/Context/WishlistContext";
import { Badge } from "@/components/ui/badge";
import logo from "../../../../public/assets/freshcart-logo.svg";

const links = [
  { href: "/", label: "Home", public: false },
  { href: "/cart", label: "Cart", public: false },
  { href: "/wishlist", label: "Wishlist", public: false },
  { href: "/allorders", label: "All Orders", public: false },
  { href: "/products", label: "Products", public: false },
  { href: "/categories", label: "Categories", public: false },
  { href: "/brands", label: "Brands", public: false },
];

const linkBase =
  "relative inline-block px-1 cursor-pointer outline-none rounded-md " +
  "transition-all duration-200 hover:text-emerald-600 focus:text-emerald-600 " +
  "after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-emerald-600 after:transition-all after:duration-200";
const linkInactive = "text-slate-800 after:w-0 hover:after:w-full";
const linkActive = "text-emerald-700 after:w-full";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { numOfCartItems } = React.useContext(cartContext);
  const wl = React.useContext(WishlistContext);

  const visibleLinks = links.filter(
    (l) => l.public || status === "authenticated"
  );

  return (
    <div className="bg-slate-100">
      <div className="w-full md:w-[80%] mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 py-6 text-center">
        <Link
          href="/"
          className="flex items-center justify-center mb-3 md:mb-0 cursor-pointer group shrink-0"
        >
          <Image
            src={logo}
            alt="logo"
            width={160}
            height={40}
            priority
            className="transition-all duration-200 group-hover:scale-[1.03]"
          />
        </Link>

        <ul className="flex flex-col md:flex-row list-none m-0 p-0 gap-y-3 md:gap-x-8 justify-center items-center">
          {visibleLinks.map((l) => {
            const active = pathname === l.href;
            const isCart = l.href === "/cart";
            const isWishlist = l.href === "/wishlist";
            return (
              <li key={l.href} className="flex items-center gap-2">
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`${linkBase} ${active ? linkActive : linkInactive}`}
                >
                  {l.label}
                </Link>

                {isCart && numOfCartItems > 0 && (
                  <Badge className="ml-0 rounded-full px-2 py-0.5 text-xs leading-none">
                    {numOfCartItems}
                  </Badge>
                )}

                {isWishlist && (wl?.numOfWishlistItems ?? 0) > 0 && (
                  <Badge className="ml-0 rounded-full px-2 py-0.5 text-xs leading-none">
                    {wl?.numOfWishlistItems}
                  </Badge>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex justify-center items-center gap-6">
            {["facebook-f", "youtube", "linkedin", "twitter"].map((icon) => (
              <i
                key={icon}
                className={`fab fa-${icon} text-lg cursor-pointer transition-all duration-200 hover:scale-110 hover:text-emerald-600`}
                aria-hidden
              />
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            {status !== "authenticated" ? (
              <>
                <Link href="/register" className={`${linkBase} ${linkInactive}`}>
                  Register
                </Link>
                <Link href="/login" className={`${linkBase} ${linkInactive}`}>
                  Login
                </Link>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className={`${linkBase} ${linkInactive} bg-transparent border-0 p-0`}
                >
                  Logout
                </button>
                <span className="text-slate-700">
                  Hi, {session?.user?.name ?? "User"}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
