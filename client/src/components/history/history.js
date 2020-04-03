import React, {Component} from 'react';
import axios from 'axios';
import {Table} from "reactstrap";

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: []
        }
    }
    componentDidMount() {
        axios.get('/api/users/history').then(response => {
            if(response.data.success){
                this.setState({
                    history: response.data.history
                })
            }else {

            }
            console.log(response)
        })
    }

    render() {
        return (
            <div className="container">
                <h4 className="text-center">Transaction history</h4>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Payment Id</th>
                        <th>quantity</th>
                        <th>Price each</th>
                        <th>Date of purchase</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.history.map((item, index) =>
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>{item.paymentId}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price}</td>
                            <td>{item.dateOfPurchase}</td>
                        </tr>
                    )}

                    </tbody>
                </Table>
            </div>
        );
    }
}

export default History;