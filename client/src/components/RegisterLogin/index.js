import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loginUser } from "../../actions/user_actions";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';

class RegisterLogin extends Component {

   state = {
            username: "",
            password: "",
            errors: []
        }


    displayErrors = errors => (
        errors.map((error, i) => <p key={i}>{error}</p> )
    )

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    submitForm = event => {
        event.preventDefault();
        let dataToSubmit = {
            username: this.state.username,
            password: this.state.password
        };

        if (this.isFormValid(this.state)) {
            this.setState({ errors: [] })
            this.props.dispatch(loginUser(dataToSubmit))
                .then(response => {
                    if(response.payload.loginSuccess){
                        this.props.history.push('/');
                    } else {
                        this.setState({
                            errors: this.state.errors.concat(
                                "Failed to log in, check username and the password"
                            )
                        })
                    }
                });
        } else {
            this.setState({
                errors: this.state.errors.concat("Form is not valid")
            })
        }
    }

    isFormValid = ({ username, password }) => username && password;

    render() {
        return (
            <div className="container container-fluid">
                <h2> Login </h2>
                <div>
                    <form>
                        <div>
                            <label>User Name</label><br/>
                            <input
                                name="username"
                                value={this.state.username}
                                onChange={e => this.handleChange(e)}
                                id="username"
                                type="text"
                                placeholder="username"
                            />
                        </div>
                        <div>
                            <label>Password</label><br/>
                            <input
                                name="password"
                                value={this.state.password}
                                onChange={e => this.handleChange(e)}
                                id="password"
                                type="password"
                                placeholder="password"
                            />
                        </div>

                        {this.state.errors.length ? (
                            <div>
                                {this.displayErrors(this.state.errors)}
                            </div>
                        ): null}

                        <div><br/>
                            <Button
                                type="submit"
                                name="action"
                                onClick={this.submitForm}
                                >
                                Login
                            </Button>&nbsp;
                            <Link to="/register">
                                <Button
                                    type="submit"
                                    name="action"
                                >
                                    Sign up
                                </Button>
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user
})
export default connect(mapStateToProps)(RegisterLogin);