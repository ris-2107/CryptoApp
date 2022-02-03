import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import imageUrlBuilder from '@sanity/image-url'
import {client} from '../../lib/sanity'
import {FaCheck} from 'react-icons/fa'

const CoinItem = ({
    token,
    sender,
    setAction,
    selectedToken,
    setSelectedToken,
    sanityTokens,
    thirdWebTokens,
    }) => {


    const[balance, setBalance] = useState("Loading...")
    const [imageUrl, setImageUrl] = useState(null)



  

    useEffect(()=>{
        const getBalance= async () => {
        let activeThirdWebToken

        thirdWebTokens.map(thirdWebtoken => {
            if(thirdWebtoken.address === token.contractAddress){
            activeThirdWebToken= thirdWebtoken
            }

         })

         const balance = await activeThirdWebToken.balanceOf(sender);
         return await setBalance(balance.displayValue.split('.')[0]);
        }   
        
        const getImageUrl = async () => {
            const imageUrl = imageUrlBuilder(client).image(token.logo).url();
            setImageUrl(imageUrl)
        }
        
        getImageUrl()
        getBalance()

    },[])


  return (<Wrapper
    style={{backgroundColor: selectedToken.name == token.name && '#141519', 
    }}
    onClick={() => {
    setSelectedToken(token)
    setAction('send')
  }} 
  >
      <Main>
          <Icon>
              <img src={imageUrl} alt="Crypto-Img" />
          </Icon>
          <NameDetails>
              <Name>{token.name}</Name>
              <Symbol>{token.symbol}</Symbol>
          </NameDetails>
      </Main>

      <Balance>
          {balance} {token.symbol}
       </Balance>
       <IsSelected>
           {Boolean(selectedToken.contractAddress== token.contractAddress) && (
               <FaCheck />
           )}
       </IsSelected>
  </Wrapper>);
};

export default CoinItem;

const Wrapper = styled.div`
display:flex;
align-items:center;
padding: 1rem 0.5rem;
border-radius:0.5rem;
margin-bottom:0.3rem;
border: 1px solid #7c8288;

&:hover{
    background-color:#565656;
    font-weight:600;
    color: #FE9A0A;
}
`
const Symbol = styled.div`
color:#888f9b;
font-size:0.8rem;`

const Main= styled.div`
display:flex;
flex:1;
align-items:center;`

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
const NameDetails=styled.div``


 const Name=styled.div`
 font-size:1.1rem;
 margin-bottom:0.2rem;
 `

 const Balance= styled.div``

 const IsSelected = styled.div`
 margin-left:0.6rem;
 color:#3773f5;
 `