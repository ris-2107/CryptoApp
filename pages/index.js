import styled from 'styled-components'
import { useWeb3 } from '@3rdweb/hooks'
import Dashboard from './Dashboard'




function Home() {
  const { address, connectWallet } = useWeb3()

  return (
    <Wrapper>
      { address ? (<Dashboard address= {address} />)  :

      (  <WalletConnect>
          <Button onClick={() => connectWallet('injected') }> Connect Wallet </Button>
              <Details>
                You need to be on Chrome <br />
                to use this app 
              </Details>
        </WalletConnect>)
      }
    </Wrapper> 
    )
  }


const Wrapper= styled.div`
display: flex;
height: 100vh;
max-width: 100vw;
background-color: #0a0b0d;
color: white;
display: grid;
place-items: center;
overflow:hidden`

const WalletConnect = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;`

const Button = styled.div`
border: 1px solid #282b2f;
padding: 0.8rem;
font size: 1.3rem;
font-weight: 600;
border-radius: 0.4rem;
color: #000;
background-color: #3773f5;
cursor:pointer;
`
const Details = styled.div`
font-size:1.2rem;
text-align:center;
margin-top:1rem;
font-weight:500;
color: #282b2f;`

export default Home


//cd coinbase-blockchain-app