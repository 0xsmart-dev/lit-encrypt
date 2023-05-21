import React, { useEffect, useState, useRef, useContext } from "react";
import { saveAs } from "file-saver";
import { CopyToClipboard } from "react-copy-to-clipboard";
//@ts-ignore
import LitJsSdk from "lit-js-sdk";

import { toString as uint8arrayToString } from "uint8arrays/to-string";

import { ToastrContext } from "@/components/contexts/ToastrProvider";
import { LoadingContext } from "@/components/contexts/LoadingProvider";

import {
  chain,
  accessControlConditions,
  unityBuildWasmName,
} from "@/constants/config";

export default function Home() {
  const [docString, setDocString] = useState("");
  const [encryptedSymmetricKey, setEncryptedSymmetricKey] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const refFileInput: any = useRef(null);

  const unityFileName = unityBuildWasmName;
  const notify: any = useContext(ToastrContext);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    async function init() {
      //INIT LIT CLIENT
      const client = new LitJsSdk.LitNodeClient();
      await client.connect();
      //@ts-ignore
      window.litNodeClient = client;
    }
    init();
  }, []);
  const retrieveFile = async (e: any) => {
    setLoading("Upload File...");
    try {
      const data = e.target.files[0];
      let file = e.target.files[0].name;
      let ext = file.split(".").pop();
      if (ext !== "wasm") {
        notify.error("Please upload .wasm file.");
        return setLoading("");
      }
      let str: any = await getBase64(data);
      setDocString(str);
      notify.success("Uploaded Successfully!");
    } catch (error: any) {
      console.log(error);
      notify.error("Uploading Failed!");
    }
    setLoading("");
  };

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const encrypt = async () => {
    if (!docString) return notify.warning("Please Upload file!");
    console.log("docString", docString);
    setLoading("Encrypt File...");
    // try {
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: chain });
    console.log(authSig);
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
      docString
    );
    console.log(encryptedString);
    const encryptedStringBase64 = uint8arrayToString(
      new Uint8Array(await encryptedString.arrayBuffer()),
      "base64"
    );
    //@ts-ignore
    const encSymmetricKey = await window.litNodeClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain,
    });
    const encSymmetricStringBase64 = uint8arrayToString(
      encSymmetricKey,
      "base64"
    );
    setEncryptedSymmetricKey(encSymmetricStringBase64);
    console.log(encSymmetricStringBase64);
    setEncrypted(encryptedStringBase64);
    setLoading("");
    notify.success("Encrypted Successfully.");
    // } catch (error: any) {
    //   notify.error("Encrypting Failed.");
    // }
    setLoading("");
  };

  const downloadEncrypted = async () => {
    if (!encrypted) return notify.error("No encrypted file.");
    setLoading("Download File...");
    try {
      var blob = new Blob([encrypted], { type: "text/plain" });
      var file = new File([blob], unityFileName + ".wasm.encrypted", {
        type: "text/plain",
      });
      saveAs(file);
      notify.success("Download successfully.");
    } catch (error: any) {
      console.log(error);
    }
    setLoading("");
  };

  return (
    <section>
      <h1 className="text-4xl font-bold text-center">Encrypt wasm file</h1>
      <div className="mt-8 text-center flex flex-col gap-6">
        <div className="border border-gray-400/50 p-4">
          <div className="font-bold mb-4">Step 1: upload a file</div>
          <input
            ref={refFileInput}
            type="file"
            name="data"
            onChange={retrieveFile}
            className="hidden"
          />
          <button
            className="m-button"
            onClick={() => {
              refFileInput.current.click();
            }}
          >
            Choose file
          </button>
          {docString && (
            <div className="mt-3 m-text-overflow">
              {docString.substring(0, 40)}
            </div>
          )}
        </div>
        <div className="border border-gray-400/50 p-4">
          <div className="font-bold mb-4">Step 2: encrypt the wasm file</div>
          <button onClick={() => encrypt()} className="m-button">
            Encrypt
          </button>
          {encrypted && (
            <div className="text-green-400 mt-3">Encrypted Successfully!</div>
          )}
        </div>
        <div className="border border-gray-400/50 p-4">
          <div className="font-bold mb-4">
            Step 3 : Download the encrypted file .wasm.encrypted
          </div>
          <button onClick={() => downloadEncrypted()} className="m-button">
            Download encrypted file
          </button>
        </div>
        <div className="border border-gray-400/50 p-4">
          <div className="font-bold mb-4">
            Step 4: Grab the encrypted symmetric key if you need it somewhere
          </div>
          <div className="flex items-center gap-4 flex-col md:flex-row">
            <div
              className={
                "border border-gray-500/50 p-2 w-full m-text-overflow text-gray-400/50 " +
                (encryptedSymmetricKey && "text-green-400")
              }
            >
              {encryptedSymmetricKey || "copy encryptedSymmetricKey"}
            </div>
            <CopyToClipboard
              text={encryptedSymmetricKey}
              onCopy={() => {
                notify.success("Copied successfully");
              }}
            >
              <button className="m-button block">Copy</button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </section>
  );
}
