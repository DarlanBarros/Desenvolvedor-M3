import styled from 'styled-components';

interface CheckButtonProps {
  isSelected: boolean;
}

export const Main = styled.main`
    max-width: 1120px;
    margin: 0 auto;
    padding: 1rem 1rem 1rem;

`;

export const Container = styled.div`
  display: grid;
  width: 1090px;
  height: auto;
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: 80px 1fr 1fr 100px;
  grid-gap: 1rem;
  grid-template-areas:
      "top top top"
      "sidebar section section"
      "sidebar section section";

`;

export const Top = styled.div`
    grid-area: top;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

export const Select = styled.select`
  width: 12.5rem;
  height: 35px;
  background: white;
  border-style: solid;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  margin-left: 10px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

export const Sidebar = styled.div`
    grid-area: sidebar;

    > div:not(:first-child) {
      margin-top: 1.5rem;
    }

    ul {
        padding: 0.5rem 0 0 0;
        list-style: none;
    }

    label {
      font-family: 'Open Sans', sans-serif;
      font-size: 0.95rem;
      padding: 0.4rem;
    }
`;

export const SizeFilter = styled.div`
  display: grid;
  grid-template-columns: 2.1rem 2.1rem 2.1rem 2.1rem;
  grid-template-rows: 2.1rem 2.1rem 2.1rem;
  grid-gap: 0.5rem;

  padding: 0.5rem 0 0 0;

  div {
      
    
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        cursor: pointer;
        width: 2.1rem;
        height: 2.1rem;
      }
  }
`;

export const CheckButton = styled.button<CheckButtonProps>`
    width: 2.1rem;
    height: 2.1rem;
    opacity: ${(props) => props.isSelected ? '0.8' : '0.4'};

    border-color: ${(props) => props.isSelected ? 'DodgerBlue' : 'grey'};
`;


export const Section = styled.div`
  grid-area: section;

  display: grid;
  grid-template-columns: 12.2rem 12.2rem 12.2rem;
  grid-template-rows: 26rem 26rem 26rem;
  grid-gap: 2.5rem;

  padding: 0 2rem 0 2rem;
`;

export const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    background-color: #000000;
    width: 100%;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
`;




