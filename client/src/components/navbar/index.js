import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink, Badge
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import {logoutUser} from "../../actions/user_actions";

class NavbarMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };
    render() {
        return (
            <div className=" z-index " style={{ position: "fixed", width: "100%", top: 0, zIndex: 2}}>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand className="text-light"
                                 href="/"
                    >Landing <i className="fa text-light">&#xf072;</i>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {/*hiding those parts of navbar where authentication is needed and a user is not logged in */}
                        {this.props.user.isAuth ?
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink className="d-flex flex-wrap my-n2" href="/cartpage">
                                        <i className="fa text-light"><h3>&#xf07a;</h3></i>
                                        { ((this.props.user.cart) && this.props.user.cart.length > 0) &&
                                        <p><Badge className="mp-n4" color="success" pill>
                                            {this.props.user.cart.length}</Badge>
                                        </p>
                                        }
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/history">History</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="text-light" href="/product/upload">
                                        Upload <i className="fa text-light">&#xf093;</i></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={() => logoutUser()} href="/login">Log Out</NavLink>
                                </NavItem>
                            </Nav> :
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/login">Log In</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/register">Sign Up</NavLink>
                                </NavItem>
                            </Nav>
                        }
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user.userData,
    state: state
});
export default connect(mapStateToProps)(NavbarMenu);