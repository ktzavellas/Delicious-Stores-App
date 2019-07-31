import React, { Component } from "react";
import classes from "./AddStoreForm.css";
import axios from "axios";
import Modal from "../UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import image1 from "../../assets/optimized/image6_result.jpg";
import image2 from "../../assets/optimized/image7_result.jpg";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class AddStoreForm extends Component {
  state = {
    addStoreForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Add store name *"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        processed: false
      },
      description: {
        elementType: "textarea",
        elementConfig: {
          type: "text",
          placeholder: "Add a description * (max 120 characters)"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        processed: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street *"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5
        },
        valid: false,
        touched: false,
        processed: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip *"
        },
        value: "",
        validation: {
          required: true,
          pattern: /(?!01000|99999)(0[1-9]\d{3}|[1-9]\d{4})/g
        },
        valid: false,
        touched: false,
        processed: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country *"
        },
        value: "",
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false,
        processed: false
      },
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
      types: {
        elementType: "select",
        elementConfig: {
          options: [
            { name: "BUSINESS", value: "BUSINESS" },
            { name: "FAMILY", value: "FAMILY" },
            { name: "OPEN LATE", value: "OPEN LATE" },
            { name: "WIFI", value: "WIFI" },
            { name: "TRADITIONAL", value: "TRADITIONAL" },
            { name: "FAST FOOD", value: "FAST FOOD" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        value: [],
        touched: false,
        processed: false
      }
    },
    loading: false,
    show: false
  };

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

  submitHandler = event => {
    event.preventDefault();
    const checkData = [];
    for (let formElementIdentifier in this.state.addStoreForm) {
      checkData.push(this.state.addStoreForm[formElementIdentifier].valid);
    }
    let validCheck = checkData.some(item => {
      return item === false;
    });
    if (!validCheck) {
      this.setState({ loading: true });
      const formData = {};
      for (let formElementIdentifier in this.state.addStoreForm) {
        formData[formElementIdentifier] = this.state.addStoreForm[
          formElementIdentifier
        ].value;
      }
      const address = `${formData.street} ${formData.zipCode} ${
        formData.country
      }`;
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
            address
          )}.json?access_token=${process.env.REACT_APP_stores_token}`
        )
        .then(res => {
          formData.coordinates = res.data.features[0].geometry.coordinates;
          const store = {
            storeData: formData
          };
          axios
            .post(
              "https://react-delicious-stores-5d65f.firebaseio.com/stores.json",
              store
            )
            .then(response => {
              this.setState({ loading: false });
              this.props.history.push(
                "/stores/" + this.state.addStoreForm.name.value
              );
            })
            .catch(error => {
              this.setState({ loading: false });
            });
        });
    } else {
      const updatedStoreForm = {
        ...this.state.addStoreForm
      };
      for (let formElementIdentifier in updatedStoreForm) {
        const updatedFormElement = {
          ...updatedStoreForm[formElementIdentifier]
        };
        updatedFormElement.processed = updatedStoreForm[formElementIdentifier]
          .touched
          ? false
          : true;
        updatedStoreForm[formElementIdentifier] = updatedFormElement;
      }
      this.setState({ addStoreForm: updatedStoreForm, show: true });
    }
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedStoreForm = {
      ...this.state.addStoreForm
    };
    const updatedFormElement = { ...updatedStoreForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedStoreForm[inputIdentifier] = updatedFormElement;
    this.setState({ addStoreForm: updatedStoreForm });
  };

  selectMultipleOption = (value, formElementId) => {
    const updatedStoreForm = {
      ...this.state.addStoreForm
    };
    const updatedFormElement = { ...updatedStoreForm[formElementId] };
    updatedFormElement.value = value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedStoreForm[formElementId] = updatedFormElement;
    this.setState({ addStoreForm: updatedStoreForm });
  };

  modalClosedHandler = () => {
    this.setState({ show: false });
  };

  onAuthHandler = () => {
    this.props.onSetAuthRedirectPath("/add");
    this.props.history.push("/auth");
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.addStoreForm) {
      formElementsArray.push({
        id: key,
        config: this.state.addStoreForm[key]
      });
    }
    let form = (
      <form className={classes.Form} onSubmit={this.submitHandler}>
        {formElementsArray.map(formElement => {
          return (
            <Input
              selectMultipleOption={value =>
                this.selectMultipleOption(value, formElement.id)
              }
              touched={formElement.config.touched}
              shouldValidate={formElement.config.validation}
              invalid={!formElement.config.valid}
              changed={event => this.inputChangedHandler(event, formElement.id)}
              key={formElement.id}
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

    if (!this.props.isAuthenticated) {
      form = (
        <div className={classes.authMessage}>
          <div>
            <h2>Authentication Required!</h2>
            <p>Please visit the Sign up / Log in page to authenticate</p>
            <button
              className={classes.onAuthButton}
              onClick={this.onAuthHandler}
            >
              OK
            </button>
          </div>

          <figure className={classes.FigureItem2}>
            <img src={image2} className={classes.Image2} alt="" />
          </figure>
        </div>
      );
    }

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <Aux>
        <Modal show={this.state.show} modalClosed={this.modalClosedHandler}>
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
        </Modal>

        <div className={classes.AddStoreFormContainer}>
          <figure className={classes.FigureItem1}>
            <img src={image1} className={classes.Image} alt="" />
          </figure>
          <div className={classes.AddStoreForm}>
            <h1>ADD YOUR STORE</h1>
            {form}
          </div>
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStoreForm);
