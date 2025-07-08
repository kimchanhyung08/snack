import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signOutFn } from '../../slice/authSlice'
import { localhost } from '../../api/CommonAPI'


const CommonModal = ({contents, setIsCommonModal}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const signInUser = useSelector(state => state.auth.signInUser)
  
  const closeFn = () => {
    setIsCommonModal(false)
  }


  const deleteUserFn = () => {
    // alert('회원정보를 삭제합니다.')
    dispatch(signOutFn())
    const authAxiosFn = async () => {
      const deleteData = await axios.delete(`http://${localhost}:3001/members/${signInUser[0].id}`)
    }
    authAxiosFn()

    dispatch(signOutFn())
    navigate('/')
  }


  return (
    <div className="common-modal">
      <div className="common-modal-con">
        

        {contents === "addCart" &&
        <>
          <span className='close' onClick={closeFn}>×</span>
          <div className="common-modal-top">
            <h3>{'장바구니에 추가 되었습니다.'}</h3>
          </div>
          <div className="common-modal-bottom">
            <span onClick={closeFn}>뒤로 가기</span>
            <span onClick={() => {
              navigate('/cart')
            }}>장바구니로 이동</span>
          </div>  
        </>
        }
        {contents === "deleteUser" &&
        <>
          <span className='close' onClick={closeFn}>x</span>
          <div className="common-modal-top">
            <h3>{'회원정보를 삭제하시겠습니까?'}</h3>
          </div>
          <div className="common-modal-bottom">
            <span onClick={closeFn}>아니오</span>
            <span onClick={deleteUserFn}>삭제</span>
          </div>  
        </>
        }
       
       

      </div>
    </div>
  )
}

export default CommonModal