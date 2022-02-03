import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import imageUrlBuilder from '@sanity/image-url'
import {FaCheck} from 'react-icons/fa'
import {client} from '../../lib/sanity'
import {BiCopy} from 'react-icons/bi'

const Receive = ({setAction, selectedToken, walletAddress}) => {
    const[imageUrl, setImageUrl] = useState(null)
   // const[copied, setCopied] = useEffect(false)


    useEffect(() => {
            const url= imageUrlBuilder(client).image(selectedToken.logo).url();
            setImageUrl(url)
    },[selectedToken])
    
 return (
     <Wrapper>
         <Content>
             <QrCode>
                 <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250*250&data=${walletAddress}`} />
             </QrCode>
             <Divider/>
             <Row>
                 <CoinSelectlist>
                     <Icon>
                         <img src={imageUrl} />
                     </Icon>
                     <CoinName>{selectedToken.name}  {selectedToken.symbol}</CoinName>
                 </CoinSelectlist>
             </Row>
             <Divider />
             <Row>
                 <div>
                     <Title>{selectedToken.symbol} Address:</Title>
                     <Address>{walletAddress}</Address>
                 </div>
             </Row>
         </Content>
     </Wrapper>
 )
  
};

export default Receive;

const Wrapper = styled.div`
height: 100%;`

const Content= styled.div`
border: 1px solid #282b2f;
boder-radius: 0.5rem;
display:flex;
flex-direction: column;
height:100%;
`
const QrCode = styled.div`
flex:1;
display:grid;
place-items:center;
`

const Divider = styled.div`
border-bottom: 1px solid #282b2f;`

const Row= styled.div`
display:flex;
align-items:center;
justify-content:space-between;
color:#FFF01F;
padding: 1rem;
font-size:1.2rem;
`

const Icon = styled.div`
margin-right: 1rem;
height: 1.8rem;
width: 1.8rem;
border-radius: 50%;
overflow: hidden;
display: grid;
place-items: center;

&> img {
 height: 120%; 
 width: 120%; 
 object-fit:cover;
}
 `
 const CoinSelectlist =styled.div `
display: flex;
flex:1.3;
height:100%;
& : hover{
    cursor:pointer;
}
`

const CoinName = styled.div`
flex: 1;
border: none;
background: none;
outline:none; 
color:white;
font-size: 1:2rem; 
text-wrap:wrap;
margin-right: 0.5rem;
`
const Title = styled.div`
font-size: 1.7rem;
font-weight:600;
flex: 1;margin-bottom:0.56rem;
margin-left:0.78rem;
`
const Address = styled.div`
font-size:0.9rem;
margin-left:0.8rem;`


const CopyButton= styled.div`
display:flex;
cursor:pointer;`

