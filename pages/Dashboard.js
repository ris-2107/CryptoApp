import React, {useEffect, useState} from 'react';
import Header from '../Components/Header';
import styled from 'styled-components'
import Main from '../Components/Main'; 
import Sidebar from '../Components/Sidebar';
import {ethers} from 'ethers';
import { ThirdwebSDK } from '@3rdweb/sdk'; 


const sdk = new ThirdwebSDK(
  new ethers.Wallet( 
    process.env.NEXT_PUBLIC_METAMASK_KEY,
    ethers.getDefaultProvider('https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161')
  ));

  
function Dashboard({address}) {

  const[sanityTokens, setSanityTokens] = useState([])
  const[thirdWebTokens, setThirdWebTokens] = useState([])

 
  useEffect(() => {
    
    const getSanityAndThirdWebTokens = async() => {
        const coins = await fetch("https://msw1hav9.api.sanity.io/v1/data/query/production?query=*%5B_type%3D%3D'coins'%5D%20%7B%0A%20%20name%2C%0A%20%20usdPrice%2C%0A%20%20contractAddress%2C%0A%20%20symbol%2C%0A%20%20logo%0A%7D")
        const SanityTokens = (await coins.json()).result 
        setSanityTokens(SanityTokens)


        setThirdWebTokens(
          sanityTokens.map( token => sdk.getTokenModule(token.contractAddress))
          )  
    }

    return getSanityAndThirdWebTokens() ;
    
  },[sanityTokens,thirdWebTokens])


   return(
    <Wrapper>
      <Sidebar />
        <MainContainer>
              <Header walletAddress={address} sanityTokens={sanityTokens} thirdWebTokens={thirdWebTokens} />
              <Main  walletAddress={address} sanityTokens={sanityTokens} thirdWebTokens={thirdWebTokens} />
       </MainContainer>
      </Wrapper>
       )
}



const Wrapper = styled.div`
display: flex;
height: 100vh;
width: 100vw;
background-color: #0a0b0d;
color:white;
overflow-y:scroll;
:: -webkit-scrollbar {
  display:none;
}`

const MainContainer = styled.div`
flex:1;
padding-left: 1px;`

export default Dashboard;
