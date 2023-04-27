import React, { useState } from "react";
import styles from './Login.module.css'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate(null)
  const [errorLogin, setErrorLogin] = useState(null);


  async function loginForm(values) {
    let {data} = await axios.post(`https://sticky-note-fe.vercel.app/signin`, values)
    if(data.message == "success") {
      localStorage.setItem("userToken", data.token)
      navigate('/home')
    } else {
      setErrorLogin(data.message)
    }
    console.log(data);
  }

  let validationSchema = Yup.object({
    email: Yup.string().required("email is required").email(),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "password must start with uppercase"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => loginForm(values),
  });

  return (
    <>
      <div className="container">
        <div className="w-50 mx-auto my-5">
          <h2 className=" text-info">Login Form</h2>
          {errorLogin ? <div className="alert alert-danger">{errorLogin}</div>:''}
          <form onSubmit={formik.handleSubmit}>

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

            <button type="submit" className="btn bg-info text-white w-100 mt-4">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
