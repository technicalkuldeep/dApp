import { useWallet } from "@solana/wallet-adapter-react"
import { useConnection } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"

export function RequestAirdrop() {
  const wallet = useWallet()
  const { connection } = useConnection()

  async function requestAirdrop() {
    const amount = document.getElementById("amount").value
    await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL)
    alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58())
  }

  return (
    <div>
      <input id="amount" type="text" placeholder="Amount" className="wallet-input" />
      <button onClick={requestAirdrop} className="wallet-button">
        Request Airdrop
      </button>
    </div>
  )
}

