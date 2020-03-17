import React, { Component } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";
export default class Product extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const {id, title, price, img, inCart}= this.props.product;
        return (
            <div >
                <img src = {img} />
            </div>
        )
    }
}
