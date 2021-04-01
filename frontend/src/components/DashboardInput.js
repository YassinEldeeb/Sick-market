import React from "react"
import styled from "styled-components"
import { v4 as uuid } from "uuid"

const Input = ({ value, setValue, label, type = "text", input = true }) => {
  const randomId = uuid()
  return (
    <StyledInput>
      <label htmlFor={`dashboardInput${randomId}`}>{label}</label>
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
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  label {
    font-size: calc(1rem + 0.3vw);
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.25rem;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  textarea {
    max-width: calc(700px + 10vw);
    min-width: calc(100px + 10vw);
    min-height: calc(25px + 2vh);
    width: calc(330px + 5vw);
    height: calc(100px + 5vh);
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
