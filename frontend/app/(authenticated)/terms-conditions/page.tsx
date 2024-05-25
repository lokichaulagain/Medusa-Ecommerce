"use client";
import service from "../../../public/banners/banner-1.png";
import Image from "next/image";


export default function Page() {

  return (
    <div className=" md:px-0 px-4 py-10 flex justify-center items-center">
      <div className=" md:flex gap-10   ">
        <div className=" flex flex-col gap-5 md:w-8/12">
          <h1 className="text-2xl text-gray-800 font-bold">Terms of Service</h1>
          <div className=" flex gap-3 text-sm text-gray-500">
          <span>By Jonh </span>
          <span>9 April 2020</span>
          <span>  8 mins read </span>
          </div>
          <Image  src={service} alt="" />
          <div className=" text-gray-500">
            Please read these Terms of Service (“Terms”, “Terms of Service”)
            carefully before using the https://Evara.com website (the “Service”)
            operated by Evara (“us”, “we”, or “our”).
          </div>
          <div className=" text-gray-500">
            Your access to and use of the Service is conditioned on your
            acceptance of and compliance with these Terms. These Terms apply to
            all visitors, users and others who access or use the Service.
          </div>
          <div className=" text-gray-500">
            By accessing or using the Service you agree to be bound by these
            Terms. If you disagree with any part of the terms then you may not
            access the Service.
          </div>
          <h1 className="   text-2xl text-gray-800 font-bold">
            Rights & restrictions
          </h1>
          <div className=" flex flex-col gap-4 text-gray-500">
            <span>1. Members must be at least 18 years of age.</span>
            <span>
              2. Members are granted a time-limited, non-exclusive, revocable,
              nontransferable, and non-sublicensable right to access that
              portion of the online course corresponding to the purchas
            </span>
            <span>
              3. The portion of the online course corresponding to the purchase
              will be available to the Member as long as the course is
              maintained by the Company, which will be a minimum of one year
              after Member’s purchase.
            </span>
            <span>
              4. The videos in the course are provided as a video stream and are
              not downloadable.
            </span>
            <span>
              5. By agreeing to grant such access, the Company does not obligate
              itself to maintain the course, or to maintain it in its present
              form.
            </span>
          </div>
          <h1 className="   text-2xl text-gray-800 font-bold">
            Links To Other Web Sites
          </h1>
          <div className=" text-gray-500">
            Our Service may contain links to third-party web sites or services
            that are not owned or controlled by Evara.
          </div>
          <div className=" text-gray-500">
            Evara has no control over, and assumes no responsibility for, the
            content, privacy policies, or practices of any third party web sites
            or services. You further acknowledge and agree that Evara shall not
            be responsible or liable, directly or indirectly, for any damage or
            loss caused or alleged to be caused by or in connection with use of
            or reliance on any such content, goods or services available on or
            through any such web sites or services.
          </div>
          <div className=" text-gray-500">
            We strongly advise you to read the terms and conditions and privacy
            policies of any third-party web sites or services that you visit.
          </div>
          <div className=" text-gray-500">
            All provisions of the Terms which by their nature should survive
            termination shall survive termination, including, without
            limitation, ownership provisions, warranty disclaimers, indemnity
            and limitations of liability.
          </div>
          <h1 className="text-2xl text-gray-800 font-bold">Termination</h1>
          <div className=" text-gray-500">
            We may terminate or suspend access to our Service immediately,
            without prior notice or liability, for any reason whatsoever,
            including without limitation if you breach the Terms.
          </div>
          <div className=" text-gray-500">
            All provisions of the Terms which by their nature should survive
            termination shall survive termination, including, without
            limitation, ownership provisions, warranty disclaimers, indemnity
            and limitations of liability.
          </div>
          <h1 className="text-2xl text-gray-800 font-bold">Governing Law</h1>
          <div className=" text-gray-500">
            These Terms shall be governed and construed in accordance with the
            laws of Viet Nam, without regard to its conflict of law provisions.
          </div>
          <div className=" text-gray-500">
            Our failure to enforce any right or provision of these Terms will
            not be considered a waiver of those rights. If any provision of
            these Terms is held to be invalid or unenforceable by a court, the
            remaining provisions of these Terms will remain in effect. These
            Terms constitute the entire agreement between us regarding our
            Service, and supersede and replace any prior agreements we might
            have between us regarding the Service.
          </div>
          <h1 className="   text-2xl text-gray-800 font-bold">Changes</h1>
          <div className=" text-gray-500">
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material we will try to
            provide at least 30 days notice prior to any new terms taking
            effect. What constitutes a material change will be determined at our
            sole discretion.
          </div>
          <div className=" text-gray-500">
            By continuing to access or use our Service after those revisions
            become effective, you agree to be bound by the revised terms. If you
            do not agree to the new terms, please stop using the Service.
          </div>
          <h1 className="   text-2xl text-gray-800 font-bold">Contact Us</h1>
          <div className=" text-gray-500">
            If you have any questions about these Terms, please contact us.
          </div>
        </div>
        <div className=" flex justify-start w-full md:w-3/12 flex-col gap-3">
          <div className=" border-b py-4  text-gray-700 font-bold">
            CATEGORIES
          </div>
          <div className=" grid grid-cols-1 gap-4">
            {items.map((item, index) => (
              <div key={index} className=" flex justify-between border-b">
                <span className=" text-gray-600 hover:text-[#087871] cursor-pointer py-2 ">
                  {item.name}
                </span>
                <span className=" text-gray-600">{item.number}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};



const items = [
  {
    name: "Beauty",
    number: 3,
  },
  {
    name: "Book",
    number: 5,
  },
  {
    name: "Design",
    number: 6,
  },
  {
    name: "Fashion",
    number: 2,
  },
  {
    name: "Lifestyle",
    number: 7,
  },
  {
    name: "Travel",
    number: 2,
  },
];