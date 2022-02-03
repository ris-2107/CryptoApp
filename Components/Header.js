import React from 'react';
import styled from 'styled-components'
import Modal from 'react-modal';
import router, { useRouter } from 'next/router'
import TransferModal from './modal/TransferModal';
import Link from'next/link'

Modal.setAppElement('#__next')


function Header({walletAddress, sanityTokens,thirdWebTokens}) {
    const router = useRouter()
    const customStyles = {

        content:{
        top:'50%',
        left:'50%',
        right:'auto',
        bottom:'auto',
        transform:'translate(-50%, -50%)',
        backgroundColor:'#0a0b0d',
        padding:'0',
        border:'none',
    },
    overlay:{
        backgroundColor:'rgba(10, 11, 13, 0.75)',
    },
}


    return(
        <Wrapper>
            <Title style={ {margin:2} }> Assets</Title>
            <ButtonsContainer style={{  margin: 3}}>
                {walletAddress ? (
                    <WalletLink>
                    <WalletLinkTitle>Wallet Connected!</WalletLinkTitle>
                    <WalletAddress>{walletAddress.slice(0,8)}...{walletAddress.slice(33)} </WalletAddress>
                        
                </WalletLink>
                ) : (
                <Button onClick={() => connectWallet('injected')}>
                    Connect wallet
                </Button>)}
                
                <Button style={{ color:'white', margin: 3}}>Buy/Sell</Button>
                <Link href={'/?transfer=1'}>
                <Button style={{ backgroundColor: ' #24ff24', color:'#000'}}>Send/Receive</Button>
                </Link>
            </ButtonsContainer>
            <Modal
            isOpen={!!router.query.transfer}
            onRequestClose={() => router.push('/')}
            style={customStyles}
            
            >

                    <TransferModal sanityTokens={sanityTokens} thirdWebTokens={thirdWebTokens}
                    
                    walletAddress={walletAddress}/> 
            </Modal>
        </Wrapper>
    )
}

export default Header;
 
const Wrapper= styled.div`
width: calc(100%- 3rem); 
padding: 1rem 1.5rem;
border-bottom: 0.5px solid #282b3f;
display: flex;
align-items: center;`


const Title = styled.div`
font-size: 2rem;
font-weight:600;
flex: 1;
margin: 2rem;
`

const Button = styled.div`
border: 1px solid #282b2f;
padding: 0.8rem;
font size: 1.3rem;
font-weight: 600;
border-radius: 0.4rem;
margin-right: 1rem;
cursor:pointer;`

const ButtonsContainer = styled.div`
display:flex;
`

const WalletLink= styled.div`
font-size: 1.25rem;
border: 1px solid #282b2f;
border-radius: 50rem;
font-size: 1.2rem; margin-right: 1rem;
padding: 0 1rem;
display: flex;
flex-direction: column;
align-items:flex-start;
justify-content: center;`


const WalletLinkTitle = styled.div`
font-size: 1.2rem;
margin-bottom: 0.3rem;
color: #24ff24;
font-weight: 700;`

const WalletAddress = styled.div`
color:#FFF01F;
align-items:space-between;
margin-left:1.06vw;
font-size: 0.75rem;`