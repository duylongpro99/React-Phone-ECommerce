import React, { Component } from 'react';
import { detailProduct, storeProducts } from "./data";

const ProductContext = React.createContext();
class ProductProvider extends Component {
    state = {
        products : [],
        detailProduct: detailProduct,
        carts: [],
        modalOpen: true,
        modalProduct: detailProduct
    };
    componentDidMount(){
        this.setProducts();
    }
    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        })
        this.setState(()=>{
            return {products: tempProducts};
        })
    }

    getProduct = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = (id) => {
        const product = this.getProduct(id);
        this.setState(()=>{return {detailProduct: product};
        })
    };

    addToCart = (id) => {
        let tempProduct = [...this.state.products];
        const index = tempProduct.indexOf(this.getProduct(id));
        const product = tempProduct[index];
        product.inCart = true;
        const price = product.price;
        product.total = price;
        this.setState(()=>{
            return {products: tempProduct, carts: [...this.state.carts, product]};
        });
    };

    openModal = id =>{
        const product = this.getProduct(id);
        this.setState(()=>{
            return {modalOpen: true, modalProduct: product};
        });
    }

    closeModal = id => {
        this.setState(()=>{
            return {modalOpen: false};
        });
    }

    render() {
        return (
            <ProductContext.Provider value ={{...this.state, handleDetail: this.handleDetail, addToCart: this.addToCart, openModal: this.openModal, closeModal: this.closeModal}}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};