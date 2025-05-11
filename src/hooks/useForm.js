import { useState } from "react";

export function validateForm(values) {
  const errors = {};
  if (!values.username) {
    errors.username = "Username is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  }
  return errors;
}

export function useFormState(initialFormData, validateFn) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const handleFieldChange = (event) => {
    let { name, value } = event.target;
    setFormData((prevState) => {
      let updateFormState = { ...prevState, [name]: value };
      return updateFormState;
    });

    if (validateFn) {
      let validationErrors = validateFn({ ...formData, [name]: value });
      setErrors(validationErrors);
    }
  };

  const handleFormSubmit = (event, callbackFn) => {
    event.preventDefault();
    let validationErrors = {};
    if (validateFn) {
      validationErrors = validateFn(formData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors.length == 0)) {
        callbackFn(formData);
      }
    } else {
      callbackFn(formData);
    }
  };

  return { formData, errors, handleFieldChange, handleFormSubmit ,resetForm};
}

export function FormComponent() {
  const { values, errors, handleFieldChange, handleFormSubmit } = useFormState(
    { username: "", email: "" },
    validateForm
  );

  const onSubmit = (formData) => {
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={(event) => handleFormSubmit(event, onSubmit)}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={handleFieldChange}
        />
        {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleFieldChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default FormComponent;
