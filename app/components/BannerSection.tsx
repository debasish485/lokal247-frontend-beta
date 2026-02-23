import Link from "next/link";

export default function BannerSection() {
  return (
    <section className="banner-section mt-15">
      {/* Background image container */}
      <div className="w-full h-52 sm:h-64 md:h-80 lg:h-96 bg-cover bg-center">
        {/* Dark green overlay */}
        <div
          className="w-full h-full bg-emerald-700/95 flex items-center"
          style={{ backgroundImage: "url('./images/bg-sub-banner.png')" }}
          role="img"
          aria-label="Decorative banner background"
        >
          {/* Content container */}
          <div className="max-w-[1400px] w-full mx-auto">
            <div>
              {/* Heading */}
              <h1 className="text-white font-extrabold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                Search Jobs
              </h1>

              {/* Breadcrumbs */}
              <nav className="mt-1 sm:mt-0" aria-label="Breadcrumb">
                <ol className="flex items-center gap-3 text-sm sm:text-base text-white/80">
                  <li>
                    <Link href="/" className="hover:underline">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="font-medium">Search jobs</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
