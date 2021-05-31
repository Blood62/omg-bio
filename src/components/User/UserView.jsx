import React, {Component} from 'react';
import apiPrivate from "../api/apiPrivate";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Typography from "@material-ui/core/Typography";

class UserView extends Component {

    state={
        isLoading: true,
    };
    componentDidMount() {
        this.getUser();
    }

    getUser=()=>{
        apiPrivate.get('account')
            .then((response)=>{
                this.setState({user:response.data,isLoading:false})
            })
            .catch((e) => {
                console.log(e)
            })

    };


    render() {
        const {user,isLoading}=this.state;
        if (isLoading){
            return <CircularProgress id="progress"/>
        }
        return (
            <Card className="mx-auto col-6 mt-5 text-center shadow">
                <CardContent>
                    <h2 className="mb-5">Information de  {user.login}:</h2>
                    <Typography className="p-5" >
                        <span className="bolder p-2"> ID: {user.id}</span>
                        <br/><hr/><br/>
                        <span className="bolder p-2"> Prénom: {user.firstName}</span>
                        <br/><hr/><br/>
                        <span className="bolder "> Nom: {user.lastName}</span>
                        <br/><hr/><br/>
                        <span className="bolder "> Mail: {user.email}</span>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default UserView;
