import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom/dist'
import SignInIndex from '../../components/auth/signIn/SignInIndex'

const SignInIndexPage = () => {
  const navigate = useNavigate()
  const isSignIn = useSelector(state => state.auth.isSignIn)
  useEffect(() => {
    if (isSignIn) {
      alert('로그아웃 후 사용하실 수 있습니다.')
      navigate(-1)
    }
  },[])


  return (
    <SignInIndex/>
  )
}

export default SignInIndexPage