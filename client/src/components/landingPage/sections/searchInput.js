import React, {Component} from 'react';
import {Input} from "reactstrap";

class SearchInput extends Component {

    onChangeSearch = (event) => {
        let value = event.target.value.toUpperCase();
        console.log(value);
        this.props.onSearch(this.props.productList, value)
    };
    render() {
        return (
            <div className="w-25 d-flex ml-auto">
                <Input className="fa fa-search mt-2"
                       type="search"
                       name="search"
                       placeholder="&#xF002;"
                       onChange={this.onChangeSearch}
                />
            </div>
        );
    }
}

export default SearchInput;