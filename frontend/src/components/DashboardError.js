import React, { useEffect } from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"

const DashboardError = ({ error }) => {
  const userInfo = useSelector((state) => state.userInfo)
  const history = useHistory()

  useEffect(() => {
    if (error === "Not an Admin!") {
      userInfo.user.rank = "user"
      localStorage.setItem("sickUserInfo", JSON.stringify(userInfo))
      history.push("/")
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
  p.error {
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9) !important;
  }
`

export default DashboardError
