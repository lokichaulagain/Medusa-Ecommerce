"use client"

export default function Page() {
  return (
    <div className=" flex justify-center items-center text-neutral-700">
      <div className=" w-10/12 flex flex-col gap-8 justify-center items-center">
        <div className=" py-10 md:flex  justify-center gap-10">
          <div>
            <main className="">
              <div className="max-w-screen-xl mx-auto  ">
                <div className="max-w-lg mx-auto space-y-3 sm:text-center">
                  <p className=" text-3xl font-semibold ">Get in touch</p>
                </div>
                <div className=" mt-5 ">
                  <form
                    // onSubmit={(e) => e.preventDefault()}
                    className="space-y-5">
                    <div className=" grid md:grid-cols-2 gap-8 ">
                      <div className=" md:w-80">
                        <input
                          type="text"
                          required
                          placeholder="User Name *"
                          className=" placeholder:text-neutral-700 w-full mt-2 px-3 py-2 text-neutral-500 bg-transparent outline-none border focus:border-primary-350 rounded-lg"
                        />
                      </div>
                      <div className=" md:w-80">
                        <input
                          type="email"
                          required
                          placeholder="Your Email  *"
                          className=" placeholder:text-neutral-700 w-full mt-2 px-3 py-2 text-neutral-500 bg-transparent outline-none border focus:border-primary-350 rounded-lg"
                        />
                      </div>
                      <div className=" md:w-80">
                        <input
                          type="text"
                          name="number"
                          required
                          placeholder="Your Phone Number"
                          className="  placeholder:text-neutral-700 w-full mt-2 px-3 py-2 text-neutral-500 bg-transparent outline-none border focus:border-primary-350 rounded-lg"
                        />
                      </div>
                      <div className=" md:w-80">
                        <input
                          type="text"
                          required
                          placeholder="Subject"
                          className="  placeholder:text-neutral-700 w-full mt-2 px-3 py-2 text-neutral-500 bg-transparent outline-none border focus:border-primary-350 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <textarea
                        required
                        placeholder="Message/Note"
                        className="  placeholder:text-neutral-700 w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-primary-350   rounded-lg"></textarea>
                    </div>
                    <div className=" flex justify-center items-center">
                      <button className="   w-full px-20 py-2 text-white font-medium bg-primary-350  rounded-lg duration-150">Submit</button>{" "}
                    </div>
                  </form>
                </div>
              </div>
            </main>
          </div>
          <div className=" md:w-5/12  md:py-0 py-4 flex flex-col gap-4">
            <h1 className="text-neutral-800 text-2xl font-semibold ">Looking for support or chat with sales?</h1>
            <span className=" text-neutral-500">If you need support with an existing Kidify issued card, please email: support@kidkify.com To talk with someone on our sales team, please Talk to an expert</span>
            <h1 className="text-neutral-800 text-3xl font-semibold ">Address</h1>
            <span className=" text-neutral-500">456 Park Avenue South, Apt 7B New York, NY 10016</span>
          </div>
        </div>
        <div>
          <iframe
            title="map"
            width="1200"
            height="450"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?your-embed-code-goes-here"
            allowFullScreen></iframe>{" "}
        </div>
      </div>
    </div>
  );
}
