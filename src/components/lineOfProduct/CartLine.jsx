import React, {Component} from 'react';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {withRouter} from 'react-router';
import CartForm from "../forms/CartForm";

class CartLine extends Component {
    state = {
        myCart: {
            quantity: '',
            name: '',
            price: '',
            id: '',
            cmdId: '',
        },
        cartLines: [],
        load: true,
        totalPrice: {
            value: 0,
        }
    };

    componentDidMount() {
        this.triPanier();
    }

    triPanier = () => {
        const {product, lineOfProducts} = this.props;
        const {myCart} = this.state;
        const carts = [];
        /*  const prixTotal=[];*/
        lineOfProducts.forEach((e) => {
            if (e.productId === product.id) {
                myCart.quantity = e.quantityOfProduct;
                myCart.name = product.name;
                myCart.price = product.price;
                myCart.id = product.id;
                myCart.cmdId = e.id;
                /* prixTotal.push((line.price*e.quantityOfProduct));*/
                carts.push(myCart);
            }

        });
        /*     console.log(prixTotal);
             prixTotal.forEach((prix)=>{
                totalPrice.value=totalPrice.value+prix;
                 this.setState({totalPrice:totalPrice});
             });*/

        this.setState({cartLines: carts, load: false});
    };




    render() {
        const {cartLines, load} = this.state;
        if (load) return <CircularProgress/>

        if (cartLines.length){
        return (
            <div>
                {cartLines.map((p, i) => {
                    return (
                        <Card key={i} className="shadow mt-1 mb-1 col-10 mx-auto">
                            <CardContent className="row">

                                <div className="col-4"> <b>{p.name}</b></div>
                                <CartForm p={p}/>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        )}
    }
}

export default withRouter(CartLine);
