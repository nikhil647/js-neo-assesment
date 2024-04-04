import { useState, useEffect } from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Style from "../styles/signin.module.css";
import { emailPattern } from "../helper/helper";
import { useRouter } from "next/router";
import Captcha from "demos-react-captcha";
import Loader from "../Components/Loader";

//var Recaptcha = require("react-recaptcha");
//import ReCAPTCHA from "react-google-recaptcha";

// import {
//   loadCaptchaEnginge,
//   LoadCanvasTemplateNoReload,
//   validateCaptcha,
// } from "react-simple-captcha";

import {
  useSession,
  signIn,
  getSession,
  getProviders,
  getCsrfToken,
} from "next-auth/react";

export default function Signin({ providers, csrfToken }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState(false);
  const [verified, setisVerified] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (verified) {
      let options = {
        redirect: false,
        email: data.Email,
        password: data.Password,
      };

      try {
        const response = await signIn("credentials", options);

        if (response.ok) {
          router.push("/dashboard");
        } else {
          setErrorMsg("Invalid Credentials");
        }
      } catch (err) {
        setErrorMsg("Something went wrong");
      }
    } else {
      setErrorMsg("Captcha is not matching");
    }
  };

  if (status == "loading" || isSubmitting == true) {
    return <Loader />;
  }
  if (status == "authenticated") {
    router.push("/dashboard");
  }

  const onChange = (value) => {
    setisVerified(value);
  };

  return (
    <div className={Style.signInContainer}>
      <Head></Head>
      <form
        className="form-group container"
        method="post"
        action="/api/auth/signin/email"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        <label htmlFor="email">Email: *</label>
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

        <label htmlFor="email">Password: *</label>
        <input
          type="password"
          placeholder="...."
          className="form-control"
          {...register("Password", {
            required: true,
            maxLength: 20,
          })}
        />

        {errors.Password && (
          <p className={Style.redError}>
            {" "}
            {errors.Password.type == "required" && "Password is Required"}{" "}
            {errors.Password.type == "maxLength" && "Exceeding limit"}{" "}
          </p>
        )}

        <div className={Style.captchaContainer}>
          <Captcha
            onChange={onChange}
            placeholder="Enter captcha"
            onRefresh={() => {}}
          />
        </div>

        <p className={Style.redError}> {errorMsg} </p>
        {errors.Captcha && (
          <p className={Style.redError}>
            {errors.Captcha.type == "required" && "Captcha is Required"}{" "}
          </p>
        )}

        <div className="d-flex justify-content-center align-item center mt-2">
          <Button type="submit" variant="primary">
            Sign In
          </Button>
        </div>
        {/* <div className="d-flex justify-content-center align-item center mt-2">
          <Button
            type="submit"
            variant="danger"
            onClick={() =>
              signIn("github", {
                callbackUrl: "http://localhost:3000/dashboard",
              })
            }
          >
            Github Sign in
          </Button>
        </div> */}
      </form>
    </div>
  );
}

Signin.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });
  const providers = await getProviders(context);
  const csrfToken = await getCsrfToken(context);

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }

  return {
    session: undefined,
    providers: providers,
    csrfToken: csrfToken,
  };
};
