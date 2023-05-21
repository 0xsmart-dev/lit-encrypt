import { useState } from "react";
import Link from "next/link";
import { v4 as uuid } from "uuid";

import "@/styles/globals.css";
import Layout from "@/components/layout/Layout";
import { UUIDContext } from "@/components/contexts/context";
import ToastrProvider from "@/components/contexts/ToastrProvider";
import LoadingProvider from "@/components/contexts/LoadingProvider";

const id = uuid();
//@ts-ignore
const MyApp = ({ Component, pageProps }) => {
  const [authSig, setAuthSig] = useState(null);

  return (
    <UUIDContext.Provider
      value={{
        id,
      }}
    >
      <ToastrProvider>
        <LoadingProvider>
          <Layout>
            <div className="flex items-center gap-4 justify-center">
              <Link href="/">
                <div className="m-link p-2 px-4 border border-gray-400/50 rounded-md">
                  Home
                </div>
              </Link>
              {/* <a
                href={`/protected?id=${id}&authSig=${JSON.stringify(authSig)}`}
              >
                <div className="m-link p-2 px-4 border border-gray-400/50 rounded-md">
                  Protected
                </div>
              </a> */}
            </div>
            <div className="py-8">
              <Component setAuthSig={setAuthSig} {...pageProps} />
            </div>
          </Layout>
        </LoadingProvider>
      </ToastrProvider>
    </UUIDContext.Provider>
  );
};

export default MyApp;
