import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardImageSlider from "./carousel";
import { Button, Row, Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import CheckBox from "./sections/checkBox";
import {filterProducts, getProducts, searchProduct} from '../../actions/search_actions';
import SearchInput from "./sections/searchInput";

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 3
        }
    }

    loadMore = () => {
        this.setState({
            limit: this.state.limit * 2
        })
    };
    componentDidMount() {
        this.props.onGetProducts()
            .then(response => {
                if (!response.payload.success) {
                    alert("failed to upload Product")
                }
            });
    }

    render() {
        return (
            <div>
                <CheckBox
                    onFilter={this.props.onFilter}
                    productList={this.props.products.productList}
                />

                <SearchInput
                    onSearch={this.props.onSearch}
                    productList={this.props.products.productList}
                />

                <div className="mobile" >
                    <div style={{textAlign: 'center'}}>
                        <h2>Let's travel</h2>
                    </div>
                    {this.props.products.productToRender.length === 0 ?
                        <div style={{display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center'}}>
                            <h2>Nothing to upload...</h2>
                        </div>:
                        <div>
                            <Container fluid>
                                <div>
                                    <Row className="d-flex">
                                        {this.props.products.productToRender.map((product, index) =>( index < this.state.limit &&
                                                <CardImageSlider key={index} product={product} index={index} />
                                            )
                                        )}
                                    </Row>
                                </div>

                            </Container>
                        </div>
                    }
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        {this.props.products.productToRender.length > this.state.limit &&
                        <Button onClick={this.loadMore}>Load more</Button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
const setPropsToState = (state) => ({
    products: state.searchProduct.productDb,
    user: state
});
const setDispatchToProps = (dispatch) => ({
    onGetProducts: () => dispatch(getProducts()),
    onFilter: (productList, searchList, price)=> dispatch(filterProducts(productList, searchList, price)),
    onSearch: (productList ,value) => dispatch(searchProduct(productList ,value))
});
export default connect(setPropsToState, setDispatchToProps)(LandingPage);