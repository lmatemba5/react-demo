import { Person } from "react-bootstrap-icons";
import { Link, Navigate } from "react-router-dom";
import { TitleProvider, PersistenceAPI } from "../../apis/TitleProvider";
import React, { useEffect } from "react";
import { useConsumer } from "../../apis/ContextAPIProvider";
import Popup from "../../apis/Popup";

export default function Login() {
  const { isLoggedin, updateState } = useConsumer();

  useEffect(() => {
    if (isLoggedin() === false) {
      const user = PersistenceAPI();

      if (user) {
        updateState("user", user);
      }
    }
  }, [isLoggedin, updateState]);

  const submit = (event) => {
    Popup("Authenticating....", true);
    event.preventDefault();

    const timeout = setTimeout(() => {
      const user = {
        id: 1,
        name: event.target.name.value,
        role: Number(event.target.role.value),
        status: 1,
        extras: {
          token: "57|Jhb1fNKsR7oNHpUs24wB2EB4FhN9n9fLGXyzygid",
        },
      };

      Popup("Sign in was a success", false, "top-right", "white", 3000);
      localStorage.setItem("user", JSON.stringify(user));
      updateState("user", user);
      clearTimeout(timeout);
    }, 2000);
  };

  return isLoggedin() ? (
    <Navigate to="/dashboard" replace={true} />
  ) : (
    <div
      className="container-fluid"
      style={{ minHeight: "calc(100vh)", backgroundColor: "darkgrey" }}
    >
      <div
        className="row d-flex justify-content-center"
        style={{ minHeight: "calc(100vh)" }}
      >
        <div className="col-md-4 m-auto">
          <TitleProvider titleText="Login" />
          <div className="row">
            <div className="col d-flex justify-content-end">
              <div className="text-center text-white p-2  px-3 btn-sm rounded-top bg-primary d-flex align-items-center justify-content-center">
                <Person fontSize={16} className="me-2 fw-bold" />{" "}
                <span>LOGIN</span>
              </div>
            </div>
          </div>
          <div
            className="card p-0 bg-primary border-0"
            style={{
              borderTopWidth: "4.33px",
              borderRadius: "30px 0px 10px 10px",
            }}
          >
            <div
              className="card-body bg-white"
              style={{ borderRadius: "10px 0px 10px 10px" }}
            >
              <form onSubmit={(e) => submit(e)}>
                <div className="form-group mt-3">
                  <label className="form-label mb-2"> Name</label>
                  <div className="col">
                    <input
                      defaultValue="Lifa Matemba"
                      className="form-control"
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                    />
                  </div>
                </div>

                <div className="form-group mt-3">
                  <label className="form-label mb-2">Role</label>
                  <div className="col">
                    <select
                      className="form-select"
                      name="role"
                      defaultValue={1}
                    >
                      {
                        // <option value={2}>Field Officer</option>
                        // <option value={3}>Financial Officer</option>
                      }
                      <option value={1}>Administrator</option>
                    </select>
                  </div>
                </div>

                <div className="form-group mt-3">
                  <Link to="password-reset" style={{ textDecoration: "none" }}>
                    Forgot Password?
                  </Link>
                  <div className="col d-flex justify-content-end">
                    <button className="btn btn-primary btn-sm">Login</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
