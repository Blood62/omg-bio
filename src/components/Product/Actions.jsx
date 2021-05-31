import React, {Component} from 'react';
import Button from "@material-ui/core/Button/index";

class Actions extends Component {

    render() {
        const {types,selectedType}=this.props;
        return (
            <div className=" mx-auto  p-5">
                <span><h3>Type de produits:</h3></span>
                <div className="row col-3 ml-3">
                    {types.map((t,i)=>{return(
                        <Button key={i} variant="outlined"
                                color="primary" onClick={() => selectedType(t)}
                                className="mt-2 mx-auto" >{t}</Button>
                    )})}

                </div>
            </div>
        );
    }
}

export default Actions;
