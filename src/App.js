import React, { Component } from 'react';
import Layout from "./hoc/Layout/Layout";
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/auth/Logout/Logout";
import {connect} from 'react-redux';
import {authCheckState} from "./store/actions";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
    return import("./containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
    return import("./containers/auth/Auth");
});

class App extends Component {
    componentDidMount() {
        this.props.onAutoSignUp();
    }

    render() {
        let routes = (
            <Switch>
              <Route path='/auth' component={asyncAuth}/>
              <Route path='/' exact component={BurgerBuilder}/>
              <Redirect to='/'/>
            </Switch>

        );

        if(this.props.isAuth) {
            routes = (
                <Switch>
                    <Route path='/checkout' component={asyncCheckout}/>
                    <Route path='/orders' component={asyncOrders}/>
                    <Route path='/logout' component={Logout}/>
                    <Route path='/auth' component={asyncAuth}/>
                    <Route path='/' exact component={BurgerBuilder}/>
                    <Redirect to='/'/>
                </Switch>
            )
        }

    return (
      <div>
        <Layout>
            {routes}
        </Layout>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.token !== null
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAutoSignUp: () => dispatch(authCheckState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
