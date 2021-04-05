import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import arrow from '../img/arrow2.svg'
import search from '../img/search.svg'
import xSign from '../img/xSign.svg'

const Search = () => {
  const [toggle, setToggle] = useState(false)
  const [toggleValue, setToggleValue] = useState('All')
  const [inputValue, setInputValue] = useState('')
  const [activeDelete, setActiveDelete] = useState(false)

  useEffect(() => {
    if (inputValue === '' && activeDelete === true) {
      setActiveDelete(false)
    } else if (inputValue !== '' && activeDelete === false) {
      setActiveDelete(true)
    }
  }, [inputValue, activeDelete])

  const formSubmitHandler = (e) => {
    e.preventDefault()
  }
  document.body.addEventListener('click', (e) => {
    if (
      !e.target.classList.contains('dropDown-select-category') &&
      !e.target.classList.contains('dropDown') &&
      toggle
    ) {
      setToggle(false)
    }
  })

  return (
    <StyledSearch className='searchForm' onSubmit={formSubmitHandler}>
      <div className='dropDown' onClick={() => setToggle(!toggle)}>
        <p>{toggleValue}</p>
        <img src={arrow} alt='arrow' />
      </div>

      <div className='inputDiv'>
        <label id='searchLabel' htmlFor='search'>
          Search
        </label>
        <input
          autoComplete='off'
          onFocus={() => setToggle(false)}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type='text'
          id='search'
        />
        <img
          onClick={() => setInputValue('')}
          style={{ display: `${activeDelete ? 'block' : 'none'}` }}
          className='xSign'
          src={xSign}
          alt='X icon'
        />
      </div>
      <button type='submit' className='submit'>
        <img src={search} alt='search icon' />
      </button>
      <div
        className='dropDown-select-category'
        style={{ display: `${toggle ? 'block' : 'none'}` }}
      >
        <p className='selectParagraph'>Select</p>
        <p
          onClick={(e) => {
            setToggleValue(e.target.innerText)
          }}
          className={`${toggleValue === 'All' ? 'active' : ''}`}
        >
          All
        </p>
        <p
          onClick={(e) => {
            setToggleValue(e.target.innerText)
          }}
          className={`${toggleValue === 'Arts & Crafts' ? 'active' : ''}`}
        >
          Arts & Crafts
        </p>
        <p
          onClick={(e) => {
            setToggleValue(e.target.innerText)
          }}
          className={`${toggleValue === 'Automative' ? 'active' : ''}`}
        >
          Automative
        </p>
        <p
          onClick={(e) => {
            setToggleValue(e.target.innerText)
          }}
          className={`${toggleValue === 'Baby' ? 'active' : ''}`}
        >
          Baby
        </p>
        <p
          onClick={(e) => {
            setToggleValue(e.target.innerText)
          }}
          className={`${
            toggleValue === 'Beauty & Personal Care' ? 'active' : ''
          }`}
        >
          Beauty & Personal Care
        </p>
        <p
          onClick={(e) => {
            setToggleValue(e.target.innerText)
          }}
          className={`${toggleValue === 'Books' ? 'active' : ''}`}
        >
          Books
        </p>
        <p
          onClick={(e) => {
            setToggleValue(e.target.innerText)
          }}
          className={`${toggleValue === 'Computers' ? 'active' : ''}`}
        >
          Computers
        </p>
        <p
          onClick={(e) => {
            setToggleValue(e.target.innerText)
          }}
          className={`${toggleValue === 'Digital Music' ? 'active' : ''}`}
        >
          Digital Music
        </p>
        <p
          onClick={(e) => {
            setToggleValue(e.target.innerText)
          }}
          className={`${toggleValue === 'Electronics' ? 'active' : ''}`}
        >
          Electronics
        </p>
      </div>
    </StyledSearch>
  )
}
const StyledSearch = styled.form`
  #searchLabel {
    position: absolute;
    left: 0;
    top: 0;
  }
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
    padding: 0 0.8rem;
    border-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    cursor: pointer;

    img {
      pointer-events: none;
      width: 10px;
      margin-top: 0.15rem;
    }
    p {
      font-size: calc(0.54rem + 0.5vw);
      white-space: nowrap;
      padding-right: 0.2rem;
      pointer-events: none;
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
  .dropDown-select-category {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translate(0, 99%);
    background: #ffffff;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
    border: 1px solid rgba(52, 58, 64, 0.16);
    height: 40vh;
    max-height: 300px;
    min-height: 130px;
    overflow-y: auto;
    scrollbar-width: thin;
    border-radius: 5px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    padding-top: 0.2rem;
    .selectParagraph {
      color: #ccccd8;
      font-size: 1.1rem;
      border-bottom: 2px solid rgba(204, 204, 216, 0.2);
      cursor: default !important;
      pointer-events: none;
    }
    p {
      padding: 0.5rem calc(0.5rem + 0.5vw);
      cursor: pointer;
      color: #253858;
      border-radius: 4px;
      margin: 0.2rem 0.2rem;
      &:last-child {
        margin-bottom: 0.2rem;
      }
      &:hover {
        background: rgba(222, 235, 255, 0.5);
      }
      &.active {
        color: #ffffff;
        background: #00b2d8;
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
