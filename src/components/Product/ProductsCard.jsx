import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import veggie from "../../shared/images/veggie.png"
import Button from "@material-ui/core/Button";
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import {Link} from "react-router-dom";

class ProductsCard extends Component {



    render() {
        const {product} = this.props;
        return (
            <div className="mt-2 mx-auto">
                <Card className="myCard shadow">
                    <CardContent>
                        <h2 className="text-center">{product.name}</h2>
                        <img src={veggie} className="card-img" alt="veggie"/>
                        <br/>
                        <div className="myMx">
                            <span className="mr-5">prix ht: {product.price} €</span>
                            <span>prix ttc: {(product.price*1.2).toFixed(2)} €</span>
                        </div>
                        <br/>
                            <Link to={'/product/'+product.id} className="mt-2 myMarg">
                            <Button variant="contained" color="primary" >
                                <PageviewOutlinedIcon/>
                            </Button>
                            </Link>
                    </CardContent>

                </Card>
            </div>
        );
    }
}

export default ProductsCard;
