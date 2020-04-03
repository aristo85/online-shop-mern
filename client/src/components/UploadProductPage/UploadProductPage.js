import React, {Component} from 'react';
import FileUpload from "../utils/fileUpload";
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Continents = [
    { Key: 1, value: "Africa" },
    { Key: 2, value: "Europe" },
    { Key: 3, value: "Asia" },
    { Key: 4, value: "North America" },
    { Key: 5, value: "South America" },
    { Key: 6, value: "Australia" },
    { Key: 7, value: "Antarctica" }
];

class UploadProductPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            titleValue: '',
            descriptionValue: '',
            priceValue: 0,
            continentValue: 1,
            images: []
        }
    }
    onTitleChange = (event) => {
        this.setState({
            titleValue: event.target.value
        })
    };
    onDescriptionChange = (event) => {
        this.setState({
            descriptionValue: event.target.value
        })
    };
    onPriceChange = (event) => {
        this.setState({
            priceValue: event.target.value
        })
    };
    onContinentsSelectChange = (event) => {
        this.setState({
            continentValue: event.target.value
        })
    };
    updateImages = (newImages) => {
        this.setState({
            images: newImages
        })
    }
    onSubmit = (event) => {
        event.preventDefault();
        if (!(this.state.titleValue && this.state.descriptionValue &&
            this.state.priceValue && this.state.images
        )) {
            return alert("fill all fields!")
        }
        const productData = {
            writer: this.props.user.userData._id,
            title: this.state.titleValue,
            description: this.state.descriptionValue,
            price: this.state.priceValue,
            images: this.state.images,
            continents: this.state.continentValue
        }
        axios.post('/api/upload/product', productData)
            .then(response => {
                if (response.data.success) {
                    alert("upload success")
                    this.props.history.push('/')
                } else {
                  alert("failed to upload Product")
                }
            })

    }

    render() {
        return (
            <div className="container container-fluid">
                <div style={{maxWidth: '700px', margin: '2rem auto'}}>
                    <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                        <h2>Upload Travel Product</h2>
                    </div>
                    <Form onSubmit={this.onSubmit} >
                        <FileUpload refreshFunction={this.updateImages}/>
                        <FormGroup>
                            <Label>Title</Label>
                            <Input type="text" name="title" placeholder="Title"
                                   onChange={this.onTitleChange}
                                   value={this.state.titleValue}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input type="textarea" name="description"
                                   onChange={this.onDescriptionChange}
                                   value={this.state.descriptionValue}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Prise($)</Label>
                            <Input type="number" name="price" placeholder="price"
                                   onChange={this.onPriceChange}
                                   value={this.state.priceValue}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Continents</Label>
                            <Input type="select" name="Continent" onChange={this.onContinentsSelectChange}>
                                {Continents.map(item => (
                                    <option key={item.Key} value={item.Key}>{item.value}</option>
                                ))}
                            </Input>
                        </FormGroup>
                        <Button onClick={this.onSubmit} >
                            Submit
                        </Button>

                    </Form>
                </div>
            </div>
        );
    }
}

export default connect()(withRouter(UploadProductPage));