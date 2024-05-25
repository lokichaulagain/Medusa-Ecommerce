"use client";
import { AxiosInstance } from "@/app/(repositories)/config";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import logo from "../../../../public/Logo.webp";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Page() {
  const pathname = usePathname();
  const token = pathname.split("/")[2];
  const router = useRouter();

  const verify = async () => {
    try {
      const res: any = await AxiosInstance.get(`/users/verify-email/${token}`);
      if (res?.status === 200) {
        toast.success(res?.data?.msg);
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="bg-white p-8 md:p-12 shadow-lg w-full md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-md">
          <div className="flex items-center justify-center rounded-full mx-24 p-4 md:p-8 mb-6">
            <Image
              src={logo}
              alt="Verification"
              className=""
            />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-2xl text-center mt-4 md:mt-6 font-semibold text-gray-600">Click on verify button to verify your email</h1>
          <h2 className="text-center mt-2 text-gray-600">
            {/* <p className="flex flex-col">
              <span>Check your inbox and click the link to activate</span>
              <span>your account.</span>
            </p> */}
          </h2>
          <div className=" flex items-center  justify-center mt-4">
            <Button
              type="button"
              onClick={verify}>
              Verify
            </Button>
          </div>

          <div className=" flex items-center justify-center mt-12 gap-4 tracking-wider font-medium  ">
            <Link
              href="/login"
              className=" underline text-simoBlue">
              Login{" "}
            </Link>
            <Link
              href={"/"}
              className="underline text-simoBlue">
              Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
