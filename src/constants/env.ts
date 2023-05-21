export const env = {
  TESTING_MODE: process.env.TESTING_MODE ?? "true",
  //FRONTEND VARIABLES
  NFT_CONTRACT_ADDRESS_TESTNET:
    process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS_TESTNET ??
    "0xff4fb093028d1e4be9f72936eadb386a79ab86f9",
  TOKENID_TESTNET: process.env.NEXT_PUBLIC_TOKENID_TESTNET ?? "4",
  NFT_CONTRACT_ADDRESS_MAINNET:
    process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS_MAINNET ??
    "0xff4fb093028d1e4be9f72936eadb386a79ab86f9",
  TOKENID_MAINNET: process.env.NEXT_PUBLIC_TOKENID_MAINNET ?? "8",
  FRONTEND_BASE_URL_DEV:
    process.env.FRONTEND_BASE_URL_DEV ?? "http://localhost:3000/",
  FRONTEND_BASE_URL_PROD:
    process.env.FRONTEND_BASE_URL_PROD ??
    "https://lit-unity-serverless-oconnor.vercel.app/",

  LIT_CHAIN_TESTNET: process.env.LIT_CHAIN_TESTNET ?? "mumbai",
  LIT_CHAIN_MAINNET: process.env.LIT_CHAIN_MAINNET ?? "mumbai",

  //SERVER VARIABLES
  UNITY_APP_NAME: process.env.NEXT_PUBLIC_UNITY_APP_NAME ?? "tetrisdemoone",
  UNITY_BUILD_PATH: process.env.UNITY_BUILD_PATH ?? "/unitybuild/test/",
};
