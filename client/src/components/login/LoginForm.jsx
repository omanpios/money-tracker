import Input from "./Input";
import Button from "./Button";
import { useState } from "react";

function LoginForm({ text }) {
  const [emailPassword, setEmailPassword] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    const { value, name } = e.target;
    console.log(name);
    setEmailPassword((prevValue) => {
      if (name === "email") {
        return {
          email: value,
          password: prevValue.password,
        };
      } else if (name === "password") {
        return {
          email: prevValue.email,
          password: value,
        };
      }
    });
  }

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  }

  async function handleClick(e) {
    e.preventDefault();
    console.log();
    const { email, password } = emailPassword;
    try {
      const response = await postData("http://localhost:8080/login", {
        email: email,
        password: password,
      });
      alert(response.status);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container-sm">
      <form>
        <Input
          label="Email address"
          type="email"
          id="inputEmail"
          name="email"
          onChange={handleInputChange}
          vale={emailPassword.email}
        />
        <Input
          label="Password"
          type="password"
          id="inputPassword"
          name="password"
          onChange={handleInputChange}
          value={emailPassword.password}
        />
        <Button onClick={handleClick} text={text} />
      </form>
    </div>
  );
}

export default LoginForm;
