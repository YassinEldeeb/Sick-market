import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { parseISO, format } from "date-fns"
import gear from "../img/gear.svg"
import ReactTooltip from "react-tooltip"
import { motion } from "framer-motion"
import { popup } from "../animations"
import { Link, useLocation } from "react-router-dom"
import reactStringReplace from "react-string-replace"
import Loader from "../components/loader"
import { useSelector } from "react-redux"

const UserDashboard = ({ user }) => {
  const location = useLocation()
  const [equal] = useState(
    location.search.split("=")[1] ? location.search.split("=")[1] : false
  )

  const imgSrcCondition = () => {
    if (user.profilePicLink && user.profilePicLink !== "cleared") {
      return user.profilePicLink
    } else {
      return `/api/users/profilePic/${user._id}`
    }
  }

  const nameValue = equal
    ? reactStringReplace(user.name, equal, (match) => (
        <span className='highlightSearch'>{match}</span>
      ))
    : user.name
  const emailValue = equal
    ? reactStringReplace(user.email, equal, (match) => (
        <span className='highlightSearch'>{match}</span>
      ))
    : user.email
  const { loading: actionLoading } = useSelector((state) => state.userActions)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if (!actionLoading) {
      setClicked(false)
    }
  }, [actionLoading])

  return (
    <StyledUser variants={popup}>
      <ReactTooltip effect='solid' delayHide={100} delayShow={200} />
      <div className='id'>
        <p data-tip={"#" + user._id}>#{user._id.substr(user._id.length - 4)}</p>
      </div>
      <div className='name'>
        <img className='pic' src={imgSrcCondition()} alt='' />
        <p data-tip={user.name}>{nameValue}</p>
      </div>
      <div className='email'>
        <p data-tip={user.email}>{emailValue}</p>
      </div>
      <div className='joinedIn'>
        <p data-tip={format(parseISO(user.joinedIn), "yyyy-MM-dd")}>
          {format(parseISO(user.joinedIn), "yyyy-MM-dd")}
        </p>
      </div>
      <div className='gearCont'>
        <Link
          to={`/dashboard/customers/${user._id}`}
          onClick={() => setClicked(true)}
          className='gear'
        >
          {actionLoading && clicked ? (
            <Loader />
          ) : (
            <img className='gearImg' src={gear} alt='' />
          )}
        </Link>
      </div>
    </StyledUser>
  )
}
const StyledUser = styled(motion.div)`
  .providedLoader {
    #greybackground path {
      stroke: white !important;
    }
  }
  #loader {
    width: 24px;
    height: 24px;
  }
  .highlightSearch {
    background: #232647a1;
  }
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
  &:last-child {
    margin-bottom: 1.5rem;
  }
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
    position: relative;

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
