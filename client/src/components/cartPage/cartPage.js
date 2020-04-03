import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Button, ButtonGroup, Table} from "reactstrap";
import {getProducts} from "../../actions/search_actions";
import {deleteFromCart, incOrDecFromCart, successPay} from "../../actions/user_actions";
import Paypal from "../utils/paypal/paypal";

class CartPage extends Component {
    constructor(props) {
        super(props);
        this.total = 0;
        this.history = [];
    }
    //handling Paypal result of transactions (transactionSuccess & transactionError & transactionCanceled)
    transactionSuccess = (payment) => {
        let variable = {
            history: this.history,
            payment: payment
        };
        this.props.dispatch(successPay(variable)).then(response => {
            this.total= 0;
            if(response.payload.success){
                alert("successfully payed")
            }
            alert("please save a screen shot")
        })
    };
    transactionError = () => {
        console.log("Paypal Error")
        alert("the transaction cannot be succeed, try again later");
    };
    transactionCanceled= (data) => {
        console.log("Transaction canceled")
        alert("the transaction cancelled");
    };
    //loading the list of products in DB to the reducer
    componentDidMount() {
        this.props.dispatch(getProducts());
    }
    //increment or decrement the quantity of a certain product if it's quantity more than one
    handleQuantity = (cartItem, increment) => {
        if((!increment) && cartItem.quantity < 2){
            return null
        }
        this.total = 0;
        this.props.onIncOrDec(cartItem.productId, this.props.cart, increment);
    } ;
    //re initial the count for total and remove the item
    handleRemove = (productId, cartList) => {
        this.total = 0;
        this.props.onRemove(productId, cartList)
    };
    onCount = () => {
        if(this.props.cart) {
            return  this.props.cart.map((cartItem, index) => {
                let list = [...this.props.products.productList];
                for (let product of list) {
                    if (product._id === cartItem.productId) {
                        //summing the price of all products in the cart
                        this.total += parseInt(product.price) * cartItem.quantity;
                        // making data of payment history for the 'users' collection in DB
                        this.history.push({
                            dateOfPurchase: '',
                            name: product.title,
                            id: product._id,
                            price: product.price,
                            quantity: cartItem.quantity,
                            paymentId: ''
                        });
                        return <tr key={index}>
                            <td>{product.title}</td>
                            {/*handling increment or decrement buttons (quantity product)*/}
                            <td>
                                <ButtonGroup >
                                    <Button className={"shadow-none"}
                                        onClick={() => this.handleQuantity(cartItem, false)}
                                    >-</Button>
                                    <Button disabled>{cartItem.quantity}</Button>
                                    <Button className={"shadow-none"}
                                        onClick={() => this.handleQuantity(cartItem, true)}
                                    >+</Button>
                                </ButtonGroup>
                            </td>
                            <td>${product.price}</td>
                            {/*remove cart item from the cart*/}
                            <td className="text-right">
                                <Button
                                    onClick={() => this.handleRemove(cartItem.productId, this.props.cart)}
                                    className="btn btn-danger btn-block">Remove
                                </Button>
                            </td>
                        </tr>
                    }
                }
                return null;
            });
        }
    };
    render() {
        return (
            <div className="container">
                <h3>My Cart</h3>
                <Table className="table-bordered table-hover">
                    <thead className="thead-light">
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.onCount()}
                    </tbody>
                </Table>
                {/*if the cart is empty dont show the total and paypal button*/}
                {(this.props.cart && this.props.cart.length > 0) ?
                    <div>
                        <h5>Total amount: ${this.total}</h5>
                        <Paypal
                            toPay={this.total}
                            onSuccess={this.transactionSuccess}
                            transactionError={this.transactionError}
                            transactionCanceled={this.transactionCanceled}
                        />
                    </div> : <h4>Cart is empty</h4>
                }
            </div>
        );
    }
}
const mapStateToProps = state => ({
    cart: state.user.userData.cart,
    products: state.searchProduct.productDb
});
const mapDispatchToProps = dispatch => ({
    onRemove: (productId, cartList) => dispatch(deleteFromCart(productId, cartList)),
    onIncOrDec: (productId, cartList, increment) => dispatch(incOrDecFromCart(productId, cartList, increment))
})
export default connect(mapStateToProps, mapDispatchToProps)(CartPage);