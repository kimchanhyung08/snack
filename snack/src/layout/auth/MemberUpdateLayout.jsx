import React from 'react'
import MemberUpdatePage from '../../pages/auth/MemberUpdatePage'
import MemberUpdateFooter from '../../components/auth/member/update/MemberUpdateFooter'
import MemberUpdateHeader from '../../components/auth/member/update/MemberUpdateHeader'

const MemberUpdateLayout = () => {
  return (
    <>
      <MemberUpdateHeader/>
        <MemberUpdatePage/>
      <MemberUpdateFooter/>
    </>
  )
}

export default MemberUpdateLayout