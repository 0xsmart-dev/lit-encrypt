import { env } from "./env";

const {
  TESTING_MODE,
  NFT_CONTRACT_ADDRESS_TESTNET,
  TOKENID_TESTNET,
  NFT_CONTRACT_ADDRESS_MAINNET,
  TOKENID_MAINNET,
  FRONTEND_BASE_URL_DEV,
  // SERVER_BASE_URL_DEV,
  FRONTEND_BASE_URL_PROD,
  // SERVER_BASE_URL_PROD,
  UNITY_BUILD_PATH,
  LIT_CHAIN_TESTNET,
  LIT_CHAIN_MAINNET,
  UNITY_APP_NAME,
} = env;

export const testingMode = TESTING_MODE;

export const baseUrl = FRONTEND_BASE_URL_DEV;

// export const serverBaseUrl = SERVER_BASE_URL_DEV;

export const unityBuildPath = UNITY_BUILD_PATH;
export const unityBuildWasmName = UNITY_APP_NAME;
export const unityBuildDataPath = unityBuildPath;
export const chain =
  testingMode === "false" ? LIT_CHAIN_MAINNET : LIT_CHAIN_TESTNET;
export const accessControlConditions = [
  {
    contractAddress:
      testingMode === "false"
        ? NFT_CONTRACT_ADDRESS_MAINNET
        : NFT_CONTRACT_ADDRESS_TESTNET,
    standardContractType: "ERC721",
    chain,
    method: "ownerOf",
    parameters: [testingMode === "false" ? TOKENID_MAINNET : TOKENID_TESTNET],
    returnValueTest: {
      comparator: "=",
      value: ":userAddress",
    },
  },
];
/*[
  {
    contractAddress: '',
    standardContractType: '',
    chain,
    method: 'eth_getBalance',
    parameters: [
      ':userAddress',
      'latest'
    ],
    returnValueTest: {
      comparator: '>=',
      value: '10000000000000'
    }
  }
]
*/
