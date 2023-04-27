import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate(null)
  const [errorReg, setErrorReg] = useState(null);


  async function registerForm(values) {
    let {data} = await axios.post(`https://sticky-note-fe.vercel.app/signup`, values)
    if(data.message == "success") {
      navigate('/login')
    } else {
      setErrorReg(data.message)
    }
    console.log(data);
  }

  let validationSchema = Yup.object({
    first_name: Yup.string()
      .required("first name is required")
      .min(3, "min length is 3")
      .max(15, "max length is 15"),
    last_name: Yup.string()
      .required("last name is required")
      .min(3, "min length is 3")
      .max(15, "max length is 15"),
    email: Yup.string().required("email is required").email(),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "password must start with uppercase"),
    age: Yup.number().required("age is required").positive().integer(),
  });

  let formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      age: "",
    },
    validationSchema,
    onSubmit: (values) => registerForm(values),
  });

  return (
    <>
      <div className="container">
        <div className="w-50 mx-auto my-5">
          <h2 className=" text-info">Registration Form</h2>
          {errorReg ? <div className="alert alert-danger">{errorReg}</div>:''}
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName" className="d-block">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="first_name"
              placeholder="Enter Your FirstName"
              className="form-control mb-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
            />
            {formik.errors.first_name && formik.touched.first_name ? (
              <div className="alert alert-danger mb-0">
                {formik.errors.first_name}
              </div>
            ) : (
              ""
            )}

            <label htmlFor="lastName" className="d-block">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="last_name"
              placeholder="Enter Your LastName"
              className="form-control mb-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
            />
            {formik.errors.last_name && formik.touched.last_name ? (
              <div className="alert alert-danger mb-0">
                {formik.errors.last_name}
              </div>
            ) : (
              ""
            )}

            <label htmlFor="email" className="d-block">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              className="form-control mb-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger mb-0">
                {formik.errors.email}
              </div>
            ) : (
              ""
            )}

            <label htmlFor="password" className="d-block">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              className="form-control mb-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger mb-0">
                {formik.errors.password}
              </div>
            ) : (
              ""
            )}

            <label htmlFor="age" className="d-block">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Enter Your Age"
              className="form-control mb-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
            />
            {formik.errors.age && formik.touched.age ? (
              <div className="alert alert-danger mb-0">{formik.errors.age}</div>
            ) : (
              ""
            )}

            <button type="submit" className="btn bg-info text-white w-100 mt-4">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
