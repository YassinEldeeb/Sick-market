import React, { FC, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

interface Props {
  error: string
}

const DashboardError: FC<Props> = ({ error }) => {
  const userInfo = useSelector((state: any) => state.userInfo)
  const history = useHistory()

  useEffect(() => {
    if (error === 'Not an Admin!') {
      userInfo.user.rank = 'user'
      localStorage.setItem('sickUserInfo', JSON.stringify(userInfo))
      history.push('/')
    }
  }, [error])
  return (
    <StyledDashboard>
      <p className='error'>{error}</p>
    </StyledDashboard>
  )
}

const StyledDashboard = styled.div`
  padding: 1rem;
  background: rgba(250, 111, 98, 0.4);
  border-radius: 12px;
  border-bottom-left-radius: 0;
  width: max-content;
  max-width: 60%;
  margin-bottom: 0.5rem;
  p.error {
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9) !important;
  }
`

export default DashboardError
