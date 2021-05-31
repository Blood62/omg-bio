import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import apiPrivate from "../api/apiPrivate";
import {withRouter} from 'react-router';
import {Field, Form, Formik} from "formik/dist/index";

class CartForm extends Component {

    state = {
        initialsValues: {
            quantity: this.props.p.quantity,
        }
    };

    removeLine = (id) => {
        const {history} = this.props;
        if (window.confirm('Supprimer cet article du panier ?')) {
            apiPrivate.delete('line-of-products/' + id)
                .then((resp) => {
                    if (resp.status === 204) {
                        history.push('/');
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
        }

    };

    addQuantity = () => {
        const {initialsValues} = this.state;
        initialsValues.quantity = initialsValues.quantity + 1;
        this.setState({initialsValues: initialsValues})
    };

    subQuantity = () => {
        const {initialsValues} = this.state;
        initialsValues.quantity = initialsValues.quantity - 1;
        if (initialsValues.quantity > 0) {
            this.setState({initialsValues: initialsValues})
        } else {
            initialsValues.quantity = 1;
        }
        this.setState({initialsValues: initialsValues})
    };

    render() {
        const {p} = this.props;
        const {initialsValues}=this.state;
        return (
            <>

                <Formik
                    initialValues={initialsValues}
                    onSubmit={this.submit}
                >
                    <Form>
                        <div className="row col-10">

                            <Button variant="contained"
                                    className="col-3"
                                    color="primary"
                                    onClick={() => this.subQuantity()}
                            >
                                <RemoveIcon/>
                            </Button>
                            <Field type='text' name='quantity'
                                   className="form-control ml-2 mr-2 col-3 text-dark  text-center"
                                   id="nombre"
                                   value={initialsValues.quantity}
                                   disabled/>
                            <Button variant="contained" className="col-3"
                                    color="primary"
                                    onClick={() => this.addQuantity()}
                            >
                                <AddIcon/>
                            </Button>


                        </div>

                    </Form>
                </Formik>
                <span className="mr-5"><b>{((p.price * initialsValues.quantity) * 1.2).toFixed(2)} €</b></span>
                <Button variant="contained"
                        color="secondary"
                        onClick={() => this.removeLine(p.cmdId)}
                >
                    <DeleteForeverIcon/>
                </Button>
            </>
        );
    }
}

export default withRouter(CartForm);
