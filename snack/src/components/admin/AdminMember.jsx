import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { localhost } from '../../api/CommonAPI'

const AdminMember = () => {
    const[memberList,setMemberList]=useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        const axiosFn=async()=>{
          try{
            const res = await axios.get(`http://${localhost}:3001/members`)
          setMemberList(res.data)
        }catch(err){
          alert(err)
        }
      }
      axiosFn()
    },[])
    
    const memberDetailFn = (elId) => {
               
        navigate(`/admin/adminmember/detail/${elId}`)
        
      }

  return (
    <>
    <div className="admin-member">
      <div className="admin-member-con">
        <h1>사용자 정보 목록</h1>
        <div className="admember">
          <div className="title">
            <span>번호</span>
            <span>이름</span>
            <span>이메일</span>
            <span>비밀번호</span>
            <span>전화번호</span>
            <span>회원등급</span>
            <span>정보 수정</span>          
          </div>
          <div className="admin-member-list">
          <ul>
            {memberList && memberList.map((el, idx) => {   
                  // if(el.type === type.type) {
                          return (
                            <li key={idx} >
                              <span>{el.id}</span>
                              <span>{el.userName}</span>
                              <span><div className="eicon"></div>{el.userEmail}</span>

                              <span> <div className="pwicon"></div>{el.userPw}</span>                  
                              <span>{el.phoneNumber}</span>
                              <span>{el.role}</span>
                              <span onClick={()=>{
                                memberDetailFn(el.id)
                              }} >정보 수정</span>
                            </li>
                          )
})}
          </ul>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default AdminMember