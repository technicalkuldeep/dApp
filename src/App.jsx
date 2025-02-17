"use client"

import { useMemo } from "react"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"
import "@solana/wallet-adapter-react-ui/styles.css"
import { RequestAirdrop } from "./Airdrop"
import { ShowSolBalance } from "./Balance"
import { SendTokens } from "./SendSol"
import "./App.css"

function App() {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/Dygzk261CGROH6zBz_Om7Ho0SLnNDW0x"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="wallet-container">
            <div className="wallet-header">
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
            <div className="wallet-content">
              <div className="wallet-card">
                <h2>Request Airdrop</h2>
                <RequestAirdrop />
              </div>
              <div className="wallet-card">
                <h2>Wallet Balance</h2>
                <ShowSolBalance />
              </div>
              <div className="wallet-card send-card">
                <h2>Send SOL</h2>
                <SendTokens />
              </div>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App

