import React from "react"
import styled from "styled-components"
import { parseISO, format } from "date-fns"
import gear from "../img/gear.svg"
import ReactTooltip from "react-tooltip"
import { motion } from "framer-motion"
import { popup } from "../animations"

const UserDashboard = ({ user }) => {
  const imgSrcCondition = () => {
    if (user.profilePicLink && user.profilePicLink !== "cleared") {
      return user.profilePicLink
    } else {
      return `/api/users/profilePic/${user._id}`
    }
  }

  return (
    <StyledUser variants={popup}>
      <ReactTooltip effect='solid' delayHide='100' delayShow='200' />
      <div className='id'>
        <p data-tip={"#" + user._id}>#{user._id.substr(user._id.length - 4)}</p>
      </div>
      <div className='name'>
        <img className='pic' src={imgSrcCondition()} alt='' />
        <p data-tip={user.name}>{user.name}</p>
      </div>
      <div className='email'>
        <p data-tip={user.email}>{user.email}</p>
      </div>
      <div className='joinedIn'>
        <p data-tip={format(parseISO(user.joinedIn), "yyyy-MM-dd")}>
          {format(parseISO(user.joinedIn), "yyyy-MM-dd")}
        </p>
      </div>
      <div className='gearCont'>
        <div className='gear'>
          <img className='gearImg' src={gear} alt='' />
        </div>
      </div>
    </StyledUser>
  )
}
const StyledUser = styled(motion.div)`
  .__react_component_tooltip {
    background: #1e203e;
    border-radius: 5px;
    &::after {
      border-top-color: #1e203e !important;
    }
  }
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #373864;
  padding: 0.65rem 2.1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  overflow-x: auto;
  width: 100%;
  .name {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-width: 23%;
    p {
      color: white !important;
      margin-left: 0.7rem;
    }
  }
  .gearCont {
    min-width: 6%;
    display: flex;
    justify-content: flex-start;
  }
  .gear {
    padding: 0.65rem;
    border-radius: 10px;
    background: rgba(254, 254, 254, 0.1);
    cursor: pointer;
    transition: 0.2s ease;
    &:hover {
      background: rgba(254, 254, 254, 0.07);
    }
  }
  .id,
  .email,
  .joinedIn,
  .name,
  .gear {
    padding-right: 3vw;
    display: flex;
  }
  .gear {
    padding-right: 0.65rem !important;
  }
  .gearImg {
    width: 24px;
    height: 24px;
  }
  .id,
  .email,
  .joinedIn,
  .name {
    p {
      color: white !important;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .id {
    min-width: 12%;
  }
  .email {
    min-width: 39%;
  }
  .joinedIn {
    min-width: 20%;
  }
  .gear {
    margin-right: 0;
  }
  .name {
    p {
      width: max-content;
    }
  }
  .email {
    p {
      width: max-content;
    }
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`

export default UserDashboard
