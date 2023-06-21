import {parseEther} from "ethers"
import MULTI_SIG_WALLET_ABI from "../constants/walletAbi.json"
import { useWeb3Contract } from "react-moralis"
import { useState } from "react"
import { error, success } from "../utils/toastWrapper";

const Deposit = ({walletAddress, handleLoading, balance, updateBalance}) => {
    const [depositValue, setDepositValue] = useState("")

    const {runContractFunction: deposit} = useWeb3Contract({
        abi: MULTI_SIG_WALLET_ABI,
        contractAddress: walletAddress,
        functionName: "deposit",
        msgValue: parseEther(`${depositValue || 0}`)
    })

    const handleDepositChange = (e)=>{
        setDepositValue(e.target.value)
    }


    const handleDeposit = async(e)=>{
        e.preventDefault()
        if(!depositValue || depositValue==="0") return error("Deposit value cannot be empty or 0")
        handleLoading(true)
        await deposit({
            onSuccess: handleDepositSuccess,
            onError: (e)=>{
                error(e.message)
                handleLoading(false)
            }
        })
    }

    async function handleDepositSuccess(tx){
        success(`Depositing ${depositValue} ETH`)
        await tx.wait(1)
        await updateBalance()
        handleLoading(false)
        setDepositValue("")
        success(`Deposited - Your New Balance is ${balance}`)
    }

    return ( 
        <div onSubmit={handleDeposit} className="wallet__deposit container">
            <form className="container">
                <h2 style={{textAlign: "center", fontWeight: "lighter", marginBottom: "10px"}}>Wallet Balance</h2>
                <h1 style={{marginBottom: "10px"}} className="text--yellow">{balance} ETH</h1>
                <div>
                    <input value={depositValue} onChange={handleDepositChange} placeholder="value in ETH" name="deposit" type="number" />
                    <button className="btn btn--small">Deposit</button>
                </div>
            </form>
        </div>
     );
}
 
export default Deposit;