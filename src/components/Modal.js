import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import { ProductConsumer } from "../context";

export default class Modal extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value)=>{
                    const {closeModal, modalOpen} = value;
                    const {img, title, price} = value.modalProduct;
                    if(!modalOpen){
                        return null;
                    }else{
                        return(
                            <ModalContainer>
                                <div className="container">
                                    <div class="row">
                                        <div id="modal" className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5">
                                            <h5>item add to the cart</h5>
                                            <img src={img} className="img-fluid" alt="product" />
                                            <h5>{title}</h5>
                                            <h5 className="text-muted">price: $ {price}</h5>
                                            <Link to="/">
                                                <ButtonContainer>

                                                </ButtonContainer>
                                            </Link>
                                            <Link to="/">
                                                <ButtonContainer>
                                                    
                                                </ButtonContainer>
                                            </Link>
                                        </div>     
                                    </div>
                                </div>
                            </ModalContainer>
                        );
                    }
                }}
            </ProductConsumer>
        )
    }
}

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    #modal{
        background-color: var(--mainWhite);
    }
`;
