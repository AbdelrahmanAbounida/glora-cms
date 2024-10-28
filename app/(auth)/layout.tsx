import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication pages for Glora CMS",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container relative  h-full flex mx-auto items-center text-center justify-center ">
      <div className="">{children}</div>
    </div>
  );
}
