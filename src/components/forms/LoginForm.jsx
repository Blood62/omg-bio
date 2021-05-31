import React, {Component} from 'react';
import * as yup from "yup";
import Card from "@material-ui/core/Card";
import {Form, Formik} from "formik/dist/index";
import CardContent from "@material-ui/core/CardContent";
import {ErrorMessage, Field} from "formik/dist/index";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import apiUser from "../api/apiUser";
import { withRouter } from 'react-router';

const validationSchema = yup.object().shape({
    password: yup.string().required('champ obligatoire')
        .min(4, 'min 4 characteres')
        .max(100, 'max 100 characteres'),
    rememberMe: yup.boolean(),
    username: yup.string().required('champ obligatoire')
        .min(1, 'minimum 1 charactere').max(50, 'max 50 characteres')
});

class LoginForm extends Component {
    state = {
        initialsValues: {
            password: '',
            rememberMe: true,
            username: ''
        }

    };


    submit = (values) => {
        apiUser.post('/authenticate', values)
            .then((resp) => {
                localStorage.setItem('token', resp.data.id_token);
                //recup du token pour les api non publics
                this.getUserId();
            })
            .catch((e) => {
                console.log(e)
            })

    };

    getUserId = () => {
        const {history}=this.props;
        apiUser.get('/account')
            .then((resp) => {
                localStorage.setItem('id_user', resp.data.id);
                history.push('/');
            })
            .catch((e) => {
                console.log(e)
            })
    };

    render() {
        const {initialsValues} = this.state;
        return (
            <Card className="cardLogin mt-5 mx-auto shadow">
                <CardContent>
                    <h1 className="text-center">Login</h1>
                    <Formik
                        initialValues={initialsValues}
                        onSubmit={this.submit}
                        validationSchema={validationSchema}
                    >
                        <Form>
                            <Field type='text' name='username' placeholder='Username'
                                   className="form-control mb-2 mt-3 col-10 mx-auto"/>
                            <ErrorMessage name='username'
                                          component='small' className="text-danger"/>
                            <Field type='password' name='password' placeholder='Password'
                                   className="form-control mb-2 mt-3 col-10 mx-auto"/>
                            <ErrorMessage name='password'
                                          component='small' className="text-danger"/>
                            <div className="ml-5 mt-3">
                                <input type="checkbox"
                                       className="ml-2 mr-3 mb-4"
                                       id="horns" name="rememberMe"
                                       defaultChecked={true}
                                       disabled={true}
                                />
                                <label htmlFor="horns">Remember me!</label>
                            </div>
                            <div id="actionForms">
                                <Button type="submit" variant="contained"
                                        size="large"
                                        color="primary"
                                        className="btn btn-lg"
                                >
                                    Submit
                                </Button>
                                <Link to={'/'} className="mt-2 btn-marg">
                                    <Button variant="contained"
                                            color="secondary"
                                            size="large"
                                            className="btn btn-lg">
                                        Annuler
                                    </Button>
                                </Link>
                            </div>
                        </Form>
                    </Formik>


                </CardContent>
            </Card>
        );
    }
}

export default withRouter(LoginForm);
