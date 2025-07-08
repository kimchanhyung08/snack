import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { replaceUserFn, signOutFn } from '../../../../slice/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import CommonModal from '../../../anime/CommonModal'
import AlertModal from '../../AlertModal'
import { localhost } from '../../../../api/CommonAPI'



const updateData = {
  // id: ''
  userName: '',
  userEmail: '',
  userPw: '',
  phoneNumber: '',
  role: 'ROLE_MEMBER'
}



const MemberUpdate = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const signInUser = useSelector(state => state.auth.signInUser)

  const [roleUpdate, setRoleUpdate] = useState("")
 
  
  // 업데이트 관련 state
  const [update, setUpdate] = useState(updateData)
  
  
  //  state 에 회원정보 담기
  useEffect(() => {
    setUpdate(signInUser[0])

    setRoleUpdate(signInUser[0].role)
    
    // setUpdate({
    //   ...update,
    //   ['id']: signInUser[0].id,
    //   ['role']: signInUser[0].role
    // })
  },[])
  
    

  console.log(update)
  
  console.log(roleUpdate)

  
  // 정보 입력시 state에 세팅해주는 함수
  const onUpdateChangeFn = (e) => {
    const name = e.target.name
    const value = e.target.value
    
    setUpdate({
      ...update,
      [name]: value
    })
    
    console.log(name, value)
  }
  
  const onRoleChangeFn = (e) => {
    
    if (e.target.checked) {
      setUpdate({
        ...update,
        ['role']: "ROLE_ADMIN"
      })
    } else {
      setUpdate({
        ...update,
        ['role']: "ROLE_MEMBER"
      })
    }
  }
  
  const onRoleChangeFn2 = (e) => {
    
    if (e.target.checked) {
      setUpdate({
        ...update,
        ['role']: "ROLE_MEMBER"
      })
    } else {
      setUpdate({
        ...update,
        ['role']: "ROLE_ADMIN"
      })
    }
  }
  
  // 삭제 기능은 모달창에 삽입했다.
  // const deleteUserFn = () => {
  //   alert('회원정보를 삭제합니다.')
  //   dispatch(signOutFn())
  //   const authAxiosFn = async () => {
  //     const deleteData = await axios.delete(`http://${localhost}:3001/members/${signInUser[0].id}`)
  //   }
  //   authAxiosFn()

  //   navigate('/')
  // }
  

  // 수정 버튼 클릭시 작동하는 함수
  const upDateUserFn = (e) => {
    
    // 입력하지 않은 부분 없는지 검사 
    let escapeReturn = false

    Object.values(update).forEach((el, idx) => {

      if (el === null || el === "") {
        escapeReturn = true
        handlerFn2('failInput')
      } 
    
    })
    if (escapeReturn) {
      // alert('정보를 입력해주세요')
      return
    }
    // ---------------------------


    // 변경사항이 없을 경우
    
    if (Object.values(update).every(el => Object.values(signInUser[0]).includes(el))) {
      escapeReturn = true
      handlerFn2("updatePlease")
    } 
    if (escapeReturn) {
      // alert('정보를 입력해주세요')
      return
    }

    // ------------------

    // handlerFn2("updatePlease") // 변경내용 전부 같을 떄
    
    // 회원정보 업데이트(수정)
    dispatch(replaceUserFn(update))
    
    // db 회원정보 수정
    const authAxiosFn = async () => {
      const updateData = await axios.patch(`http://${localhost}:3001/members/${signInUser[0].id}`, update)
    }
    authAxiosFn()
    
    
    // alert('회원정보를 수정했습니다.')
    handlerFn2('successUpdate')
  }

  

  // 공용 모달 세팅

  // 공용 모달창 on/off state 
  const [isCommonModal, setIsCommonModal] = useState(false)
  // alert 모달창 on/off state 
  const [isAlertModal, setIsAlertModal] = useState(false)

  // 공용 모달창 내용 state
  const [contents, setContents] = useState("")
  //
  // 공용 모달창 전용 함수
  //
  // 1. 내용 2. 모달창 on
  const handlerFn = (contents) => {
    
    setContents(contents)
    setIsCommonModal(true)
  }

  const handlerFn2 = (contents) => {
  
    setContents(contents)
    setIsAlertModal(true)
  }
  
  // ---------------
  
  console.log(contents)

  return (
    <>
      {isCommonModal && <CommonModal contents={contents} setIsCommonModal={setIsCommonModal} />}
      {isAlertModal && <AlertModal contents={contents} setIsAlertModal={setIsAlertModal} />}
      <div className="member-update">
        <div className="member-update-con">
          <div className="member-update-form">
            <ul>
              <h1>회원정보수정</h1>
              {/* <li>id: <input onChange={onUpdateChangeFn} type="text" name="id" id="id" placeholder='아이디' value={update.id}/></li> */}
              <li><input onChange={onUpdateChangeFn} type="text" name="userName" id="userName" placeholder='이름' value={update.userName}/></li>
              <li><input onChange={onUpdateChangeFn} type="text" name="userEmail" id="userEmail" placeholder='이메일' value={update.userEmail}/></li>
              <li><input onChange={onUpdateChangeFn} type="text" name="userPw" id="userPw" placeholder='비밀번호' value={update.userPw}/></li>           
              <li><input onChange={onUpdateChangeFn} type="text" name="phoneNumber" id="phoneNumber" placeholder='전화번호' value={update.phoneNumber}/></li>           
              <li><input onChange={onUpdateChangeFn} type="text" name="address" id="address" placeholder='주소' value={update.address}/></li>




              {/* <div className="check-tag">
              <input onChange={onRoleChangeFn2} type="radio" name="role" id="role1"/><label htmlFor='role1'>일반회원</label> <br />
              <input onChange={onRoleChangeFn} type="radio" name="role" id="role2"/><label htmlFor='role2'>관리자</label>  

              {roleUpdate === "ROLE_ADMIN" ?
              <li><input onChange={onRoleChangeFn2} type="checkbox" name="role" id="role"/><label htmlFor='role'>관리자 권한해제 </label></li>           
              :
              <li><input onChange={onRoleChangeFn} type="checkbox" name="role" id="role"/><label htmlFor='role'>관리자 권한 </label></li>           
              } 
              </div>   */}


              <li><button onClick={upDateUserFn}>수정하기</button></li>
            </ul>
            <button onClick={() => {
              handlerFn("deleteUser")
            }}>회원 탈퇴</button>
            {/* <button onClick={deleteUserFn}>회원 탈퇴</button> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default MemberUpdate