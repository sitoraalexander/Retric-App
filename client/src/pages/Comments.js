import React, { useState, useEffect, useRef } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row } from "../components/Grid";
import { Table, Tr, Th, Td } from "../components/Table";
import { ForwardRefInput, FormBtn } from "../components/Form";
import Categories from "../components/Categories"
import "../style.css";

function Comments({ username }) {
	// Setting our component's initial state
	const [comments, setComments] = useState([]);
	const [formObject, setFormObject] = useState({
	  title: "",
	  username: ""
	});

	const [categoryState, setCategoryState] = useState("")
	

  
	
    // const [formSearch, setFormSearch] = useState({
	// 	search: "",
	// 	username: ""
	// });
   
   // get input element ref for focus
   const titleInputElRef = useRef();
 
	// Load all comments and store them with setComments
	useEffect(() => {
      // set user after successful component mount
      setFormObject({
		 title: "",
		 username: "", 
         username})

      loadComments();

      // focus on titleInputEl if ref exists
      titleInputElRef.current.focus()
   }, [username]);
   

	// Loads all comments and sets them to comments
	function loadComments() {
		API.getComments()
			.then((res) => setComments(res.data))
			.catch((err) => console.log(err));
	}


	// Handles updating component state when the user types into the input field
	function handleInputChange(event) {
		const { name, value } = event.target;
		setFormObject({ ...formObject, [name]: value });
	}

	function handleChange(event) {
		setCategoryState(event.target.value);
		//this.setState({value: event.target.value});
	}

	// function handleDetailChange(event) {
	// 	const { detail, value } = event.target;
	// 	this.setState({[detail]: value});
			  
	// 	setFormObject({ ...formObject, [detail]: value });
	// }

	// handleInputChange = event => {
	// 	const { name, value } = event.target;
	// 	this.setState({
	// 	  [name]: value
	// 	});
	//   };


	// *** start Search module
	// function handleSearchChange(event) {
	// 	const { search, value } = event.target;
    // 		this.setState({
    //   			[search]: value
    // 		});
  	// };
	

	// function handleSearchSubmit(event) {
	// 	console.log(event);
	// }
	// // *** end Search module
	



	// When the form is submitted, use the API.saveComment method to save the comment data
	// Then reload comments from the database
	function handleFormSubmit(event) {
		event.preventDefault();
		if (formObject.title.length > 3) {
			console.log(formObject.title);
			API.saveComment({
				title: formObject.title,
				username: formObject.username,
			})
            .then(loadComments)
            .then(() => setFormObject({
			   title: "",
               username: ""
            }))
				.catch((err) => console.log(err));
		}
	}

	return <>
		<Row>
			<Col size='md-12'>
				<form>
					<Col size='sm-5' margin ="auto">
						<ForwardRefInput ref={ titleInputElRef } value={formObject.title} onChange={handleInputChange} name='title' placeholder='Enter search post' />
					</Col>
					<Col size='sm-4' margin ="auto">
					<label>
						Category: 
						<select id ="category" defaultValue="" onChange={handleChange}>
							<option value="art">Art</option>
							<option value="culinary">Culinary</option>
							<option value="exercise">Exercise</option>
							<option value="home">Home</option>
							<option value="music">Music</option>
							<option value="sports">Sports</option>
							<option value="technology">Technology</option>
							<option value="other">other</option>
						</select>
					</label>
					</Col>
					<FormBtn
						// disabled={!(formObject.body && formObject.detail)}
						onClick={handleFormSubmit}>
						Search
					</FormBtn>
				</form>
			</Col>
		</Row>,
		<Row>
			<Col size='md-12'>
				<h2 className="title">List of all requests </h2>
			</Col>
		</Row>,
			
		{/* <Row>
			<Col size='md-12'>
				<h3 className="title">Post Search</h3>
				<h2 className="title">Search</h2>
			<Input
                value={this.state.search}
                onChange={this.handleSearchChange}
                name="search"
                placeholder="Key word (required)"
              />
			  <FormBtn
				onClick={this.handleSearchSubmit}
				className="btnStyling" variant="primary"
              >
                Search
              </FormBtn>
          	</Col>
		</Row>, */}
		<Row>
			<Col size='md-8'>
				{comments.length ? (
					<Table>
						<Tr>
							<Th>Member</Th>
							<Th>Title</Th>
							<Th>Detail</Th>
							<Th>Offer</Th>
							<Th>Date</Th>
						</Tr>
						{comments.map(comment => (
							<Tr key={comment._id}>
								<Td><strong>{comment.username}</strong> 
								</Td>
								<Td>
									<Link
										to={"/comments/" + comment._id}
										style={{ textAlign: "left", display: "block" }}>
										<span>{comment.title}</span>
									</Link>
								</Td>
								<Td>{comment.detail}</Td>
								<Td>{comment.offer}</Td>
								<Td>{comment.date}</Td>
							</Tr>
						))}
					</Table>
				) : (
					<h3>No Results to Display</h3>
				)}
			</Col>
			{/* <Col size="sm-4">
			<Categories style={{ textAlign: "center", display: "block" }}/>
			</Col> */}
		</Row>,
	</>;
}

export default Comments;
