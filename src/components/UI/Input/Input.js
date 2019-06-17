import React from "react";
import classes from "./Input.css";
import Picky from "react-picky";
import "react-picky/dist/picky.css";

const input = props => {
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  if (props.shouldValidate && props.processed && props.invalid) {
    inputClasses.push(classes.Invalid);
  }
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;

    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <div className={classes.SelectInput}>
          <Picky
            className={inputClasses.join(" ")}
            open={false}
            value={props.value}
            options={props.elementConfig.options}
            onChange={props.selectMultipleOption}
            valueKey="value"
            labelKey="name"
            multiple={true}
            includeSelectAll={false}
            includeFilter={false}
            dropdownHeight={100}
          />
        </div>
      );
      break;
    default:
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
  }
  return <div className={classes.Input}>{inputElement}</div>;
};
export default input;
