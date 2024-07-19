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

const prepareForm = (formArr) => {
  return formArr.reduce((r, v) => ({ ...r, [v.name]: v.value }), {});
};

function Form({ title, formArr, subitBtn, onSubmit, redirect, onChange }) {
  const initialForm = prepareForm(formArr);

  const [form, setForm] = useState(initialForm);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmit(form, () => setForm(initialForm));
  };

  const onChangeHandler = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (onChange) onChange(e); // Call the passed onChange function
  };

  const hasRedirect = !!redirect;

  return (
    <SForm onSubmit={onSubmitHandler}>
      <SFormTitle>{title}</SFormTitle>
      {formArr.map(({ label, name, type, value, onChange }, index) => (
        <SFormControl key={index}>
          <SLable htmlFor={name}>{label}</SLable>
          <SInput
            autoComplete="off"
            id={name}
            name={name}
            type={type}
            value={value || form[name]}
            onChange={(e) => onChangeHandler(e)}
          />
        </SFormControl>
      ))}
      <SButton type="submit">
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
      value: PropTypes.string,
      onChange: PropTypes.func,
    })
  ),
  subitBtn: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  redirect: PropTypes.object,
  onChange: PropTypes.func, // Updated to make it optional
};

export default Form;
