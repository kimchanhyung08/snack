import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminMemberDetailModal from './AdminMemberDetailModal'
import AdminMemberDetailModal1 from './AdminMemberDetailModal1'
import { localhost } from '../../api/CommonAPI'

const AdminMemberDetail = () => {
    const param=useParams()
    const [memberModal, setMemberModal] = useState(false);
    const [memberModal1, setMemberModal1] = useState(false);

    const [member,setMember] = useState({})
    const navigate= useNavigate()
    const onMemberModalFn = () => {
        setMemberModal(true);
        
        }
        const onMemberModal1Fn = () => {
            setMemberModal1(true);
            
            }
    useEffect(()=>{
        const memberDetailFn = async () =>{
            // const productId = param.param.id
                try{
                    const res = await axios.get(`http://${localhost}:3001/members/${param.id}`)
                    console.log(res.data, 'data')
                     setMember(res.data)                
                }catch (err) {
                    alert(err)
                  }
            }
            memberDetailFn()
    },[])

    const DeleteFn = async () => {
        // if (window.confirm("삭제 하시겠습니까??")) {
        //     axios.delete(`http://${localhost}:3001/members/${param.id}`); 
        //     // setProduct(product.filter((product) => product.id !== id)); 
        //     navigate(-1)
        //     alert("삭제되었습니다.");
        // } else {

        //     alert("취소합니다.");
        // }
      };
  return (
    <>
    {memberModal && (
        <AdminMemberDetailModal  setMemberModal={setMemberModal} />
    )}
    {memberModal1 && (
        <AdminMemberDetailModal1  setMemberModal1={setMemberModal1} />
    )}
    <div className="member-detail">
        <div className="member-detail-con">  
            <ul>

                <li>
                <img src="/images/icon/free-icon-user-159833.png" alt="" width = '300px'   height = '300px'/>
                </li>    
                <li>
                  <h1>이름: {member.userName}</h1>
                </li>
                <li>
                    이메일: {member.userEmail}
                </li>
                <li>
                    비밀번호: {member.userPw}
                </li>
                <li>
                    전화번호: {member.phoneNumber}
                </li>
                <li>
                    회원등급: {member.role}
                </li>
                
                <div className="member-button">

                <li><button onClick={onMemberModalFn}>수정하기</button></li>
                <li>
                    <button onClick={onMemberModal1Fn}>삭제하기</button></li>
               </div>
            </ul>

                </div>
           
    </div>
    </>
  )
}

export default AdminMemberDetail