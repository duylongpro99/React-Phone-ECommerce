import React, { Component } from 'react';
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import { ProductConsumer } from "../../context";

export default class Cart extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {(value)=>{
                        const {carts} = value;
                        if(carts.length > 0){
                            return (
                                <>
                                    <Title  name ="Your's" title ="Cart" />
                                    <CartColumns />
                                    <CartList value={value}/>
                                    <CartTotals value={value} />
                                </>
                            );
                        }
                        else{
                            return (
                                <>
                                    <EmptyCart />
                                </>
                            );
                        }
                    }}
                </ProductConsumer>
            </section>
        )
    }
}
