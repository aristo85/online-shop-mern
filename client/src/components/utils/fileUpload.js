import React, {Component} from 'react';
import Dropzone from "react-dropzone";
import axios from 'axios';
// import kate from './kate.jpg';

class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }

    onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])
        axios.post('/api/product/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        images: [...this.state.images, response.data.fileName]
                    })
                    this.props.refreshFunction(this.state.images)
                } else {
                    alert('failed to save the image in Server')
                }
            })
    }
    onDelete = (indexToDelete) => {
        let newImages = this.state.images.filter((image, index) => index !== indexToDelete);
        this.setState({
            images: newImages
        })
    }

    render() {
        return (
            <div style={{display: "flex", justifyContent: "space-between"}}>
               <Dropzone
                   onDrop={this.onDrop}
                   multiple={false}
                   maxSize={800000000}
               >
                   {({getRootProps, getInputProps}) => (
                       <div style={{width: '300px', height: '240px', border: '10px solid lightgray', display: "flex",
                           alignItems: "center", justifyContent: "center"}}
                            {...getRootProps()}
                       >
                           <input {...getInputProps()} />
                           <p style={{fontSize: 100}}>+</p>
                       </div>
                   )}

               </Dropzone>
                <div style={{ display: "flex", width: "350px", height: "240px", overflowX: "scroll"}}>
                    {this.state.images.map((image, index) => {
                        return(<div key={index} onClick={() => this.onDelete(index)}>
                            <img style={{ minWidth: '300px', width: '300px', height: '240px'}}
                                 src={`http://localhost:5000/${image}`} alt={`productImg-${index}`} />
                        </div>)
                    })}

                </div>

            </div>
        );
    }
}

export default FileUpload;