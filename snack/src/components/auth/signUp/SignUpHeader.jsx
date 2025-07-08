import React from 'react'
import { Link } from 'react-router-dom'

const SignUpHeader = () => {
  return (
    <div className="signUp-header">
    <div className="signUp-header-con">
      <h1 className="logo">
        <Link to={'/'}><img src={'/images/common/main_logo.png'} alt="logo" /></Link>
      </h1>
      <div className="signUpbtn">
        <Link to={'/signIn'}>로그인</Link>
      </div>
    </div>
  </div>
  )
}

export default SignUpHeader