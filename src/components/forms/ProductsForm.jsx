import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import * as yup from "yup";
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {Field, Form, Formik} from "formik/dist/index";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import {Link} from "react-router-dom";
import apiPrivate from "../api/apiPrivate";
import { withRouter } from 'react-router';

const validationSchema = yup.object().shape({
    quantityOfProduct: yup.string().required('quantité inconnu!')
});

class ProductsForm extends Component {
    state = {
        initialsValues: {
            quantityOfProduct: 1,
            productId: this.props.product.id,
            userId: parseInt(window.localStorage.getItem('id_user')),
            dateCommande:new Date(),
        },
        checkUser: false
    };

    componentDidMount() {
        this.checkUser();
    }

    submit = (values) => {
        const {history}=this.props;
        apiPrivate.post('line-of-products',values)
            .then((response)=>{
                if (response.status===201){
                    history.push('/cart');
                }
            })

    };

    checkUser = () => {
        const {initialsValues} = this.state;
        if (isNaN(initialsValues.userId)) {
            this.setState({checkUser: true})
        }
    };

    addQuantity = () => {
        const {initialsValues} = this.state;
        initialsValues.quantityOfProduct = initialsValues.quantityOfProduct + 1;
        this.setState({initialsValues: initialsValues})
    };

    subQuantity = () => {
        const {initialsValues} = this.state;
        initialsValues.quantityOfProduct = initialsValues.quantityOfProduct - 1;
        if (initialsValues.quantityOfProduct > 0) {
            this.setState({initialsValues: initialsValues})
        } else {
            initialsValues.quantityOfProduct = 1;
        }
        this.setState({initialsValues: initialsValues})
    };

    render() {
        const {initialsValues, checkUser} = this.state;
        const {product} = this.props;
        return (
            <>
                <div className="text-center mb-3">
                    <p className="fw-bolder">
                        cout ttc: <b>{((product.price * 1.2) * initialsValues.quantityOfProduct).toFixed(2)} €</b>
                    </p>
                </div>
                <Formik
                    initialValues={initialsValues}
                    onSubmit={this.submit}
                    validationSchema={validationSchema}
                >
                    <Form>
                        <div className="row col-6 quantForm mb-3">
                            <Button variant="contained"
                                    className="col-3"
                                    color="primary"
                                    onClick={() => this.subQuantity()}
                            >
                                <RemoveIcon/>
                            </Button>
                            <Field type='text' name='quantityOfProduct'
                                   className="form-control ml-2 mr-2 col-3 text-dark  text-center"
                                   id="nombre"
                                   value={initialsValues.quantityOfProduct}
                                   disabled/>
                            <Button variant="contained" className="col-3"
                                    color="primary"
                                    onClick={() => this.addQuantity()}
                            >
                                <AddIcon/>
                            </Button>
                        </div>
                        {checkUser ?
                            <Link to={'/login'} className="mt-2">
                                <Button variant="contained" color="secondary" className=" col-10 mt-2 btn-marg">
                                    <AccountCircleOutlinedIcon fontSize="large"/>
                                </Button>
                            </Link>
                            :
                            <Button type="submit"
                                    variant="contained"
                                    color="secondary"
                                    className=" col-10 mt-2 btn-marg"
                            >
                                <AddShoppingCartOutlinedIcon/>
                            </Button>
                        }

                    </Form>
                </Formik>
            </>
        );
    }
}

export default withRouter(ProductsForm);
