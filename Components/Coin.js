import React from 'react';
import styled from 'styled-components';

import  {BsThreeDotsVertical} from 'react-icons/bs'


const Coin = ({coin}) => {   //padding: 1rem 2rem;
  return (<Wrapper>
      <div>
          <div style={{flex: 3}}>
              <NameCol>
                  <CoinIcon>
                  <img src={coin.logo} height='25' width='22'/>
                  </CoinIcon>
                  <div>
                  <Primary>{coin.name}</Primary>
                  <Secondary>{coin.sign}</Secondary>
                  </div>
              </NameCol>
          </div>
          <div style={{flex: 2}}>
              <Primary>
                  {'$'}
                  {coin.balanceUsd}
              </Primary>
              <Secondary>
                {coin.balanceCoin} {coin.sign}
              </Secondary>
          </div>
          <div style={{flex: 1}}>
              <Primary>
                  {'$'}
                  {coin.priceUsd}
              </Primary>
              <div style={{color: coin.change<0? '#ec0030' : '#24E500' }}>
                  {coin.change > 0 && '+'}
                  {coin.change}%
              </div>
               </div>
               <div style={{flex: 1}}>
                   {coin.allocation}%
               </div>
               <div style={{flex: 0}}>
                   <BsThreeDotsVertical/>
               </div>
      </div>
  </Wrapper>
  )
};


const Wrapper = styled.div`    
display: flex;
width: 100%;
justify-content: space-between;
align-items: center;

& > div{
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}
`

const NameCol= styled.div`
display:flex;
align-items: center;
`

const CoinIcon = styled.div`
width:1.8rem;
margin-right: 1rem;

`

const Primary = styled.div`
margin-bottom: 0.1rem;`

const Secondary = styled.div`
color: #8a919e;
font-size:0.8rem;
`


export default Coin;
