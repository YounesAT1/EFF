import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from "@/lib/footerData";
import Image from "next/image";
import Link from "next/link";
import { currentYear } from "./CopyRight";

export const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto p-6 mt-12 flex items-center justify-center  mb-12">
      <div className=" flex w-full flex-col gap-14">
        <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
          <Link href="/" className="mb-10">
            <Image src="/travelyLogo.svg" alt="logo" width={90} height={29} />
          </Link>

          <div className="flex flex-wrap gap-10 sm:justify-between md:flex-1">
            {FOOTER_LINKS.map((column, index) => (
              <FooterColumn title={column.title} key={index}>
                <ul className="text-[14px] font-[400] flex flex-col gap-4 text-slate-700 dark:text-slate-200  text-gray-30">
                  {column.links.map((link) => (
                    <Link href="/" key={link}>
                      {link}
                    </Link>
                  ))}
                </ul>
              </FooterColumn>
            ))}

            <div className="flex flex-col gap-5">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                {FOOTER_CONTACT_INFO.links.map((link) => (
                  <Link
                    href="/"
                    key={link.label}
                    className="flex gap-4 md:flex-col lg:flex-row"
                  >
                    <div className="flex items-center gap-x-1">
                      <p className="whitespace-nowrap">{link.label}:</p>
                      <p className="text-[14px] font-[600] whitespace-nowrap ">
                        {link.value}
                      </p>
                    </div>
                  </Link>
                ))}
              </FooterColumn>
            </div>

            <div className="flex flex-col gap-5">
              <FooterColumn title={SOCIALS.title}>
                <ul className="regular-14 flex gap-4 text-gray-30">
                  {SOCIALS.links.map((link, index) => (
                    <Link href={link.url} key={index}>
                      <Image
                        src={link.logo}
                        alt="logo"
                        width={24}
                        height={24}
                      />
                    </Link>
                  ))}
                </ul>
              </FooterColumn>
            </div>
          </div>
        </div>
        <div className="border bg-gray-20 " />
        <p className="text-[14px] font-[400] w-full text-center text-gray-30">
          &copy; {currentYear} Travely. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-[18px] font-[700] whitespace-nowrap text-slate-800 dark:text-gray-100">
        {title}
      </h4>
      {children}
    </div>
  );
};
