import React from 'react';
import styled from 'styled-components'

const Promos = () => {
  return (
  <Wrapper>
        <OfferCard>
        <Title>Yield Earned</Title>
        <Description>
            Earn upto 2.90% APY
            <Placeholder />

            <Additional style={{fontsize:'1.5rem'}}>
                $0.004428<span>2.90% APY</span>
            </Additional>
            
        </Description>
      </OfferCard>
      
      <OfferCard>
          <Title>Learn and Earn</Title>
          <Description>
            Earn upto 2.90% APY
            <Placeholder />

            <Additional style={{fontsize:'1.5rem'}}>
                $0.004428<span style={{color:'#3773f5', cursor:'pointer'}}>Verify identity</span>
            </Additional>
            
        </Description>
      </OfferCard>
  </Wrapper>
  );
};

export default Promos;

const Wrapper = styled.div`
margin-top: 2rem;
padding-right: 1rem;`

const OfferCard = styled.div`
width: 21rem;
height: 11rem;
border: 1px solid #282b2f;
margin-bottom: 1rem;
padding: 1.5rem;
display: flex;
flex-direction: column;`

const Title = styled.div`
font-weight: 700;
font-size: 1.5rem;
margin-bottom: 0.1rem;`

const Description = styled.div`
font-size: 1.1rem;`

const Placeholder = styled.div`
flex: 1;`

const Additional =styled.div`
font-size: 1.1rem;
font-weight: 700; 
display: flex;
align-items: center; 
justify-content: space-between;
margin-top:1.85rem;

& > span{
    color:#39FF14; !important
    font-size: 1.1rem;
}
` 

