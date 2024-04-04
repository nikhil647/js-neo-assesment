import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import ShowPopup from "../Components/ShowPopup";
import Loader from "../Components/Loader";

import Style from "../styles/Register.module.css";
import {
  userNamePattern,
  emailPattern,
  mobileNumberPattern,
} from "../helper/helper";

export default function Register() {
  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "all",
    reValidateMode: "onSubmit",
    criteriaMode: "firstError",
  });
  const submitButtonRef = useRef(null);

  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [popupInfo, setPopupInfo] = useState("");

  const getProfilePathIfPresent = async (data) => {
    let profilepath = "";
    if (data?.picture[0]) {
      const formData = new FormData();
      formData.append("picture", data.picture[0]);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/picture/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (res.ok) {
          res = await res.json();
          profilepath = res.path;
        }
      } catch (err) {
        console.log("Error -->", err);
      }
    }
    return profilepath;
  };

  const onSubmit = async (data) => {
    const profilepath = await getProfilePathIfPresent(data);

    const newData = {
      name: data.name,
      username: data.Username,
      email: data.Email,
      number: data.MobileNumber,
      profilepath: profilepath,
      password: data.Password,
    };

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/user/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    );
    const json = await response.json();
    if (response.ok && json?.message == "User Created") {
      reset();
      setShowRegisterPopup(true);
      setPopupInfo({ msg: "User Registered Successfully.", success: true });
    } else {
      setShowRegisterPopup(true);
      setPopupInfo({
        msg: json.error ? json.error : "Something went wrong",
        success: false,
      });
    }

    if (response.ok && json?.message == "User Created") {
      reset();
      setShowRegisterPopup(true);
      setPopupInfo({ msg: "User Registered Successfully.", success: true });
    } else {
      setShowRegisterPopup(true);
      setPopupInfo({
        msg: json.error ? json.error : "Something went wrong",
        success: false,
      });
    }
  };

  if (isSubmitting == true) {
    return <Loader />;
  }

  return (
    <div className={Style.registerContainer}>
      <form className="form-group container " onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="Uname">
          Username: <span className={Style.redError}>*</span>
        </label>
        <input
          type="text"
          id="Uname"
          placeholder="joh_123"
          className="form-control"
          {...register("Username", {
            required: "User name required",
            max: 12,
            min: 3,
            maxLength: 12,
            pattern: userNamePattern,
          })}
        />

        {errors.Username && (
          <p className={Style.redError}>
            {" "}
            {errors.Username.type == "required" && "Username is Required"}{" "}
            {errors.Username.type == "maxLength" && "Exceeding limit"}{" "}
            {errors.Username.type == "pattern" &&
              "Should Begin alphabets. Allowed Symbols (.@_$)  eg. nik647"}{" "}
          </p>
        )}

        <label htmlFor="name">
          Name: <span className={Style.redError}>*</span>
        </label>
        <input
          id="name"
          type="text"
          className="form-control"
          placeholder="John Doe"
          {...register("name", { required: "Name is required", maxLength: 80 })}
        />
        {errors.name && (
          <p className={Style.redError}>
            {" "}
            {errors.name.type == "required" && "First Name is Required"}{" "}
            {errors.name.type == "maxLength" && "Exceeding limit"}{" "}
          </p>
        )}

        <label htmlFor="number">Number: </label>
        <input
          type="tel"
          id="number"
          className="form-control"
          placeholder="900XXXXXXX"
          {...register("MobileNumber", {
            maxLength: 14,
            pattern: mobileNumberPattern,
          })}
        />

        {errors.MobileNumber && (
          <p className={Style.redError}>
            {" "}
            {errors.MobileNumber.type == "maxLength" && "Exceeding limit"}{" "}
            {errors.MobileNumber.type == "pattern" &&
              "Should Only Contain Digits"}{" "}
          </p>
        )}

        <label htmlFor="email">
          Email: <span className={Style.redError}>*</span>
        </label>
        <input
          type="text"
          placeholder="example@mail.com"
          className="form-control"
          {...register("Email", {
            required: true,
            pattern: emailPattern,
            maxLength: 320,
          })}
        />

        {errors.Email && (
          <p className={Style.redError}>
            {" "}
            {errors.Email.type == "required" && "Email is Required"}{" "}
            {errors.Email.type == "maxLength" && "Exceeding limit"}{" "}
            {errors.Email.type == "pattern" && "Not a valid Email Id"}{" "}
          </p>
        )}

        <label htmlFor="email">
          Password: <span className={Style.redError}>*</span>
        </label>
        <input
          type="password"
          placeholder="...."
          className="form-control"
          {...register("Password", {
            required: true,
            minLength: 8,
            maxLength: 20,
          })}
        />

        {errors.Password && (
          <p className={Style.redError}>
            {" "}
            {errors.Password.type == "required" && "Password is Required"}{" "}
            {errors.Password.type == "maxLength" && "Exceeding limit"}{" "}
            {errors.Password.type == "minLength" &&
              "Minimum 8 characters Required"}
          </p>
        )}

        <label htmlFor="profile-image">Image:</label>
        <div>
          <input {...register("picture")} type="file" name="picture" />
        </div>

        <div className="d-flex justify-content-center align-item center mt-2">
          <Button
            variant="primary"
            onClick={(e) => {
              // trigger([
              //   "email",
              //   "Username",
              //   "name",
              //   "MobileNumber",
              //   "Email",
              //   "Password",
              // ]);

              if (submitButtonRef.current) {
                submitButtonRef.current.click();
              }
            }}
          >
            Sign Up
          </Button>
          <input
            style={{ visibility: "hidden" }}
            ref={submitButtonRef}
            type="submit"
            id="sub"
          />
        </div>
      </form>

      <ShowPopup
        show={showRegisterPopup}
        popupInfo={popupInfo}
        handleClose={() => setShowRegisterPopup(false)}
      />
    </div>
  );
}
