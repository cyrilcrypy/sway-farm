import { useState } from "react";
import { ContractAbi } from "../contracts";
import { Button, Spinner } from "@fuel-ui/react";

interface NewPlayerProps {
    contract: ContractAbi | null;
}

export default function NewPlayer({ contract }: NewPlayerProps){
    const [status, setStatus] = useState<'success' | 'error' | 'loading' | 'none'>('none');
    async function handleNewPlayer(){
        if (contract !== null) {
            try {
                setStatus('loading')
                await contract.functions.new_player()
                .txParams({ variableOutputs: 1 })
                .call();

                setStatus('success')
            } catch(err){
                console.log("Error:", err)
                setStatus('error')
            }
        } else {
            console.log("ERROR: contract missing");
            setStatus('error')
        }
    }

    return (
        <>
        {status === 'loading' && <Spinner/>}
        {status === 'error' && <div>Something went wrong, try again</div>}
        {status === 'success' && <div>Success! Refresh the page</div>}
        {status === 'none' &&
            <Button onPress={handleNewPlayer}>Make A New Player</Button>
        }
        </>
    )
}