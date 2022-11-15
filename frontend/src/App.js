import React, { Component, Fragment } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Layout from "./components/Layout/Layout";
//import Backdrop from "./components/Backdrop/Backdrop";
import Toolbar from "./components/Toolbar/Toolbar";
import MainNavigation from "./components/Navigation/MainNavigation/MainNavigation";
import MobileNavigation from "./components/Navigation/MobileNavigation/MobileNavigation";

//import ErrorHandler from "./components/ErrorHandler/ErrorHandler";

import SignupPage from "./pages/Auth/Signup";
import "./App.css";

class App extends Component {
  state = {
    showBackdrop: false,
    showMobileNav: false,
    isAuth: false,
    token: null,
    userId: null,
    authLoading: false,
    error: null,
  };

  mobileNavHandler = (isOpen) => {
    this.setState({ showMobileNav: isOpen, showBackdrop: isOpen });
  };

  // formHandler = (data) => {
  //   console.log(data);
  //   console.log(data.firstname);
  //   fetch("http://localhost:8080/upload", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },

  //     body: JSON.stringify({
  //       firstname: data.firstname,
  //       lastname: data.lastname,
  //       email: data.email,
  //       department: data.department,
  //       subject: data.subject,
  //       phonenumber: data.phonenumber,
  //       date: data.date,
  //     }),
  //   })
  //     .then((res) => {
  //       if (res.status === 422) {
  //         throw new Error("Validation failed.");
  //       }
  //       if (res.status !== 200 && res.status !== 201) {
  //         console.log("Error!");
  //         throw new Error("Could not authenticate you!");
  //       }
  //       return res.json();
  //     })
  //     .then((resData) => {
  //       console.log("resData", resData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       this.setState({
  //         error: err,
  //       });
  //     });
  // };

  errorHandler = () => {
    this.setState({ error: null });
  };

  render() {
    let routes = (
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <SignupPage
              {...props}
              //onLog={this.formHandler}
              loading={this.state.authLoading}
            />
          )}
        />
      </Switch>
    );

    return (
      <Fragment>
        {/* {this.state.showBackdrop && (
          <Backdrop onClick={this.backdropClickHandler} />
        )}
        <ErrorHandler error={this.state.error} onHandle={this.errorHandler} /> */}
        <Layout
          header={
            <Toolbar>
              <MainNavigation
                onOpenMobileNav={this.mobileNavHandler.bind(this, true)}
                onLogout={this.logoutHandler}
                isAuth={this.state.isAuth}
              />
            </Toolbar>
          }
          mobileNav={
            <MobileNavigation
              open={this.state.showMobileNav}
              mobile
              onChooseItem={this.mobileNavHandler.bind(this, false)}
              onLogout={this.logoutHandler}
              isAuth={this.state.isAuth}
            />
          }
        />
        {routes}
      </Fragment>
    );
  }
}

export default withRouter(App);

// import React, { Component, Fragment } from "react";
// import { withRouter } from "react-router-dom";

// import Layout from "./components/Layout/Layout";
// import Toolbar from "./components/Toolbar/Toolbar";
// import MainNavigation from "./components/Navigation/MainNavigation/MainNavigation";
// import MobileNavigation from "./components/Navigation/MobileNavigation/MobileNavigation";

// import SignupPage from "./pages/Auth/Signup";
// import "./App.css";

// class App extends Component {
//   state = {
//     showBackdrop: false,
//     showMobileNav: false,
//     isAuth: false,
//     token: null,
//     userId: null,
//     authLoading: false,
//     error: null,
//     errorParam: null,
//     errorMsg: null,
//     open: false,
//     success: false,
//     successMsg: null,
//   };

//   mobileNavHandler = (isOpen) => {
//     this.setState({ showMobileNav: isOpen, showBackdrop: isOpen });
//   };

//   errorHandler = () => {
//     this.setState({ error: null });
//   };

//   render() {
//     return (
//       <Fragment>
//         <Layout
//           header={
//             <Toolbar>
//               <MainNavigation
//                 onOpenMobileNav={this.mobileNavHandler.bind(this, true)}
//                 onLogout={this.logoutHandler}
//                 isAuth={this.state.isAuth}
//               />
//             </Toolbar>
//           }
//           mobileNav={
//             <MobileNavigation
//               open={this.state.showMobileNav}
//               mobile
//               onChooseItem={this.mobileNavHandler.bind(this, false)}
//               onLogout={this.logoutHandler}
//               isAuth={this.state.isAuth}
//             />
//           }
//         />

//         <SignupPage {...this.state.props} loading={this.state.authLoading} />
//       </Fragment>
//     );
//   }
// }

// export default withRouter(App);
