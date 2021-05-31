import React, {Component} from 'react';
import Products from "../components/Product/Products";

class HomeView extends Component {
    render() {
        return (
            <>
                <div>
                    <Products/>
                </div>
            </>
        );
    }
}

export default HomeView;
