import React, {Component} from 'react';
import {withRouter} from 'react-router';
import apiPrivate from "../api/apiPrivate";
import apiProductsPublic from "../api/apiProductsPublic";
import CircularProgress from "@material-ui/core/CircularProgress";
import CartLine from "./CartLine";
import empty from "../../shared/images/tenor_empty.gif"
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";


class MyPanier extends Component {
    state = {
        lePanier: [],
        tousLesproduits: [],
        lineOfProducts: [],
        isLoading: true,
        validCart: false,
    };

    componentDidMount() {
        this.getPanier();
    }

    getAllProducts = () => {
        apiProductsPublic.get('/products')
            .then((resp) => {
                if (resp.status === 200) {
                    this.setState({tousLesproduits: resp.data});
                    this.createCart();
                }
            })
    };

    getPanier = () => {
        if (!isNaN(parseInt(window.localStorage.getItem('id_user')))) {
            apiPrivate
                .get('line-of-products-user/' + window.localStorage.getItem('id_user'))
                .then((response) => {
                    this.setState({lineOfProducts: response.data});
                    this.getAllProducts();
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    };

    createCart = () => {
        const {tousLesproduits, lineOfProducts} = this.state;
        const cart = [];
        tousLesproduits.forEach((allp) => {
            lineOfProducts.forEach((line) => {
                if (allp.id === line.productId) {
                    cart.push(allp);
                }
            });
        });
        this.setState({lePanier: cart.sort(), isLoading: false})

    };

    validCart = () => {
        const {history} = this.props;
        if (window.confirm('Valider le panier ?')){
            apiPrivate.get('line-of-products/current-user')
                .then((resp) => {
                    if (resp.data){

                        this.setState({validCart: resp.data});
                        setTimeout(function(){
                            history.push('/');
                            }, 1000);
                    }

                })
                .catch((e) => {
                console.log(e)
            })
        }


    };

    render() {
        const {lePanier, lineOfProducts, isLoading, validCart} = this.state;
        if (isLoading) {
            return (
                <div className="progressCart col-10">
                <CircularProgress className=" mx-auto mt-5 mb-5"/>
                    <h2 className="text-progress">Une connexion est nécéssaire!</h2>
                </div>
            )
        }
        if (validCart){
            return (
                <Paper elevation={3} className="col-10 mx-auto bg-success text-center paper-marg" >
                    <h2> le panier est Validé!</h2>
                </Paper>
            )
        }
        if (lePanier.length) {
            return (
                <>
                    <div className="head-cart row mb-3 mt-3">
                        <h1>Mon Panier</h1>
                        <Button variant="contained" className="col-2 ml-2"
                                color="primary"
                                onClick={this.validCart}
                        >
                            Valider
                        </Button>
                    </div>
                    <div>


                        {lePanier.map((p, i) => {
                            return (
                                <CartLine key={i} product={p} lineOfProducts={lineOfProducts}/>
                            )
                        })}
                    </div>

                </>
            );
        }

        if (!lePanier.length) {
            return (
                <>
                    <span className="text-center ">
                    <h1>Mon Panier</h1>
                </span>
                    <div>
                        <hr className="cart-hr"/>
                        <div className="empty">
                            <img className="img-err" src={empty} alt="empty.gif"/>
                            <br/>
                            <h1 className="mt-5 text-danger mince">Mince c'est vide mais j'ai faim!</h1>
                        </div>
                        <hr className="cart-hr"/>
                    </div>
                </>
            )
        }

    }
}

export default withRouter(MyPanier);
