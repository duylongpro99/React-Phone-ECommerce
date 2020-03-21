import React from 'react';
import CartItem from "./CartItem";

export default function CartList({value}) {
    const {carts} = value;
    return (
        <div className="container-fluid">
          {carts.map(item => {
              return (
                  <CartItem key ={item.id} item={item} value={value} />
              );
          })} 
        </div>
    );
}
