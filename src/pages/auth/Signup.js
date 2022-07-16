import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../apis/api";
import FormControl from "../../components/FormControl";

function Signup(props) {
  const [state, setState] = useState({ name: "", password: "", email: "" });
  const [error, setError] = useState({
    name: null,
    email: null,
    password: null,
  });

  const navigate = useNavigate();

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/signup", state);
      setError({ name: "", password: "", email: "" });
      navigate("/login");
      console.log("RESPONSA DATA", response.data);
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        return setError({ ...err.response.data.errors });
      }

      console.error(err);
    }
  }


  return (
<div>
      <h1 class="col-6 py-3 " >Crie sua conta</h1>

      <form class="col-6" onSubmit={handleSubmit}>
        <FormControl
          label="Nome completo"
          id="signupFormName"
          required
          name="name"
          onChange={handleChange}
          value={state.name}
        />
        <FormControl
          type="email"
          label="E-mail"
          id="signupFormEmail"
          required
          name="email"
          onChange={handleChange}
          value={state.email}
         
        />

        <FormControl
          type="password"
          label="Senha"
          id="signupFormPassword"
          required
          name="password"
          onChange={handleChange}
          value={state.password}
          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
         
        />



        
<div className="mb-3">
          <button  type="submit" className="btn btn-primary">
          
              <span
                className="me-2"
                role="status"
                aria-hidden="true"
              ></span>
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}


export default Signup;
