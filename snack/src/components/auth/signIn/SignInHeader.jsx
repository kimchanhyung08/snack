import React from 'react'
import { Link } from 'react-router-dom'

const SignInHeader = () => {
  return (
    <div className="signIn-header">
      <div className="signIn-header-con">
        <h1 className="logo">
          <Link to={'/'}><img src={'/images/common/main_logo.png'} alt="logo" /></Link>
        </h1>
        <div className="signInbtn">
            <Link to={'/signUp'}>회원가입</Link>
        </div>
      </div>
    </div>
  
  )
}

export default SignInHeader