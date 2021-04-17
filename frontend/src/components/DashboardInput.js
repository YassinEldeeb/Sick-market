import React from 'react'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import ReactTooltip from 'react-tooltip'

const Input = ({
  value,
  setValue,
  label,
  type = 'text',
  input = true,
  required = true,
}) => {
  const randomId = uuid()
  return (
    <StyledInput>
      <ReactTooltip
        delayHide={100}
        delayShow={400}
        effect='solid'
        id='required'
      />
      {label && (
        <label htmlFor={`dashboardInput${randomId}`}>
          {label}{' '}
          {required && (
            <span data-for='required' data-tip='Required' class='required'>
              *
            </span>
          )}{' '}
        </label>
      )}
      {input ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={type}
          id={`dashboardInput${randomId}`}
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={type}
          maxLength={222}
          id={`dashboardInput${randomId}`}
        />
      )}
    </StyledInput>
  )
}

const StyledInput = styled.div`
  .__react_component_tooltip {
    background: #1e203e;
    border-radius: 5px;
    padding: 7px 16px !important;
    &::after {
      border-top-color: #1e203e !important;
    }
  }
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  label {
    font-size: calc(1rem + 0.3vw);
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.25rem;
    position: relative;
    .required {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 16px;
      transform: translate(110%, 10%);
    }
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
  textarea {
    min-height: calc(25px + 2vh);
    width: calc(330px + 5vw);
    height: calc(100px + 5vh);
    resize: vertical;
  }
  textarea,
  input {
    padding: 0.7rem 1.2rem;
    font-size: calc(0.9rem + 0.3vw);
    color: rgba(255, 255, 255, 0.9);
    background: rgba(77, 79, 142, 63%);
    border: none;
    border-radius: 10px;
    transition: background 0.2s ease;
    width: 28vw;
    max-width: 600px;

    &:focus {
      background: rgba(72, 74, 133, 63%);
    }
    margin-bottom: 1rem;
  }
`

export default Input
