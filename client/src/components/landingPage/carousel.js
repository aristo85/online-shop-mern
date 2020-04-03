import React, {Component} from 'react';
import {Card, CardBody, CardSubtitle, CardTitle, Col} from 'reactstrap';
import { Carousel } from 'react-bootstrap';
import {Link} from "react-router-dom";

class CardImageSlider extends Component {

    render() {

        return (
            <Col key={this.props.index} style={{minWidth: "250px", maxWidth: "300px", margin: "5px"}} >
                <Card>
                    <Carousel>
                        {this.props.product.images.map((image, index) =>
                            <Carousel.Item key={index}>
                                {/*linking to the productDetailedPage with :id path*/}
                                <Link to={`/product/${this.props.product._id}`}>
                                    <img
                                          className="d-block mw-100" style={{height: '30vh'}}
                                          src={`http://localhost:5000/${image}`}
                                          alt={image}
                                    />
                                </Link>


                            </Carousel.Item>
                        )}
                    </Carousel>
                    <CardBody>
                        <CardTitle>{this.props.product.title}</CardTitle>
                        <CardSubtitle>{`$${this.props.product.price}`}</CardSubtitle>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default CardImageSlider;