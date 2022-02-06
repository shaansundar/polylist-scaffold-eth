import Fortmatic from "fortmatic";
import WalletLink from "walletlink";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { sequence } from '0xsequence'
import { INFURA_ID, ALCHEMY_KEY } from "../constants";

// Coinbase walletLink init
const walletLink = new WalletLink({
  appName: "coinbase",
});

// WalletLink provider
const walletLinkProvider = walletLink.makeWeb3Provider(`https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`, 1);

// Portis ID: 6255fb2b-58c8-433b-a2c9-62098c05ddc9
/**
  Web3 modal helps us "connect" external wallets:
**/
const web3ModalSetup = () =>{
let providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      bridge: "https://polygon.bridge.walletconnect.org",
      infuraId: INFURA_ID,
      rpc: {
        10: "https://mainnet.optimism.io", // xDai
        100: "https://rpc.gnosischain.com", // xDai
        137: "https://polygon-rpc.com",
        31337: "http://localhost:8545",
        42161: "https://arb1.arbitrum.io/rpc",
        80001: "https://rpc-mumbai.maticvigil.com"
      },
    },
  },
  portis: {
    display: {
      logo: "https://user-images.githubusercontent.com/9419140/128913641-d025bc0c-e059-42de-a57b-422f196867ce.png",
      name: "Portis",
      description: "Connect to Portis App",
    },
    package: Portis,
    options: {
      id: "6255fb2b-58c8-433b-a2c9-62098c05ddc9",
    },
  },
  fortmatic: {
    package: Fortmatic, // required
    options: {
      key: "pk_live_5A7C91B2FC585A17", // required
    },
  },
  "custom-walletlink": {
    display: {
      logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
      name: "Coinbase",
      description: "Connect to Coinbase Wallet (not Coinbase App)",
    },
    package: walletLinkProvider,
    connector: async (provider, _options) => {
      await provider.enable();
      return provider;
    },
  },
  // authereum: {
  //   package: Authereum, // required
  // },
  "custom-sequence": {
    display: {
      logo: "https://docs.sequence.build/img/logo-dark.svg",
      name: "Sequence",
      description: "Connect to you wallet using Sequence (Mumbai only)"
    },
    package: sequence,
    options: {
      appName: 'Web3Modal Demo Dapp',
      defaultNetwork: 'mumbai'
    },
    connector: async () => {
      const wallet = new sequence.Wallet('mumbai')
      const connectDetails = await wallet.connect()
      const provider = wallet.getProvider()
      return provider;
    }
  },
}
return(
  new Web3Modal({
    network: "mainnet", // Optional. If using WalletConnect on xDai, change network to "xdai" and add RPC info below for xDai chain.
    cacheProvider: true, // optional
    theme: "dark", // optional. Change to "dark" for a dark theme.
    providerOptions: providerOptions
  }))
}
export default web3ModalSetup;
