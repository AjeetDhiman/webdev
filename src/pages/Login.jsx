import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../features/Auth/authSlicer";
import { FormWrapper } from "../components/Form/FormWrapper";
import { Input } from "../components/Input/Input";
import { Button } from "../components/Button/Button";
import { API_ENDPOINTS } from "../apiConfig";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    setIsInvalidEmail(!email);
    setIsInvalidPassword(!password);

    if (!email || !password) {
      return;
    }

    const requestBody = {
      username: email,
      password: password,
    };

    dispatch(loginRequest());

    try {
      const response = await fetch(`${API_ENDPOINTS.login}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.user_nicename) {
          dispatch(loginSuccess(data));
          setEmail("");
          setPassword("");
          navigate("/");
        } else {
          dispatch(loginFailure("Unexpected error occurred"));
        }
      } else {
        if (response.status === 403) {
          dispatch(loginFailure("Invalid username or password"));
        } else {
          dispatch(loginFailure("Error during login. Please try again later."));
        }
      }
    } catch (error) {
      dispatch(loginFailure("Error during login. Please try again later."));
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(emailValue);

    setIsInvalidEmail(!isValidEmail);
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setIsInvalidPassword(!passwordValue);
  };

  return (
    <div className="h-dvh bg-purple-50 p-16">
      <div className="form--layout pt-40">
        <div className="flex justify-center">
          <div className="max-w-96 rounded-xl bg-white px-8 py-9">
            <h3 className="mb-3 text-2xl font-semibold">Login to account</h3>
            <p className="mb-6">
              Access to the most powerful tool in the entire design and web
              industry.
            </p>
            <FormWrapper
              submitHandler={submitHandler}
              id="lg--form"
              className="login--form w-full"
            >
              <Input
                ref={emailRef}
                type="email"
                name="email"
                value={email}
                autoComplete="off"
                className={`w-full ${
                  isInvalidEmail
                    ? "mb-2 ring-2 ring-danger focus-visible:ring-2 focus-visible:ring-danger"
                    : "mb-4"
                }`}
                placeholder="E-mail Address"
                inputHandler={handleEmailChange}
              />
              {isInvalidEmail && (
                <span className="mb-2 block text-sm text-danger">
                  Please enter a valid email address.
                </span>
              )}
              <Input
                ref={passwordRef}
                type="password"
                name="password"
                value={password}
                autoComplete="off"
                className={`w-full ${
                  isInvalidPassword || error
                    ? "mb-2 ring-2 ring-danger focus-visible:ring-2 focus-visible:ring-danger"
                    : "mb-4"
                }`}
                placeholder="Password"
                inputHandler={handlePasswordChange}
              />
              {isInvalidPassword && (
                <span className="mb-2 block text-sm text-danger">
                  Please enter a valid password.
                </span>
              )}
              {error && (
                <span className="mb-2 block text-sm text-danger">{error}</span>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </Button>
            </FormWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};
