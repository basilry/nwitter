import { faGithub, faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthForm from "components/AuthForm";
import { authService, firebaseInstane } from "fBase";
import React, { useState } from "react";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target:{name}
    } = event;
    let provider;
    if(name === "google") {
      provider = new firebaseInstane.auth.GoogleAuthProvider();
    } else if(name === "github") {
      provider = new firebaseInstane.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
  }

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  )
}
export default Auth;