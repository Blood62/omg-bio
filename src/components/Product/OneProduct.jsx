import React, {Component} from 'react';
import apiProductsPublic from "../api/apiProductsPublic";
import { withRouter } from 'react-router';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import veggie from "../../shared/images/veggie.png"
import Button from "@material-ui/core/Button";
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import {Link} from "react-router-dom";
import ProductsForm from "../forms/ProductsForm";


class OneProduct extends Component {

    state={
        isLoading: true,
    };

    componentDidMount() {
        this.getProduct();
    }

    getProduct=()=>{
        const id=this.props.match.params.id;
        apiProductsPublic.get('/products/'+id)
            .then((response)=>{
                this.setState({product: response.data, isLoading:false})
            })

    };

    render() {
        const{isLoading,product}=this.state;
        if (isLoading) {
            return <CircularProgress id="progress"/>
        }
        return (
            <Card  className="prodWidth mx-auto mt-4 shadow">
                <CardContent>
                    <div className="text-center text-dark">
                        <h1>{product.name}</h1>
                    </div>
                    <div className="card-img-one-product border border-dark">
                        <img src={veggie}  alt="veggie"/>
                    </div>
                    <Typography variant="body2" component="p" className="text-center mt-2">
                        <b>type:  {product.type}</b>

                    </Typography>
                    <Typography variant="body2" component="p" className="text-center mt-5">
                        {product.description}
                    </Typography>
                    <div className="col-6 mx-auto mt-4">

                       <ProductsForm product={product}/>

                        <Link  to={'/'} className="mt-2">
                            <Button variant="contained" color="primary" className=" col-10 mt-2 btn-marg">
                                <KeyboardBackspaceOutlinedIcon/>
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        )
    }
}

export default withRouter(OneProduct);
