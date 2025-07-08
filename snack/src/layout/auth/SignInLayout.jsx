import React from 'react'
import SignInHeader from '../../components/auth/signIn/SignInHeader'
import SignInFooter from '../../components/auth/signIn/SignInFooter'
import SignInIndexPage from '../../pages/auth/SignInIndexPage'

const SignInLayout = () => {
  return (
    <>
      <SignInHeader/>
        <SignInIndexPage/>
      <SignInFooter/>
    </>
  )
}

export default SignInLayout