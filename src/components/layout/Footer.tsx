import React from "react";
import Link from "next/link";

import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";

import Logo from "@/components/app/Logo";
import { dFooter, dSocialLink } from "@/constants/global";

const Footer = () => {
  return (
    <footer className="bg-green-100 dark:bg-neutral-950/80 p-10 w-full">
      <div className="flex justify-evenly flex-col md:flex-row gap-6">
        <div>
          <Logo color={"green"} className="mx-auto md:mx-0"></Logo>
          <div className="mt-5 text-center md:text-left">
            Lit protocol login for Unity Experiences
          </div>
          <div className="flex gap-4 mt-3 justify-center md:justify-start">
            <a href={dSocialLink.discord}>
              <FaDiscord className="w-6 h-6 cursor-pointer" />
            </a>
            <a href={dSocialLink.twitter}>
              <FaTwitter className="w-6 h-6 cursor-pointer" />
            </a>
            <a href={dSocialLink.github}>
              <FaGithub className="w-6 h-6 cursor-pointer" />
            </a>
          </div>
        </div>
        {dFooter.map((items) => {
          return (
            <div
              key={`footer-${items.header}`}
              className="flex flex-col gap-4 text-center md:text-left"
            >
              <div className="font-semibold text-xl">{items.header}</div>
              {items.links.map((linkItem) => {
                return (
                  <Link href={linkItem.url} key={linkItem.text}>
                    <div className="m-link">{linkItem.text}</div>
                  </Link>
                );
              })}
            </div>
          );
        })}
        <div>
          <div className="font-semibold text-xl text-center md:text-left">
            Stay up to date
          </div>
          <div className="flex items-center gap-3 mt-5 justify-center md:justify-start">
            <input placeholder="Your email address" className="m-input"></input>
            <button className="bg-green-300 rounded-md p-2  hover:bg-green-400 m-color-transition">
              <BiMailSend className="w-6 h-6 text-gray-600"></BiMailSend>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
