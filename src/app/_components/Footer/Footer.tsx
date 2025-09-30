import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f7f8fa] py-10">
      <div className="w-full md:w-[80%] mx-auto px-4">
        <h2 className="text-3xl md:text-[38px] font-semibold text-slate-800">
          Get the FreshCart app
        </h2>
        <p className="text-slate-600 mt-2">
          We will send you a link, open it on your phone to download the app.
        </p>
        <div className="mt-6 flex gap-3">
          <input
            type="email"
            placeholder="Email .."
            className="h-12 flex-1 rounded-md border border-slate-300 px-3 text-base
                       focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <button
            type="button"
            title="Coming soon"
            className="shrink-0 h-12 px-6 rounded-md bg-emerald-600 text-white text-base
                       font-medium hover:bg-emerald-700 transition-colors"
          >
            Share App Link
          </button>
        </div>

        {/* Partners & Stores */}
        <div className="mt-8 border-t border-slate-200 pt-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left: payment partners */}
            <div className="w-full flex items-center gap-6">
              <span className="text-slate-700 font-medium whitespace-nowrap">
                Payment Partners
              </span>
              <ul className="flex items-center gap-6">
                <li>
                  <Image
                    src="/assets/Amazon_Pay_logo.svg.png"
                    alt="Amazon Pay"
                    width={90}
                    height={28}
                    className="object-contain"
                  />
                </li>
                <li>
                  <Image
                    src="/assets/Mastercard-logo.svg"
                    alt="Mastercard"
                    width={58}
                    height={36}
                    className="object-contain"
                  />
                </li>
                <li>
                  <Image
                    src="/assets/paypal.svg"
                    alt="PayPal"
                    width={82}
                    height={32}
                    className="object-contain"
                  />
                </li>
              </ul>
            </div>

            {/* Right: stores */}
            <div className="w-full flex items-center justify-start lg:justify-end gap-4">
              <span className="text-slate-700 whitespace-nowrap">
                Get deliveries with FreshCart
              </span>
              <ul className="flex items-center gap-3">
                <li>
                  <Link href="#" aria-label="Get it on Google Play">
                    <Image
                      src="/assets/en_badge_web_generic.png"
                      alt="Google Play"
                      width={180}
                      height={48}
                      className="object-contain"
                    />
                  </Link>
                </li>
                <li>
                  <Link href="#" aria-label="Download on the App Store">
                    <Image
                      src="/assets/Download_on_the_App_Store_Badge.svg.png"
                      alt="App Store"
                      width={160}
                      height={48}
                      className="object-contain"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
