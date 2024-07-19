// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  SForm,
  SFormTitle,
  SFormControl,
  SLable,
  SButton,
  SInput,
  SRedirect,
  SRedirectLink,
  SRedirectLabel,
} from "./Styles";

// eslint-disable-next-line no-unused-vars
import { redirect } from "react-router-dom";

// convert an array of form objects into an object
const prepareForm = (formArr) => {
  return formArr.reduce((r, v) => ({ ...r, [v.name]: v.value }), {});
};

function Form({ title, formArr, subitBtn, onSubmit, redirect }) {
  const initialForm = prepareForm(formArr);

  // console.log(initialForm);
  const [form, setForm] = useState(initialForm);

  const onSubmitHandler = () => onSubmit(form, () => setForm(initialForm));
  const onChangeHandler = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const hasRedirect = !!redirect;

  return (
    <SForm>
      <SFormTitle>{title}</SFormTitle>
      {formArr.map(({ label, name, type }, index) => (
        <SFormControl key={index}>
          <SLable htmlFor={name}>{label}</SLable>
          <SInput
            autoComplete="off"
            id={name}
            name={name}
            type={type}
            value={form[name]}
            onChange={(e) => onChangeHandler(e)}
          />
        </SFormControl>
      ))}

      <SButton
        onClick={(e) => {
          e.preventDefault();
          onSubmitHandler();
        }}
      >
        {subitBtn}
      </SButton>
      {hasRedirect && (
        <SRedirect>
          <SRedirectLabel>{redirect.label}</SRedirectLabel>
          <SRedirectLink to={redirect.link.to}>
            {redirect.link.label}
          </SRedirectLink>
        </SRedirect>
      )}
    </SForm>
  );
}

Form.propTypes = {
  title: PropTypes.string,
  formArr: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ),
  subitBtn: PropTypes.string,
  onSubmit: PropTypes.func,
  redirect: PropTypes.object,
};
export default Form;
