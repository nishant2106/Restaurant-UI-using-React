import React, { Component } from 'react';
import {
    Card, CardImg, CardBody, CardText, CardTitle, BreadcrumbItem, Breadcrumb, Button
    , Modal, ModalBody, ModalHeader, Label,Row,Col
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props){
        super(props)
        this.state={
            isModalOpen:false,
        }
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
        toggleModal() {
            this.setState({ 
                isModalOpen:!this.state.isModalOpen
            })
        }

        handleSubmit(values){
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
        }
        render() {
            return (
                <React.Fragment>
                <Button onClick={this.toggleModal}><span className="fa fa-pencil" /> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values)=>this.handleComment(values)}>
                    
                        
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select model=".rating" name="rating"
                                    className="form-control">
                                <option>1</option> 
                                <option>2</option> 
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>  
                            </Control.select>
                        
                        
                            <Label htmlFor="name">Your Name</Label>
                            <Control.text model=".name" id="name" name="name"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                className="text-danger"
                                model=".name"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                             />
                            <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="5"
                                    className="form-control"
                                    validators={{required}} />
                                    <Errors
                                    className="text-danger"
                                    model=".comment"
                                    show="touched"
                                    messages={{
                                        required: 'Required'
                                    }}
                                 />
                        <Button type="submit" value="submit" color="primary">Submit</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
                </React.Fragment>
            )
        }
    }
function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <div className='col-12 col-md-5 m-1'>
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
function RenderComments({ comments }) {
    if (comments != null) {
        return (
            <ul className='list-unstyled'>
                {comments.map((comment) => {
                    return (
                        <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>{`-- ${comment.author} , ${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}`}</p>
                        </li>
                    )
                })}
            </ul>
        )
    }
    else {
        return (
            <div></div>
        )
    }


}
const DishDetail =(props) => {
    if(props.dish != null)
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                    <RenderDish dish={props.dish} />
                    <div className='col-12 col-md-5 m-1'>
                                <h4>Comments</h4>
                                <RenderComments
                                    comments={props.comments} />
                                <CommentForm/>
                            </div>
                    
            </div>
            </div>
        );
    else 
        return(
            <div> </div>
        );
}
export default DishDetail;