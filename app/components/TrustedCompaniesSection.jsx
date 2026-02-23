"use client";

export default function TrustedCompaniesSection() {
    return (
        <section className="w-full py-16">
            <div className="max-w-[1692px] mx-auto px-4 text-center">

                {/* Heading */}
                <h2
                    className="mx-auto text-center font-medium text-[20px] leading-[40px]"
                    style={{
                        width: "511px",
                        height: "80px",
                        fontFamily: "Font1",
                        opacity: 1,
                    }}
                >
                    Join over 2,000 companies around the world that trust the <br />
                    <span className="text-emerald-700">
                        Job Stock
                    </span>{" "}
                    platforms.
                </h2>

                {/* Boxes */}
                <div className="flex justify-between items-center h-[83px]">

                    {/* Box 1 */}
                    <div className="w-[338.4px] h-[63px] px-2 pt-4 flex items-center justify-center">
                        <img
                            src="/images/layar-primary.svg"
                            alt="Layer"
                            className="h-full object-contain"
                        />
                    </div>

                    {/* Box 2 */}
                    <div className="w-[338.4px] h-[63px] px-2 pt-4 flex items-center justify-center ">
                        <img
                            src="/images/mailchimp-primary.svg"
                            alt="Mailchimp"
                            className="h-full object-contain"
                        />
                    </div>

                    {/* Box 3 */}
                    <div className="w-[338.4px] h-[63px] px-2 pt-4 flex items-center justify-center ">
                        <img
                            src="/images/fitbit-primary.svg"
                            alt="Fitbit"
                            className="h-full object-contain"
                        />
                    </div>

                    {/* Box 4 */}
                    <div className="w-[338.4px] h-[63px] px-2 pt-4 flex items-center justify-center">
                        <img
                            src="/images/capsule-primary.svg"
                            alt="Capsule"
                            className="h-full object-contain"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
