
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AdminMemberDetailModal2 from './AdminMemberDetailModal2';
import { localhost } from '../../api/CommonAPI';
const memberData={
    id:"",
    userName:"",
    userPw:"",
    userEmail:"",
    role:"",
    phoneNumber:""
    }
const AdminMemberDetailModal = ({setMemberModal}) => {
    const [update,setUpdate]=useState(memberData)
    const [memberModal2, setMemberModal2] = useState(false);
    const onMemberModal2Fn = () => {
        setMemberModal2(true);
       
        }
    const param = useParams()
    const navigate=useNavigate()

    const onUpdateChangeFn= (e) =>{
        const name=e.target.name
        const value=e.target.value

        setUpdate({
            ...update,
            [name]:value
        })
    }
    const closeFn =() =>{
        setMemberModal(false)
    }
   
      useEffect(()=>{
        const memberDetailFn = async () =>{
            // const productId = param.param.id
                try{
                    const res = await axios.get(`http://${localhost}:3001/members/${param.id}`)
                    console.log(res.data, 'data')
                     setUpdate(res.data)                
                }catch (err) {
                    alert(err)
                  }
            }
            memberDetailFn()
    },[])
  return (
    <> 
    {memberModal2 && (
        <AdminMemberDetailModal2 update={update} setMemberModal2={setMemberModal2} />
    )}
     <div className="update-member">
    <div className="update-member-con">
    <span className='close' onClick={closeFn}>X</span>
      <h1>회원정보 수정</h1>
      <ul>
        <li>
          <input type="text" name="userName" id="userName" placeholder='이름'
             value={update.userName}
             onChange={onUpdateChangeFn}/>
        </li>
        <li>
          <input type="text" name="userEmail" id="userEmail"  placeholder='이메일'
            value={update.userEmail}
            onChange={onUpdateChangeFn}/>
        </li>
        <li>
          <input type="text" name="userPw" id="userPw" placeholder='비밀번호'
             value={update.userPw}
             onChange={onUpdateChangeFn}/>
        </li>
        <li>
          <input type="text" name="phoneNumber" id="phoneNumber" placeholder='전화번호'
             value={update.phoneNumber}
             onChange={onUpdateChangeFn}/>
        </li>
        <li>
          <select name="role" id="role"value={update.role}
             onChange={onUpdateChangeFn}>
            <option value='ROLE_MEMBER'>일반회원</option>
            <option value="ROLE_ADMIN">어드민</option>       
          </select>
        </li>
        <li>
          <button  onClick={onMemberModal2Fn} >수정하기</button>        
        </li>
      </ul>
    </div>
  </div>
    
    
    
    
    </>
  )
}

export default AdminMemberDetailModal