import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	images: [],
        	imageUrls: [],
        	message: ''
        }
    }

    selectFiles = (event) => {
		let images = [];
		console.log(images,'ini images')
    	for (var i = 0; i < event.target.files.length; i++) {
            images[i] = event.target.files.item(i);
        }
        images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
        let message = `${images.length} valid image(s) selected`
		this.setState({ images, message })
		console.log(images,'ini images after')
    }

    uploadImages = () => {
    
    	const uploaders = this.state.images.map(image => {
			const data = new FormData();
			console.log(data,'ini data')
		    data.append("image", image, image.name);
		    
	    	// Make an AJAX upload request using Axios
			return axios.post(BASE_URL + 'upload', data)
	    	.then(response => {
				console.log(response.data)
				this.setState({imageUrls: [response.data.imageUrl, ...this.state.imageUrls]});
			})
		});

	 	// Once all the files are uploaded 
		axios.all(uploaders).then(() => {
			console.log(this.state.imageUrls);
		}).catch(err => alert(err.message));

    }

    render() {
        return (
        	<div>
	        	<br/>
	        	<div className="col-sm-12">
        			<h1>Image Uploader</h1><hr/>
	        		<div className="col-sm-4">
						<div>Select Files</div>
		        		<input className="form-control " type="file" onChange={this.selectFiles} multiple/>
		        	</div>
		        	{ this.state.message? <p className="text-info">{this.state.message}</p>: ''}
		        	<br/><br/><br/>
		        	<div className="col-sm-4">
		            	<button className="btn btn-primary" value="Submit" onClick={this.uploadImages}>Submit</button>
		        	</div>
	            </div>
	            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><hr/><br/>
	            <div className="row col-lg-12">
		        	{ 
			          	this.state.imageUrls.map((url, i) => (
				          		<div className="col-lg-2" key={i}>
				          			<img src={BASE_URL + url} className="img-rounded img-responsive" alt="not available"/><br/>
				          		</div>
				          	))
			        }
		        </div>
		    </div>
        );
    }
}

export default App; 			