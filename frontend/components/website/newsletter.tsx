"use client";

export default function Newsletter() {
  return (
    <div className="relative overflow-hidden px-2   py-14 rounded-2xl bg-primary-500 ">
      <div className="relative z-10 max-w-xl mx-auto sm:text-center">
        <div className="space-y-3">
          <h3 className=" text-lg md:text-3xl text-white font-bold text-center">Subscribe to our newsletter</h3>
          <p className="text-sm md:text-base text-primary-100 leading-relaxed">Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.</p>
        </div>
        <div className="mt-6">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center justify-center bg-white rounded-lg p-1 sm:max-w-md sm:mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="text-gray-500 w-full p-2 outline-none"
            />
            <button className="p-2 px-3 rounded-lg font-medium text-white bg-primary-500 hover:bg-primary-400 active:bg-primary-700 duration-150 outline-none shadow-md focus:shadow-none sm:px-4">Subscribe</button>
          </form>
          <p className="mt-3 max-w-lg text-sm md:text-base text-primary-50">
            No spam ever, we are care about the protection of your data. Read our{" "}
            <a
              className="underline"
              href="javascript:void(0)">
              {" "}
              Privacy Policy{" "}
            </a>
          </p>
        </div>
      </div>
      {/* <div
        className="absolute inset-0 w-full h-full"
        style={{ background: "linear-gradient(268.24deg, rgba(59, 130, 246, 0.76) 50%, rgba(59, 130, 246, 0.545528) 80.61%, rgba(55, 48, 163, 0) 117.35%)" }}></div> */}
    </div>
  );
}
