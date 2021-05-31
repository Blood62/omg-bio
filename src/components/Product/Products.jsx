import React, {Component} from 'react';
import apiProductsPublic from "../api/apiProductsPublic";
import ProductsCard from "./ProductsCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import Actions from "./Actions";


class Products extends Component {
    state = {
        isLoading: true,
        productsTrier: []
    };

    componentDidMount() {
        this.getAllProducts();
    }

    getAllProducts = () => {
        apiProductsPublic.get('/products')
            .then((resp) => {
                if (resp.status === 200) {
                    this.setState({products: resp.data, isLoading: false, types: this.getTypeList(resp.data)});

                }
            })
    };

    getTypeList= (products)=>{
      const typeList= [];
      products.forEach(e=>{
          if (typeList.indexOf(e.type)===-1){
              typeList.push(e.type);
          }
      });
        return typeList.sort();
    };

    selectedType = (value) =>{
        let productTrier = [];
        this.state.products.forEach(p=>{
            if (p.type === value){
                productTrier.push(p);
            }
        });
        this.setState({productsTrier:productTrier.sort()});
    };



    render() {
        const {products, isLoading, types, productsTrier} = this.state;
        if (isLoading) {
            return <CircularProgress id="progress"/>
        }
        if (!productsTrier.length) {
            return (
                <div className="row col-10">
                    <div className="col-6 mx-auto">
                        <Actions types={types} selectedType={this.selectedType} getAllProduct={this.getAllProducts} />
                    </div>
                    <div className="row col-6  mt-4 mx-auto " id="scroll-products">
                        {products.map((product) => {
                            return (
                                <ProductsCard key={product.id} product={product}/>
                            )

                        })}

                    </div>
                </div>
            )
        }
       else if (productsTrier.length){
            return (
                <div className="row col-10">
                    <div className="col-6 mx-auto">
                        <Actions types={types} selectedType={this.selectedType} removetri={this.removeTri}/>
                    </div>
                    <div className="row col-6  mt-4 mx-auto " id="scroll-products">
                        {productsTrier.map((product) => {
                            return (
                                <ProductsCard key={product.id} product={product}/>
                            )
                        })}

                    </div>
                </div>
            )
        }
    }
}

export default Products;
