import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";
import { urlApi } from "../../config/config";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${urlApi}/auth/login`, credentials);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data });
    }
  };

  return (
    <div className="loginPage">
      <div className="background">
        <div className="loginBox">
          <div className="header">
            <div className="avatar">
              <i className="fas fa-user-circle"></i>
            </div>
            <h1 className="title">My Account</h1>
          </div>
          <form className="form">
            <div className="inputContainer">
              <i className="fas fa-user inputIcon"></i>
              <input
                type="text"
                placeholder="Username"
                id="username"
                value={credentials.username}
                onChange={handleChange}
                className="lInput"
                required
              />
            </div>
            <div className="inputContainer">
              <i className="fas fa-lock inputIcon"></i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                value={credentials.password}
                onChange={handleChange}
                className="lInput"
                required
              />
              <button
                type="button"
                className="passwordToggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </button>
            </div>
            <button
              disabled={loading}
              onClick={handleClick}
              className="lButton"
            >
              Sign in
            </button>
          </form>
            {error && <span className="errorMessage">{error.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default Login;
