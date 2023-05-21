import React from "react";
import Head, { MetaProps } from "./Head";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Extends `window` to add `ethereum`.
declare global {
  interface Window {
    ethereum: any;
  }
}
// Title text for the various transaction notifications.
const TRANSACTION_TITLES = {
  transactionStarted: "Local Transaction Started",
  transactionSucceed: "Local Transaction Completed",
};

/**
 * Prop Types
 */
type LayoutProps = {
  children: React.ReactNode;
  customMeta?: MetaProps;
};

const Layout = ({ children, customMeta }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head customMeta={customMeta} />
      <Navbar />
      <main className="pt-24 w-full max-w-[560px] mx-auto px-4">
        <div>{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
