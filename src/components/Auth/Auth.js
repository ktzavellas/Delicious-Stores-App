import React, { Component } from "react";
import Input from "../UI/Input/Input";
import classes from "./Auth.css";
import Aux from "../../hoc/Aux/Aux";
import Modal from "../UI/Modal/Modal";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email *"
        },
        value: "",
        validation: {
          required: true,
          pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        valid: false,
        touched: false,
        processed: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password * (min 6 characters)"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false,
        processed: false
      }
    },
    show: false,
    isSignUp: true,
    switchContent: false
  };

  componentWillUnmount() {
    this.props.onSetAuthRedirectPath("/");
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps.error !== newProps.error && newProps.error !== null) {
      this.setState({ show: true, switchContent: false });
    }
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required && typeof value !== "object") {
      isValid = value.trim() !== "";
    }
    if (rules.required && typeof value === "object") {
      isValid = value.length !== 0;
    }
    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }
    if (rules.pattern) {
      isValid = rules.pattern.test(value.trim()) && isValid;
    }
    return isValid;
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    const checkData = [];
    for (let controlName in this.state.controls) {
      checkData.push(this.state.controls[controlName].valid);
    }
    let validCheck = checkData.some(item => {
      return item === false;
    });
    if (!validCheck) {
      this.props.onAuth(
        this.state.controls.email.value,
        this.state.controls.password.value,
        this.state.isSignUp
      );
    } else {
      const updatedCtrl = {
        ...this.state.controls
      };
      for (let controlName in updatedCtrl) {
        const updatedCtrlElement = {
          ...updatedCtrl[controlName]
        };
        updatedCtrlElement.processed = updatedCtrl[controlName].touched
          ? false
          : true;
        updatedCtrl[controlName] = updatedCtrlElement;
      }
      this.setState({ controls: updatedCtrl, show: true, switchContent: true });
    }
  };

  modalClosedHandler = () => {
    this.setState({ show: false });
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = (
      <form className={classes.Form} onSubmit={this.submitHandler}>
        {formElementsArray.map(formElement => {
          return (
            <Input
              key={formElement.id}
              touched={formElement.config.touched}
              shouldValidate={formElement.config.validation}
              invalid={!formElement.config.valid}
              changed={event => this.inputChangedHandler(event, formElement.id)}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              processed={formElement.config.processed}
            />
          );
        })}
        <div className={classes.ButtonContainer}>
          <button type="submit" className={classes.Button}>
            SUBMIT
          </button>
        </div>
        <p className={classes.FormNote}>Fields marked with * are required</p>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    let title = "SIGN UP";
    let buttonDescription = "Already Registered ?";
    let switchButtonText = "SIGN IN";
    if (!this.state.isSignUp) {
      title = "SIGN IN";
      buttonDescription = "Not Registered ?";
      switchButtonText = "SIGN UP";
    }

    let modalContent = (
      <div className={classes.modalContent}>
        <h1 className={classes.logo}>Delicious Stores</h1>
        <p className={classes.modalText}>
          Please fill out the required fields with valid data...
          <br />
          Thank you!
        </p>
        <hr />
        <button
          className={classes.modalButton}
          onClick={this.modalClosedHandler}
        >
          OK
        </button>
      </div>
    );

    if (this.props.error && !this.state.switchContent) {
      modalContent = (
        <div className={classes.modalContent}>
          <p className={classes.modalText}>
            AUTHENTICATION FAILED:
            <br />
            {this.props.error.response.data.error.message}
          </p>
          <hr />
          <button
            className={classes.modalButton}
            onClick={this.modalClosedHandler}
          >
            OK
          </button>
        </div>
      );
    }

    return (
      <Aux>
        {this.props.isAuthenticated ? (
          <Redirect to={this.props.authRedirectPath} />
        ) : null}
        <Modal show={this.state.show} modalClosed={this.modalClosedHandler}>
          {modalContent}
        </Modal>
        <div className={classes.AuthContainer}>
          <div className={classes.AuthForm}>
            <h1>{title}</h1>
            {form}
            <div>
              <p className={classes.ButtonDescription}>{buttonDescription}</p>
              <button
                className={classes.SwitchButton}
                onClick={this.switchAuthModeHandler}
              >
                {switchButtonText}
              </button>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    isAuthenticated: state.token !== null,
    authRedirectPath: state.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
