import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaWallet } from "react-icons/fa";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../lib/sanity";
import { useSnackbar } from "notistack";

const Transfer = ({
  selectedToken,
  setAction,
  thirdWebTokens,
  walletAddress,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [amount, setAmount] = useState();
  const [recepient, setRecepient] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [activeThirdWebToken, setActiveThirdWebToken] = useState();
  const [balance, setBalance] = useState("Fetching...");

  useEffect(() => {
    const activeToken = thirdWebTokens.find(
      (token) => token.address === selectedToken.contractAddress
    );
    setActiveThirdWebToken(activeToken);
  }, [thirdWebTokens, selectedToken]);

  useEffect(() => {
    const url = imageUrlBuilder(client).image(selectedToken.logo).url();
    setImageUrl(url);
  }, [selectedToken]);

  useEffect(() => {
    const getBalance = async () => {
      const balance = await activeThirdWebToken.balanceOf(walletAddress);
      setBalance(balance.displayValue);
    };

    if (activeThirdWebToken) {
      getBalance();
    }
  }, [activeThirdWebToken]);

  const sendCrypto = async (amount, recepient) => {
    enqueueSnackbar(`Transferring ${selectedToken.name} ...`, {
      variant: "info",
      duration: 2900,
    });

    if (activeThirdWebToken && amount && recepient) {
      setAction("transferring");
      const tx = await activeThirdWebToken.transfer(
        recepient,
        amount.toString().concat("00000000000000000")
      );
      console.log(tx);
      console.log("transferred to =>>", recepient, " Amount =>>", amount);
      setAction("transfered");
      enqueueSnackbar(
        `Transferred ${selectedToken.name} Successfully to ${recepient.slice(
          0,
          9
        )}...${recepient.slice(33)}`,
        {
          variant: "success",
          duration: 6500,
        }
      );
    } else {
      console.log("Error! Missing Data");
    }
  };

  return (
    <Wrapper>
      <Amount>
        <FlexInputContainer>
          <FlexInput
            placeholder="0"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <span>{selectedToken.symbol}</span>
        </FlexInputContainer>
        <Warning style={{ color: amount && "#0a0b0d", opacity: 70 }}>
          Amount is a Required field
        </Warning>
      </Amount>
      <TransferForm>
        <Row>
          <Fieldname>To</Fieldname>
          <Icon>
            <FaWallet />
          </Icon>
          <Recepient
            placeholder="Address"
            value={recepient}
            onChange={(e) => setRecepient(e.target.value)}
          />
        </Row>
        <Divider />
        <Row>
          <Fieldname>Pay With</Fieldname>
          <CoinSelectlist onClick={(e) => setAction("select")}>
            <Icon>
              <img src={imageUrl} />
            </Icon>
            <CoinName>{selectedToken.name}</CoinName>
          </CoinSelectlist>
        </Row>
      </TransferForm>
      <Row>
        {amount >= 0.1 && (
          <Continue onClick={() => sendCrypto(amount * 10, recepient)}>
            Continue
          </Continue>
        )}
        {amount < 0.09 && (
          <Continue onClick={() => sendCrypto(amount * 100, recepient)}>
            Continue
          </Continue>
        )}
      </Row>
      <Row>
        <BalanceTitle>{selectedToken.symbol} Balance</BalanceTitle>
        <Balance>
          {balance} {selectedToken.symbol}
        </Balance>
      </Row>
    </Wrapper>
  );
};

export default Transfer;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;
const Amount = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FlexInputContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;

  & > span {
    font-size: 3rem;
    margin-bottom: 0.65rem;
    color: #24ff24;
  }
`;

const FlexInput = styled.input`
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 1.2rem;
  text-wrap: wrap;
  text-align: right;
  max-width: 45%;
  margin-right: 1rem;
  font-size: 4.5rem;
  color: #3773f5;

  &:: -webkit-outer-spin-button, 
 :: -webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const Warning = styled.div`
  padding: 2rem 2rem 0;
  padding-bottom: 2rem;
  text-align: center;
  color: #8a919e;
`;

const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
`;

const TransferForm = styled.div`
  border: 1px solid #8a919e;
  margin: 0.5rem;
  border-radius: 0.5rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff01f;
  padding: 1rem;
  font-size: 1.2rem;
`;

const Fieldname = styled.div`
  flex: 0.5;
  padding-left: 1rem;
`;

const Icon = styled.div`
  margin-right: 1rem;
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;

  & > img {
    height: 120%;
    width: 120%;
    object-fit: cover;
  }
`;
const Recepient = styled.input`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 1.2rem;
  text-wrap: wrap;
  margin-right: 0.6rem;
`;
const CoinSelectlist = styled.div`
  display: flex;
  flex: 1.3;
  height: 100%;
  &: hover {
    cursor: pointer;
  }
`;

const CoinName = styled.div`
flex: 1;
border: none;
background: none;
outline:none; 
color:white;
font-size: 1:2rem; 
text-wrap:wrap;
margin-right: 0.5rem;
`;

const Continue = styled.div`
  color: white;
  width: 100%;
  background-color: #3773f5;
  padding: 0.2rem;
  text-align: center;
  border: 0.5rem;
  border-radius: 2px;
  font-size: 1.5rem;

  &:hover {
    cursor: pointer;
    shadow: 2px;
  }
`;

const BalanceTitle = styled.div``;

const Balance = styled.div``;
