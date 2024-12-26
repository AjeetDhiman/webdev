// useSessionTimeout.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sessionTimeout } from "../features/Auth/authSlicer";

const useSessionTimeout = () => {
  const [idleTime, setIdleTime] = useState(0);
  // const idleLimit = 600000; // 10 minutes
  const idleLimit = 10000;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    // Validate token on page load or refresh
    if (token) {
      validateToken(token)
        .then((response) => {
          if (!response.valid) {
            sessionStorage.removeItem("authToken");
            dispatch(sessionTimeout());
            navigate("/login");
          }
        })
        .catch(() => {
          sessionStorage.removeItem("authToken");
          dispatch(sessionTimeout());
          navigate("/login");
        });
    } else {
      dispatch(sessionTimeout());
      navigate("/login");
    }

    const resetIdleTimer = () => setIdleTime(0);

    // Event listeners for user activity
    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("keydown", resetIdleTimer);

    // Idle timeout logic
    const timer = setInterval(() => {
      setIdleTime((prevTime) => {
        if (prevTime >= idleLimit) {
          sessionStorage.removeItem("authToken");
          dispatch(sessionTimeout());
          navigate("/login"); // Redirect to login
        }
        return prevTime + 1000; // Increment idle time by 1 second
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("keydown", resetIdleTimer);
    };
  }, [dispatch, navigate]);

  const validateToken = async (token) => {
    try {
      const response = await fetch("/wp-json/jwt-auth/v1/token/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { valid: false };
    }
  };
};

export default useSessionTimeout;
