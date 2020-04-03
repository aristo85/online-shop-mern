import React, {Component} from 'react';
import { UncontrolledCollapse, Button, CardBody, Card, Input } from 'reactstrap';

const continents = [
    {
        "_id": 1,
        "name": "Africa"
    },
    {
        "_id": 2,
        "name": "Europe"
    },
    {
        "_id": 3,
        "name": "Asia"
    },
    {
        "_id": 4,
        "name": "North America"
    },
    {
        "_id": 5,
        "name": "South America"
    },
    {
        "_id": 6,
        "name": "Australia"
    },
    {
        "_id": 7,
        "name": "Antarctica"
    }
];
const prices = [150, 200, 300, 400, 500, 600, 700];

class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.searchList = [];
        this.price = 0;
    }

    onCheck = (value, price) => {
        if (value) {
            let newSearchList = this.searchList;
            if (value > 0) {
                newSearchList.push(value);
                continents[value-1]._id -= 8;
                this.searchList = newSearchList;
            } else if (value < 0) {
                value += 8;
                let anotherSearchList = newSearchList.filter(checkBoxItem => checkBoxItem !== value);
                continents[value-1]._id = value;
                this.searchList = anotherSearchList;
            }
        } else {
            this.price = price;
        }
        this.props.onFilter(this.props.productList, this.searchList, this.price);
    }
    render() {
        return (
            <div className="d-flex align-content-start flex-wrap flex-row w-100">
                <div className="mx-1" style={{width: '49%'}}>
                    <Button  id="toggler" className="mt-2 w-100">
                        By Continents
                    </Button>
                    <UncontrolledCollapse toggler="#toggler">
                        <Card className="d-flex align-content-start flex-wrap flex-row w-100">
                            {continents.map((value, index) => (
                                <React.Fragment key={index}>
                                    <CardBody className="mt-n3 mb-n4 mr-sm-0 pt-n4">
                                        <Input  onClick={ () => this.onCheck(value._id)} type="checkbox" />{value.name}
                                    </CardBody>
                                </React.Fragment>
                            ))}

                        </Card>
                    </UncontrolledCollapse>
                </div>
                <div className="mx-1" style={{width: '49%'}}>
                    <Button  id="toggler2" className="mt-2 w-100">
                        By Price
                    </Button>
                    <UncontrolledCollapse toggler="#toggler2">
                        <Card className="d-flex align-content-start flex-wrap flex-row w-100">
                            {prices.map((price, index) => (
                                <React.Fragment key={index}>
                                    <CardBody className="mt-n3 mb-n4 mr-sm-0 pt-n4">
                                        <Input  onClick={ () => this.onCheck(null, price) } type="radio" name="rad" />{`> $${price}`}
                                    </CardBody>
                                </React.Fragment>
                            ))}

                        </Card>
                    </UncontrolledCollapse>
                </div>
            </div>
        );
    }
}

export default CheckBox;