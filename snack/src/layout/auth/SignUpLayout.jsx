import React from 'react'
import SignUpHeader from '../../components/auth/signUp/SignUpHeader'
import SignUpFooter from '../../components/auth/signUp/SignUpFooter'
import SignUpIndex from '../../components/auth/signUp/SignUpIndex'


const SignUpLayout = () => {
  return (
  <>
    <SignUpHeader/>
      <SignUpIndex/>
    <SignUpFooter/>
  </>
  )
}

export default SignUpLayout