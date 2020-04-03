import React, {Component} from 'react';
import {AuthPage} from "../../actions/user_actions";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AuthenticationCheck extends Component {

    checkAuth = (props) => {
        this.props.dispatch(AuthPage()).then(response => {
            if (!response.payload.isAuth) {
                if (this.props.reload) {
                    this.props.history.push('/login');
                }
            } else {
                if (this.props.adminRoute && !response.payload.isAdmin) {
                    this.props.history.push('/')
                }
                else {
                    if (this.props.reload === false) {
                        this.props.history.push('/')
                    }
                }
            }
        });
    }
    componentDidMount() {
        this.checkAuth();
    }


    render() {
        return (
            <this.props.pageToAuth {...this.props} user={this.props.user} />
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user
})
export default connect(mapStateToProps)(withRouter(AuthenticationCheck));