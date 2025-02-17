import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"

export function SendTokens() {
  const wallet = useWallet()
  const { connection } = useConnection()

  async function sendTokens() {
    try {
      const to = document.getElementById("to").value
      const amount = document.getElementById("amount").value

      if (!to || !amount) {
        alert("Please fill in both recipient address and amount")
        return
      }

      const transaction = new Transaction()
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(to),
          lamports: amount * LAMPORTS_PER_SOL,
        }),
      )

      await wallet.sendTransaction(transaction, connection)
      alert("Successfully sent " + amount + " SOL to " + to)

      // Clear inputs after successful transaction
      document.getElementById("to").value = ""
      document.getElementById("amount").value = ""
    } catch (error) {
      alert("Error: " + error.message)
    }
  }

  return (
    <div className="send-form">
      <div className="input-group">
        <label htmlFor="to" className="input-label">
          Recipient Address
        </label>
        <input id="to" type="text" placeholder="Enter Solana address" className="wallet-input" />
      </div>
      <div className="input-group">
        <label htmlFor="amount" className="input-label">
          Amount (SOL)
        </label>
        <input id="amount" type="number" step="0.001" min="0" placeholder="0.00" className="wallet-input" />
      </div>
      <button onClick={sendTokens} className="wallet-button">
        Send SOL
      </button>
    </div>
  )
}

