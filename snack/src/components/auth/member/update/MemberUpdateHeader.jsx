import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const MemberUpdateHeader = () => {

  const navigate = useNavigate()

  return (
    <div className="member-update-header">
      <div className="member-update-header-con">
        <h1 className="logo">
          <Link onClick={(e) => {
            e.preventDefault()
            navigate(-1)
          }}><img src={'/images/common/main_logo.png'} alt="logo" /></Link>
        </h1>
        <div className="member-update-header-btn">
          <Link onClick={(e) => {
            e.preventDefault()
            navigate(-1)
          }}>뒤로가기</Link>
        </div>
      </div>
    </div>
  )
}

export default MemberUpdateHeader