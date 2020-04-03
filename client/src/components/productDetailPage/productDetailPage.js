import React, {Component} from 'react';
import axios from 'axios';
import ImageGallery from "react-image-gallery";
import {Button, Card, CardBody, CardText, Table, Container} from "reactstrap";
import {Col, Row} from "react-bootstrap";
import { connect } from 'react-redux';
import {makeUserCart} from "../../actions/user_actions";



class ProductDetailPage extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
            this.state = {
                productId: this.props.match.params.productId,
                product: '',
                images: []
        }
    }
    componentDidMount() {
        this._isMounted = true;
        axios.get(`/api/product/product_by_id?id=${this.state.productId}&type=single`)
            .then(response => {
                let newImages= [];
                response.data[0].images.map(item => newImages.push(
                    {
                        original: `http://localhost:5000/${item}`,
                        thumbnail: `http://localhost:5000/${item}`,
                    }
                ));
                if(this._isMounted){
                    this.setState({
                        product: response.data[0],
                        images: newImages
                    });
                }

            })
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div>
                <h2 className="text-center mb-4" style={{margin: "8%"}}>{this.state.product.title}</h2>
                <Container fluid>
                    <Row className="d-flex flex-row w-100">
                        <Col className="w-50 h-25 mr-1">
                            <ImageGallery
                                items={this.state.images}
                                // showPlayButton={false} showFullscreenButton={false} autoPlay={true}
                            />
                        </Col>
                        <Col className="ml-1">
                            <h6>Product Info.</h6>
                            <Card>
                                <Table className="table-responsive-sm" bordered>
                                    <tbody>
                                    <tr>
                                        <td>Price: ${this.state.product.price}</td>
                                        <td>Sold: {this.state.product.sold ? this.state.product.sold: 0}</td>
                                        <td>View: {this.state.product.views}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                                <CardBody>
                                    <CardText>{this.state.product.description}</CardText>
                                </CardBody>
                            </Card>
                            <div className="text-center mt-5">
                                <Button className="w-50 btn btn-success text-sm-center"
                                    onClick={() => this.props.onAddToCart(this.state.productId, this.props.user.userData) }
                                >Add to Cart</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user
})
const mapDispatchToProps = (dispatch) => ({
onAddToCart: (productId, userInfo) => dispatch(makeUserCart(productId, userInfo))
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);