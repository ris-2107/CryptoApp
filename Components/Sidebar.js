import React, {useState} from 'react';
import Coinbaselogo from '../assets/cb-logo.png';
import styled from 'styled-components';
import { navItems } from '../static/navItems';

const Sidebar = () => {
    const[activeIcon, setActiveIcon] = useState(navItems[0].title);
  return (<Wrapper>
      <LogoContainer>
          <Logo>
              <img style={{objectFit:"contain"}} src={Coinbaselogo} height='128vh' width='150vw' /> 
            </Logo>
      </LogoContainer>
      <NavItemsContainer>
          {navItems.map((item, index) =>(
              <NavItem  key={index} onClick={()=>setActiveIcon(item.title)}>
                <NavIcon style={{color:item.title == activeIcon && '#FF7B19'}} >{item.icon}</NavIcon>
                <NavTitle>{item.title}</NavTitle>
              </NavItem>
            ))}
      </NavItemsContainer>
  </Wrapper>
  );
};

export default Sidebar;


const Wrapper = styled.div`
height: calc(100vh);
border-right: 1px solid #282b2f;
width: calc(22rem - 16px - 16px);
padding:0 1rem;
`

const LogoContainer = styled.div`
margin: 1.5;
object-fit: contain;
margin-left: 1.5rem;
`

const Logo = styled.div`
 width:44%;
 object-fit: cover;
 margin-left: 2rem;
 `
const NavItemsContainer = styled.div`
margin-top: 3rem;
cursor:pointer;
 `

 const NavItem=styled.div`
 display:flex;
 align-items: center;
 font-size:1.3rem;
 font-weight:600;
 border-radius: 0.8rem;
 margin-bottom: 4rem;

 &:hover {
    background-color: #24252;
  }
 `
const NavTitle = styled.div``

 const NavIcon = styled.div`
 background-color: #141519;
 padding:0.7rem;
 border-radius:60%;
 margin: 0 1rem;
 display: grid;
 place-items: center;
 `