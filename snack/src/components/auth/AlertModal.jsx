import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AlertModal = ({contents, setIsAlertModal}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const signInUser = useSelector(state => state.auth.signInUser)
  
  const closeFn = () => {
    setIsAlertModal(false)
  }

  console.log("모달은 실행됩니다.")

  return (
    <div className="alert-modal">
      <div className="alert-modal-con">
        <div className="alert-modal-top">
          {contents === 'failInput' && <span>정보를 입력해주세요</span>}
          {contents === 'failSignIn' && <span>로그인 실패 다시 입력해 주세요</span>}
          {contents === 'failAgree' && <span>약관에 동의 해주세요</span>}
          {contents === 'failUnique' && <span>이메일 또는 비밀번호가 중복됩니다</span>}
          {contents === 'successSignIn' && <span>회원가입이 되었습니다.</span>}
          {contents === 'successUpdate' && <span>회원정보를 수정했습니다.</span>}
          {contents === 'updatePlease' && <span>수정할 내용이 없습니다.</span>}
          {contents === 'logOut' && <span>로그아웃 되었습니다.</span>}
        </div>
        <div className="alert-modal-bottom">
          <div className="check">
            <button onClick={() => {
              closeFn()
             
              if (contents === 'successSignIn') {
                navigate('/signIn')
              }
            }}>확인</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlertModal