import React, { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api from "../../apis/api";
import FormControl from "../../components/FormControl";

import { AuthContext } from "../../contexts/authContext";

function Login(props) {
  const authContext = useContext(AuthContext);

  const [state, setState] = useState({ password: "", email: "" });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/login", state);
      console.log(response);

      authContext.setLoggedInUser({ ...response.data });
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );
      setErrors({ password: "", email: "" });
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err.response);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (    
  
  <div className="container">
  <form onSubmit={handleSubmit}>
    <h1 className="titulos">Entre na sua conta</h1>

    <div>
      <FormControl
        label="E-mail"
        type="email"
        name="email"
        id="signupFormEmail"
        value={state.email}
        error={errors.email}
        onChange={handleChange}
      />
    </div>

    <div>
      <FormControl
        label="Senha"
        type="password"
        name="password"
        id="signupFormPassword"
        value={state.password}
        error={errors.password}
        onChange={handleChange}
      />
    </div>

    <div className="mb-3 d-flex">
      <button type="submit" className="btn btn-primary me-5">
        Entrar
      </button>
      <div>
        <Link  className="link-cadastre me-5" to="/signup">
           Cadastre-se!
        </Link>
      </div>
    </div>
  </form>
</div>
);
}


export default Login;
