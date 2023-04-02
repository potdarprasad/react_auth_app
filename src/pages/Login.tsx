import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AxiosContext } from '../context/AxiosContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [message, setMessage] = useState(''); // This will be used to show a message if the submission is successful
  const [submitted, setSubmitted,] = useState(false);

  const axiosContext = useContext(AxiosContext);
  const { updateAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = async (value: any) => {
    const res = await axiosContext?.publicAxios.post('/auth/signin', {
      email: value.email,
      password: value.password
    });

    const { accessToken, refreshToken, id: userId } = res?.data;
    console.log('****', accessToken, refreshToken, userId);
    updateAuthState({
      accessToken,
      refreshToken,
      userId
    });
    return navigate("/");
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (value) => {
      onLogin(value);
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email('Must be a valid email')
        .required('Email is required'),
      password: yup.string().trim().required('Password is required'),
    }),
  });



  return <>
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center ">
      <div hidden={!submitted} className="alert alert-primary" role="alert">
        {message}
      </div>
      <form className="w-50" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="abc@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger">{formik.errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-danger">{formik.errors.password}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>

      </form>
    </div>
  </>

};

export default Login;