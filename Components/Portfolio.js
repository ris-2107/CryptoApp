import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import  {BsThreeDotsVertical} from 'react-icons/bs'
import {coins} from '../static/coins';
import Coin from './Coin'
import Balancechart from './Balancechart';
import {ethers} from 'ethers';
import { ThirdwebSDK } from '@3rdweb/sdk'; 



const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.NEXT_PUBLIC_METAMASK_KEY,
    ethers.getDefaultProvider('https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161')
  ));




function Portfolio ({ thirdWebTokens, sanityTokens, walletAddress }) {
  //console.log(thirdWebTokens, "<< 3rdweb -portfolio page")
  //thirdWebTokens[0].balanceOf(walletAddress).then(balance => console.log(Number(balance.displayValue)))   
  //convert all tokens to USD:

 const [walletBalance, setWalletBalance] =useState(0)
 const tokenToUSD={}
 
 


for(const token of sanityTokens){
   tokenToUSD[token.contractAddress] = Number(token.usdPrice)
}

 //console.table(tokenToUSD)

 useEffect(() => {
  const calculateTotalBalance = async () => {
    const totalBalance =await Promise.all(
      thirdWebTokens.map(async token => {
        const balance = await token.balanceOf(walletAddress)
        return Number(balance.displayValue) * tokenToUSD[token.address]
         
      })
    ) 
    console.table(totalBalance, "total balance")
    setWalletBalance(totalBalance.reduce((acc, curr)=> acc +curr, 0))
  }
  
  return calculateTotalBalance()
  
  }, [thirdWebTokens, sanityTokens])
  
  

  var baln = 34056;
  function increment() {
    baln=baln+334;
    {walletBalance.toLocaleString()}
  } 
  setInterval(increment, 988709);

  return (
  <Wrapper>
    <Content>
      <Chart>
        <div>
          <Balance>
            <BalanceTitle>Portfolio balance</BalanceTitle>   
             <Balancevalue>{'$'} {walletBalance.toLocaleString()} </Balancevalue>    {/* */}

            </Balance>
        </div>
        <Balancechart/>
      </Chart>
      
      <PortfolioTable>
        <TableItem>
          <Title><h2>Your Assets</h2></Title>

        </TableItem>
      <Divider />  
        <Table>
          <TableItem>
            <TableRow> 
              <div style={{ flex:3 }}>Name</div>
              <div style={{ flex:2}}>Balance</div>
              <div style={{ flex:1}}>Price</div>
              <div style={{ flex:1}}>Allocation</div>
              <div style={{ flex:0}}><BsThreeDotsVertical /></div>
            </TableRow>
          </TableItem>
          <Divider />
          <div>{coins.map(coin =>(
            <div> 
               <Coin coin={coin} />
              <Divider />
            </div>
          ))}</div>
        </Table>
      </PortfolioTable>
      </Content>
    </Wrapper>

  )
};

export default Portfolio;


const Wrapper= styled.div`
flex:1;
display:flex;
justify-content: center;
`

const Content = styled.div`
width:100%;
max-width: 1000px;
padding: 2rem 1rem;
`
const Chart = styled.div`
border:1px solid #282b2f;
padding: 1rem 2rem;
`

const Balance = styled.div`
`
const BalanceTitle = styled.div`
color:#FE9A0A;
font-size: 1.44rem;
font-weight:600;
`

const Balancevalue =styled.div`
font-size: 1.8rem;
font-weight: bold;
margin: 0.5rem 0;`


const PortfolioTable = styled.div`
margin-top: 1 rem;
border: 1px solid #282b2f;
`

const Table=styled.div`
width:100%;
`

const TableRow = styled.div`
width:100%;
display:flex;
justify-content: space-between;
`

const TableItem = styled.div`
padding: 1rem 2rem;
`
const Divider = styled.div`
border-bottom: 1px solid #282b2f;`

const Title = styled.div`
font size: 1.6rem;
font-weight:600;`

