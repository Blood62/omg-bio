import React, {Component} from 'react';
import LoginForm from "../components/forms/LoginForm";
import UserView from "../components/User/UserView";



class LoginView extends Component {
    state={
        isUser: false,
    };

    componentDidMount() {
        this.checkUser();
    }

    checkUser=()=>{
        if (!isNaN(parseInt( window.localStorage.getItem('id_user')))){
            this.setState({isUser:true})
        }
};

    render() {
        const {isUser}=this.state;
        if (!isUser){
            return (
                <>
                    <LoginForm/>
                </>
            );
        }
        if (isUser){
            return (
               <>
               <UserView/>
               </>
            )
        }

    }
}

export default LoginView;
