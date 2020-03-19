import styled from "styled-components";

export const ButtonContainer = styled.button`
    text-transform: capitalize;
    font-size : 1.4rem;
    background: transparent ;
    border: 0.05rem solid var(--lightBlue);
    border-color: ${props => props.addCart ? "var(--mainYellow)" : "var(--lightBlue)"};
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    margin: 0.2rem 0.5rem 0.2rem 0; 
    transition: all 0.1s linear;
    color: ${props => props.addCart ? "var(--mainYellow)" : "var(--lightBlue)"};
    &:hover{
        background: ${props => props.addCart ? "var(--mainYellow)" : "var(--lightBlue)"};
        color: var(--mainDark);
        margin: 0.1rem 0.4rem 0.3rem 0.1rem; 
        box-shadow: -1px 1px  var(--shadowColor);
    }
    &:focus{
        outline: none;
    }
`