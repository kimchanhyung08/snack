import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertModal from '../AlertModal';
import { localhost } from '../../../api/CommonAPI';


const signUpData = {
  userName: "",
  userEmail: "",
  userPw: "",
  phoneNumber: "",
  address: "",
  role: "ROLE_MEMBER",
  recent: []
} 

const agreementData = {
  all: "",
  privacy: "",
  service: ""
}


const SignUpIndex = () => {
  
  const navigate = useNavigate();
 

  // 회원 db로 보낼 state
  const [signUp, setSignUp] = useState(signUpData)

  
  // 입력시 회원정보 state에 set (회원 개인정보)
  const onSignUpChangeFn = (e) => {
    const name = e.target.name
    const value = e.target.value
    
    setSignUp({
      ...signUp,
      [name]: value
    })
    
    console.log(name, value)
    console.log(signUp)

  }
  // 입력시 회원정보 state에 set (권한)
  const onRoleChangeFn = (e) => {
    
    if (e.target.checked) {
      setSignUp({
        ...signUp,
        ['role']: "ROLE_ADMIN"
      })
    } else {
      setSignUp({
        ...signUp,
        ['role']: "ROLE_MEMBER"
      })
    }
    
    console.log(signUp)
  }
  
  // 약관 동의 state
  const [agreement, setAgreement] = useState(agreementData)
  
  const onAgreementChangeFn = (e) => {
    const name = e.target.name
    const isCheck = e.target.checked 
    setAgreement({
      ...agreement,
      [name]: isCheck
    })
    console.log(name, isCheck)
  }

  // 약관 동의 전부 선택해주는 함수 
  const onAgreementAllChangeFn = (e) => {
    const isAllCheck = e.target.checked // 전체동의 체크박스 checked 값

    const ulTag = e.target.parentElement.parentElement.children // HTMLSellection(5) // li > input 태그 
    const ulTagArr = Array.from(ulTag) // array(5) // li > input 태그

    const agreementData = {} // setAgreement로 보낼 값 저장할 곳

    ulTagArr.forEach((el, idx) => {
      if (idx === ulTagArr.length) { //idx === ulTagArr.length - 1 // 관리자 까지 li 있을 경우 
        return
      }

      el.children[0].checked = isAllCheck // forEach 전부 전체동의 checked 값으로  

      agreementData[el.children[0].name] = isAllCheck // setAgreement로 보낼 값 넣기
    })

    setAgreement(agreementData)  
    
    console.log(agreement)
  }

  
  
  // 회원가입 // 회원정보 state값 db에 저장
  const onSignUpFn = (e) => {
    
    // 회원정보 미입력시 알림창
    let escapeReturn = false
    Object.values(signUp).forEach(el => {
      if (el === null || el === "") {
        escapeReturn = true
        // return
        handlerFn('failInput')
      }
    })
    if (escapeReturn) {
      // alert('정보를 입력해주세요') // 이중 탈출
      return
    }
    // 회원정보 미입력시 알림창
    
    
    // 약관동의 미입력시 알림창
    Object.values(agreement).forEach(el => {
      if (el === null || el === false || el === "") {
        escapeReturn = true
        // return
        handlerFn('failAgree')
      }
    })
    if (escapeReturn) {
      // alert('약관에 동의해주세요')
      return
    }
    // 약관동의 미입력시 알림창
    
    const SignUpAxiosFn = async () => {
      const res = await axios.get(`http://${localhost}:3001/members`)
      console.log(res.data)
      console.log(signUp, "회원정보")
      
      
      const num = res.data.findIndex(el => {
        return el.userEmail === signUp.userEmail
      })

      if (num !== -1) {
        // alert("중복 다시 입력")
        handlerFn('failUnique')
        return
      }

      const signUpSuccess = await axios.post(`http://${localhost}:3001/members`, signUp)
      // alert("가입 성공 ")
      handlerFn('successSignIn')
      // navigate('/signIn')

      console.log(num)

    
    }
    SignUpAxiosFn()
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


  return (
    <>
      {isAlertModal && <AlertModal contents={contents} setIsAlertModal={setIsAlertModal} />}
      <div className="signUp">
        <div className="signUp-con">
          <div className="signUp-form">
            <ul>
              <h1>회원가입</h1>
              <li>
                <input type="text" name="userName" id="userName" placeholder='이름' onChange={onSignUpChangeFn} value={signUp.userName}/>
              </li>
              <li>
                <input type="text" name="userEmail" id="userEmail" placeholder='이메일' onChange={onSignUpChangeFn} value={signUp.userEmail}/>
              </li>
              <li>
                <input type="password" name="userPw" id="userPw" placeholder='비밀번호' onChange={onSignUpChangeFn} value={signUp.userPw}/>
              </li>
              {/* 주문처 */}
              <li>
                <input type="text" name="address" id="address" placeholder='주소' onChange={onSignUpChangeFn} value={signUp.address}/>
              </li>
              <li>
                <input type="text" name="phoneNumber" id="phoneNumber" placeholder='전화번호(-없이 숫자만 입력)' onChange={onSignUpChangeFn} value={signUp.phoneNumber}/>
              </li>
              <ul className="check-tag">
                <li>
                  <input type="checkbox" name="all" id="all" onChange={onAgreementAllChangeFn}></input>
                  <label htmlFor="all">전체 약관에 동의합니다.</label>
                </li>
                <li>
                  <input type="checkbox" name="privacy" id="privacy" onChange={onAgreementChangeFn}></input>
                  <label htmlFor="privacy">개인정보 수집.</label>
                </li>
                <li>
                  <input type="checkbox" name="service" id="service" onChange={onAgreementChangeFn}></input>
                  <label htmlFor="service">서비스 이용 약관.</label>
                </li>
                {/* <li>
                  <input type="checkbox" name="role" id="role" onChange={onRoleChangeFn}></input>
                  <label htmlFor="role">관리자로 가입</label>
                </li> */}
              </ul>
              <li>
                <button onClick={onSignUpFn}>가입하기</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpIndex