import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom/dist'
import { signInUserFn } from '../../../slice/authSlice'

import AlertModal from '../AlertModal'
import { localhost } from '../../../api/CommonAPI'
import { updateIdFn } from '../../../slice/userSlice'

const signInData = {
  userEmail: '',
  userPw: ''
}


const SignInIndex = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [signIn, setSetSignIn] = useState(signInData)
  const signInUser = useSelector(state => state.auth.signInUser)

 


  const onSignInChangeFn = (e) => {
    const name = e.target.name
    const value = e.target.value

    setSetSignIn({
      ...signIn,
      [name]: value

    })
    console.log(name, value)
  }

  const onSignInFn = () => {


    // 미입력시 알림창
    let escapeReturn = false
    
    Object.values(signIn).forEach(el => {
      if (el === null || el === "") {
        escapeReturn = true
        handlerFn('failInput') // 정보를 입력해주세요
      }
    })
    if (escapeReturn) {
      return
    }
    // 미입력시 알림창

    const SignInAxiosFn = async () => {
      const res = await axios.get(`http://${localhost}:3001/members`)
      const num = res.data.findIndex(el => {
        return el.userEmail === signIn.userEmail && el.userPw === signIn.userPw
      })
      const userDataGet = res.data[num]

      if (num !== -1) {
        
        
        dispatch(signInUserFn(userDataGet))
        dispatch(updateIdFn(userDataGet.id))
        navigate('/')
  
      } else {

        handlerFn('failSignIn')

        return
      }
    }
    SignInAxiosFn()
  }

  ////// 공용 모달 코드
  //
  // 공용 모달창 on/off state 
  const [isAlertModal, setIsAlertModal] = useState(false)
  // 공용 모달창 내용 state
  const [contents, setContents] = useState("")
  //
  // 공용 모달창 전용 함수
  //
  // 1. 내용 2. 모달창 on
  const handlerFn = (contents) => {
   
    setContents(contents)
    setIsAlertModal(true)
  }
  //////


  // 엔터 시 로그인 ()
  const activeEnter = (e) => {
    if (e.key === "Enter") {
      onSignInFn();
    }
  };

  return (
    <>
      {isAlertModal && <AlertModal contents={contents} setIsAlertModal={setIsAlertModal} />}
      <div className="signIn">
        <div className="signIn-con">
          <div className="signIn-form">
            <ul>
              <h1>로그인</h1>
              <li className='main-list'>
                  <input onChange={onSignInChangeFn} type="text" name="userEmail" id="userEmail" placeholder='이메일' value={signIn.userEmail} onKeyDown={(e) => activeEnter(e)}/>
              </li>
              <li className='main-list'>
                  <input onChange={onSignInChangeFn} type="password" name="userPw" id="userPw" placeholder='비밀번호' value={signIn.userPw} onKeyDown={(e) => activeEnter(e)}/>
              </li>
              <li>
                <button onClick={onSignInFn}>로그인</button>
              </li>
              <li onClick={() => {
                navigate('/signUp')
              }}>
                회원이 아니신가요? <br/>
                지금 회원가입하세요
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignInIndex