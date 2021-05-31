import React, {Component} from 'react';
import err404 from "../shared/images/giphy.gif"

class ErrorView extends Component {
    render() {
        return (

            <div className="mt-3">
                <hr className="bordering" />
                <span className="text-center mt-2 coloring"><h1>ERROR 404</h1> </span>
                <div>
                    <img src={err404} id="img-err" alt="error404" className="mb-3"/>
                </div>

                <span className="text-center mt-4 coloring"><h2>PAGE NOT FOUND</h2></span>
                <hr className="bordering"/>
            </div>

        );
    }
}

export default ErrorView;
