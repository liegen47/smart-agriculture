import { Separator } from "@/components/ui/separator";
import { Dribbble, Github, Twitch, Twitter } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Features",
    href: "/features",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
  },
];

const Footer = () => {
  return (
    <div className="flex flex-col">
      <div className="grow bg-muted" />
      <footer>
        <div className="max-w-screen-xl mx-auto">
          <div className="py-12 flex flex-col justify-start items-center">
            {/* Replace the logo with your project's logo */}
            <div className="text-2xl font-bold text-foreground">
              NatureSense
            </div>

            {/* Footer Links */}
            <ul className="mt-6 flex items-center gap-4 flex-wrap">
              {footerLinks.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-foreground font-medium"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Separator />

          {/* Copyright and Social Media Links */}
          <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
            {/* Update the copyright text */}
            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" target="_blank">
                NatureSense
              </Link>
              . All rights reserved.
            </span>

            {/* Update social media links and icons */}
            <div className="flex items-center gap-5 text-muted-foreground">
              <Link href="https://twitter.com/naturesense" target="_blank">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://github.com/naturesense" target="_blank">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://dribbble.com/naturesense" target="_blank">
                <Dribbble className="h-5 w-5" />
              </Link>
              <Link href="https://twitch.tv/naturesense" target="_blank">
                <Twitch className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
