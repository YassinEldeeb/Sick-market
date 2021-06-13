import React, { FC } from 'react'
import styled from 'styled-components'
import QRCode from 'qrcode.react'
import logo from '../img/paperLogo.png'
import { parseISO, format } from 'date-fns'

interface Props {
  refrence: any
  name: string
  email: string
  address: string
  method: string
  id: string
  createdAt: string
  approved: boolean
}

const OrderPaper: FC<Props> = ({
  refrence,
  name,
  email,
  address,
  method,
  id,
  createdAt,
  approved,
}) => {
  return (
    <StyledPaper ref={refrence}>
      {approved && (
        <>
          <div className='content'>
            <div className='logoCont'>
              <img id='Logo' src={logo} />
            </div>
            <div className='section'>
              <h1 className='title'>Shipping :</h1>
              <span>Name: {name}</span>
              <span>Email: {email}</span>
              <span>Address: {address}</span>
            </div>
            <div className='section'>
              <h1 className='title'>Payment Method :</h1>
              <span>Method: {method}</span>
            </div>
            <div className='section'>
              <h1 className='title'>Delivery QR Code :</h1>
              <QRCode value={id} />
            </div>
          </div>
          <div className='bottom'>
            <h1>
              Created: {format(parseISO(createdAt), 'yyyy-MM-dd / hh:mm a')}
            </h1>
            <h1>Sick market©2021 all rights reserverd</h1>
          </div>
        </>
      )}
    </StyledPaper>
  )
}

const StyledPaper = styled.div`
  .bottom {
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    width: 90%;
    justify-content: space-between;
    h1 {
      font-size: 1rem;
      color: rgba(0, 0, 0, 0.7);
      font-weight: 400;
    }
  }
  background: white;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 7px;
    span {
      max-width: 80%;
      margin-bottom: 7px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .title {
    font-weight: 500;
    margin-bottom: 10px;
  }
  .content {
    width: 90%;
    margin: 0 auto;
  }

  .logoCont {
    display: grid;
    place-items: center;
    margin: 1rem;
  }
  #Logo {
    width: 20rem;
    margin-top: 0.8rem;
    margin-bottom: 1rem;
  }
`

export default OrderPaper
