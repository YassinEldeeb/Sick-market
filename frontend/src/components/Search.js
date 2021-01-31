import React, { useEffect, useState } from "react"
import styled from "styled-components"
import arrow from "../img/arrow2.svg"
import search from "../img/search.svg"
import xSign from "../img/xSign.svg"

const Search = () => {
  const [toggle, setToggle] = useState(false)
  const [toggleValue, setToggleValue] = useState("All")
  const [inputValue, setInputValue] = useState("")
  const [activeDelete, setActiveDelete] = useState(false)

  useEffect(() => {
    if (inputValue === "" && activeDelete === true) {
      setActiveDelete(false)
      console.log("set to false")
    } else if (inputValue !== "" && activeDelete === false) {
      setActiveDelete(true)
      console.log("set to true")
    }
  }, [inputValue, activeDelete])

  const formSubmitHandler = (e) => {
    e.preventDefault()
  }
  return (
    <StyledSearch className='searchForm' onSubmit={formSubmitHandler}>
      <div className='dropDown' onClick={() => setToggle(!toggle)}>
        <p>{toggleValue}</p>
        <img src={arrow} alt='arrow' />
      </div>
      <div className='inputDiv'>
        <input
          onFocus={() => setToggle(false)}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type='text'
        />
        <img
          onClick={() => setInputValue("")}
          style={{ display: `${activeDelete ? "block" : "none"}` }}
          className='xSign'
          src={xSign}
          alt='X icon'
        />
      </div>
      <button type='submit' className='submit'>
        <img src={search} alt='search icon' />
      </button>
      <div
        className='dropDownMenu'
        style={{ display: `${toggle ? "block" : "none"}` }}
      >
        <p
          onClick={(e) => {
            setToggleValue(e.target.innerText)
            setToggle(false)
          }}
        >
          All
        </p>
        <p
          onClick={(e) => {
            setToggleValue(e.target.innerText)
            setToggle(false)
          }}
        >
          Arts & Crafts
        </p>
        <p
          onClick={(e) => {
            setToggleValue(e.target.innerText)
            setToggle(false)
          }}
        >
          Automative
        </p>
        <p
          onClick={(e) => {
            setToggleValue(e.target.innerText)
            setToggle(false)
          }}
        >
          Baby
        </p>
        <p
          onClick={(e) => {
            setToggleValue(e.target.innerText)
            setToggle(false)
          }}
        >
          Beauty & Personal Care
        </p>
        <p
          onClick={(e) => {
            setToggleValue(e.target.innerText)
            setToggle(false)
          }}
        >
          Books
        </p>
        <p
          onClick={(e) => {
            setToggleValue(e.target.innerText)
            setToggle(false)
          }}
        >
          Computers
        </p>
        <p
          onClick={(e) => {
            setToggleValue(e.target.innerText)
            setToggle(false)
          }}
        >
          Digital Music
        </p>
        <p
          onClick={(e) => {
            setToggleValue(e.target.innerText)
            setToggle(false)
          }}
        >
          Electronics
        </p>
      </div>
    </StyledSearch>
  )
}
const StyledSearch = styled.form`
  display: flex;
  position: relative;
  flex: 1 1 0px;
  margin: 0 calc(1.5rem + 0.3vw);
  max-width: 65%;
  .submit {
    padding: calc(0.45rem + 0.25vw) calc(0.65em + 0.25vw);
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: none;
    background: #00b2d8;
    display: grid;
    place-items: center;
    cursor: pointer;
    &:hover {
      background: rgba(0, 176, 216, 0.95);
    }
    img {
      width: calc(0.8rem + 1vw);
    }
  }
  .dropDown {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    color: #1a1a1a;
    padding: calc(0.4rem + 0.25vw) calc(0.6rem + 0.25vw);
    border-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    cursor: pointer;
    &:hover {
      background: #ebebeb;
    }
    img {
      pointer-events: none;
    }
    p {
      padding-right: 0.3rem;
      font-size: calc(0.45rem + 0.5vw);
      white-space: nowrap;
    }
  }

  input {
    outline: none;
    border: none;
    padding: calc(0.4rem + 0.25vw);
    font-size: calc(0.2rem + 1vw);
    width: 100%;
    position: relative;
    padding-right: calc(1.9rem + 1vw);
  }
  .inputDiv {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: stretch;
    position: relative;
  }
  .xSign {
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(0.8rem + 1vw);
    cursor: pointer;
    padding: 0.2rem;
  }
  .dropDownMenu {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translate(0, 99%);
    background: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(52, 58, 64, 0.3);
    height: 40vh;
    max-height: 300px;
    min-height: 130px;
    overflow-y: scroll;
    scrollbar-width: thin;
    border-radius: 3px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding-top: 0.3rem;
    p {
      padding: 0.5rem calc(0.5rem + 0.5vw);
      cursor: pointer;
      color: #1a1a1a;
      &:last-child {
        margin-bottom: 0.3rem;
      }
      &:hover {
        background: #f5f5f5;
      }
    }
  }
  @media screen and (max-width: 1050px) {
    max-width: unset;
    input {
      font-size: calc(0.8rem + 1vw);
    }
  }
`
export default Search
