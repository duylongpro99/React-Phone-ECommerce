import React, { Component } from 'react';
import { detailProduct, storeProducts } from "./data";

const ProductContext = React.createContext();
class ProductProvider extends Component {
    state = {
        products : [],
        detailProduct: detailProduct,
        carts: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
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
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(()=>{
            return {products: tempProduct, carts: [...this.state.carts, product]};
        },
        ()=>{
            this.addTotals();
        }
        );
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

    increment = (id) => {
        let tempCarts = [...this.state.carts];
        const selectedProduct = tempCarts.find( (item) => item.id === id);
        const index = tempCarts.indexOf(selectedProduct);
        const product = tempCarts[index];
        product.count += 1;
        product.total = product.count*product.price;
        this.setState(
            ()=>{return{carts:[...tempCarts]}},
            ()=>{this.addTotals()}
        )

    }

    decrement = (id) => {
        let tempCarts = [...this.state.carts];
        const selectedProduct = tempCarts.find(item=>item.id === id);
        const index = tempCarts.indexOf(selectedProduct);
        const product = tempCarts[index];
        product.count -= 1;
        if (product.count === 0){ 
            this.removeProduct(id);
        }
        else{
            console.log(product.count);
            product.total = product.count*product.price;
            this.setState(
                ()=>{return{carts:[...tempCarts]}},
                ()=>{this.addTotals()}
            )
        }
    }

    removeProduct = (id) => {
        let tempProducts = [...this.state.products];
        let tempCarts= [...this.state.carts];
        console.log(tempCarts);
        tempCarts = tempCarts.filter(item=>item.id !== id);
        console.log(tempCarts);
        const index = tempProducts.indexOf(this.getProduct(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        this.setState(()=>{
            return {
                carts: [...tempCarts],
                products: [...tempProducts],
            };
        },()=>{
            this.addTotals();
        });
    }

    clearCart = (id) => {
        this.setState(()=>{
            return {carts: []};
        },()=>{
        this.setProducts();
        this.addTotals();
        });
    }

    addTotals = () =>{
        let subTotal = 0;
        this.state.carts.map(item =>{
            subTotal += item.total
        });
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(()=>{
            return{
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            };
        });
    }

    render() {
        return (
            <ProductContext.Provider value ={{...this.state, handleDetail: this.handleDetail, addToCart: this.addToCart, openModal: this.openModal, closeModal: this.closeModal, increment: this.increment, decrement: this.decrement, removeProduct: this.removeProduct, clearCart: this.clearCart}}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};