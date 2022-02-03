import React, {useState} from 'react';
import styled from 'styled-components';
import Transfer from'./Transfer'
import Coinselector from './Coinselector';
import {TailSpin} from  'react-loader-spinner'
import Receive from './Receive';


const TransferModal = ({sanityTokens, thirdWebTokens, walletAddress }) => {

    const [action, setAction] = useState('send')
    const [selectedToken, setSelectedToken] = useState(sanityTokens[0])
    console.log(sanityTokens,"From->TransferModal")


    const selectedStyle = {
        color:'#24ff24' ,
    }
    const unselectedStyle = {
        border: '1px solid #b2f786'
    }

    const selectedModal =(option) => {
        switch(option){

        case 'send':
            return <Transfer selectedToken={ selectedToken }
            setAction={setAction} 
            thirdWebTokens={thirdWebTokens} 
            walletAddress={walletAddress} />

        case'Receive':
            return <Receive
            setAction={setAction}
            selectedToken={selectedToken} 
            walletAddress={walletAddress} />
 

        
        case'select':
           return <Coinselector
            setAction={setAction}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            sanityTokens={sanityTokens}
            thirdWebTokens={thirdWebTokens}
            walletAddress />

        case'transferring':
            return<div
            style={{width: '100%',
                    height: '100%',
                    display:'flex',
                    flexDirection: 'column',
                    justifyContent:'center',
                    alignItems: 'center',
                    fontSize: '1.5rem'
                }}
            
            > 
            <h2>Transfer In Progress...</h2>
            <TailSpin
            height='100'
            width='100'
            color='#24ff24'
            ariaLabel='Transfering!!'
             />
            </div>

        case'transfered':
            return<div
            style={{width: '100%',
            height: '100%',
            display:'flex',
            justifyContent:'center',
            alignItems: 'center',
            fontSize: '2rem',
            fontWeight:'600',
            color:'#24ff24',
        }}>
            Transfer Complete!
            </div>
            

        default:
            return <h2>Send</h2>
        }
    }

  return (
      <Wrapper>
          <Selector>
              <Option style={ action==='send' ? selectedStyle : unselectedStyle } onClick={() => setAction('send')}>
                <p>Send</p>
          </Option>
          
          <Option style={ action==='Receive' ? selectedStyle : unselectedStyle }  onClick={()=> setAction('Receive')}>
          <p>Receive</p>
          </Option>
          </Selector>
          <ModalMain>
              {selectedModal(action)}
          </ModalMain>
      </Wrapper>
  )
};

export default TransferModal;

const Wrapper = styled.div`
height: 35rem;
width:27rem;
color: white;
border: 1px solid #7c8288;
display: flex;
flex-direction: column;`


const Selector = styled.div`
display:flex;
justify-content:space-evenly;
align-items:center;
height:5rem;`


const Option = styled.div`
height: 100%;
width: 100%;
display: grid; 
place-items: center;
font-size: 1.2rem; 
font-weight: 600;
&:hover {
    cursor: pointer;
    background-color:#FE9A0A;
    font-weight:700;
}
`
const ModalMain = styled.div`
padding:1 rem;
flex:1;
`
