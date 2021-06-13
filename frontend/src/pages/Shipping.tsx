import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ReactComponent as XSign } from '../img/xSign.svg'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import userSaveAddress from '../actions/saveAddress'
import CheckoutSteps from '../components/CheckoutSteps'
import Select from 'react-select'
import axios from 'axios'
import Loader from '../components/loader'

const Shipping = () => {
  const {
    address,
    geocodingLoading,
    cartItems,
    success: geocodingSuccess,
  } = useSelector((state: any) => state.cart)
  const { product } = useSelector((state: any) => state.buyNowProduct)
  useEffect(() => {
    if (!cartItems.length && !product.name) {
      history.push('/cart')
    }
  }, [cartItems])

  const [addressType, setAddressType] = useState(
    address.addressType ? address.addressType : ''
  )
  const [addressValue, setAddress] = useState(
    address.address ? address.address : ''
  )
  const [city, setCity] = useState(address.city ? address.city : '')
  const [governorate, setGovernorate] = useState(
    address.rawGovernorate ? address.rawGovernorate : ''
  )
  const [phoneNumber, setPhoneNumber] = useState(
    address.phoneNumber ? address.phoneNumber : ''
  )

  useEffect(() => {
    setAddress(address.address ? address.address : '')
    setCity(address.city ? address.city : '')
    setGovernorate(address.governorate ? address.governorate : '')
  }, [address])

  const { user } = useSelector((state: any) => state.userInfo)
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    if (location.pathname.split('/')[1] === 'shipping' && !user.name) {
      const pushedLink = () => {
        if (location.search.split('=')[1] === 'buyNow') {
          return '/login?redirect=shipping?order=buyNow'
        } else {
          return '/login?redirect=shipping'
        }
      }
      history.push(pushedLink())
    }
  }, [history, location, user])

  const dispatch = useDispatch()

  const [latitude, setLatitude] = useState(
    address.location ? address.location.lat : 0
  )
  const [longitude, setLongitude] = useState(
    address.location ? address.location.lon : 0
  )
  const [display_address, setDisplay_address] = useState('')

  const [forwardGeocoding, setForwardGeocoding] = useState(false)

  const submitHandler = async (e: any) => {
    e.preventDefault()
    if (
      phoneNumber.toString().startsWith('01') &&
      phoneNumber.toString().length === 11
    ) {
      const display_address_value = `${addressValue}, ${city}, ${
        governorate + ','
      } Egypt ${', ' + phoneNumber}`

      const latitudeAndLongValue = async () => {
        if (
          (governorate !== address.governorate ||
            addressValue !== address.address ||
            city !== address.city) &&
          addressType === 'Entering another location manualy'
        ) {
          setForwardGeocoding(true)
          const { data } = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressValue}, ${city}, ${governorate}, Egypt.json?access_token=pk.eyJ1IjoieWFzc2luNzg5IiwiYSI6ImNraGNiZDc2cjBjcXoycm5nZDQzeWh5MGsifQ.vZNRBIwM6P8fwbZvoPgp1A`
          )
          const lon = data.features[0].center[0]
          const lat = data.features[0].center[1]
          setForwardGeocoding(false)
          return { lat, lon }
        } else {
          return { lat: latitude, lon: longitude }
        }
      }

      dispatch(
        userSaveAddress({
          addressType,
          address: addressValue,
          city,
          governorate,
          phoneNumber,
          location: await latitudeAndLongValue(),
          display_address: !display_address.length
            ? display_address_value
            : display_address,
        })
      )
      if (!forwardGeocoding) {
        const pushedLink = () => {
          if (location.search.split('=')[1] === 'buyNow') {
            return '/payment?order=buyNow'
          } else {
            return '/payment'
          }
        }
        history.push(pushedLink())
      }
    }
  }
  const options = [
    { value: 'Ash Sharqia', label: 'Ash Sharqia' },
    { value: 'Giza', label: 'Giza' },
    { value: 'North Sinai', label: 'North Sinai' },
    { value: 'Gharbia', label: 'Gharbia' },
    { value: 'Dakahlia', label: 'Dakahlia' },
    { value: 'Alexandria', label: 'Alexandria' },
    { value: 'Asyut', label: 'Asyut' },
    { value: 'Aswan', label: 'Aswan' },
    { value: 'Beni Suef', label: 'Beni Suef' },
    { value: 'Qalyubia', label: 'Qalyubia' },
    { value: 'Cairo', label: 'Cairo' },
    { value: 'Beheira', label: 'Beheira' },
    { value: 'Damietta', label: 'Damietta' },
    { value: 'New Valley', label: 'New Valley' },
    { value: 'Faiyum', label: 'Faiyum' },
    { value: 'Red Sea', label: 'Red Sea' },
    { value: 'Ismailia', label: 'Ismailia' },
    { value: 'Kafr El Sheikh', label: 'Kafr El Sheikh' },
    { value: 'Luxor', label: 'Luxor' },
    { value: 'Matrouh', label: 'Matrouh' },
    { value: 'Minya', label: 'Minya' },
    { value: 'Port Said', label: 'Port Said' },
    { value: 'Qena', label: 'Qena' },
    { value: 'Menofia', label: 'Menofia' },
    { value: 'South Sinai', label: 'South Sinai' },
    { value: 'Sohag', label: 'Sohag' },
    { value: 'Suez', label: 'Suez' },
  ]
  const customStyles = {
    control: () => ({
      display: 'flex',
      padding: '0.25rem 0.6rem !important',
      background: '#f3f3f3',
      color: '#000',
      borderRadius: '6px',
      paddingRight: '0.4rem !important',
      marginBottom: '1rem',
      marginTop: '0.3rem',
    }),
    singleValue: () => ({
      color: '#1a1a1a',
      fontSize: 'calc(1rem + 0.3vw)',
      whiteSpace: 'nowrap',
      width: 'max-content',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      maxWidth: '96%',
    }),
  }

  const cleanGovernorate = (data: any, city: any) => {
    if (
      data.toLowerCase().includes('sharqia') ||
      data.toLowerCase().includes('الشرقية')
    ) {
      return 'Ash Sharqia'
    } else if (
      data.toLowerCase().includes('suez') ||
      city.toLowerCase().includes('السويس')
    ) {
      return 'Suez'
    } else if (
      data.toLowerCase().includes('north sinai') ||
      data.toLowerCase().includes('شمال سيناء')
    ) {
      return 'North Sinai'
    } else if (
      data.toLowerCase().includes('gharbiyya') ||
      data.toLowerCase().includes('الغربية')
    ) {
      return 'Gharbia'
    } else if (
      data.toLowerCase().includes('dakahlia') ||
      data.toLowerCase().includes('الدقهلية')
    ) {
      return 'Dakahlia'
    } else if (
      data.toLowerCase().includes('alexandria') ||
      data.toLowerCase().includes('الإسكندرية')
    ) {
      return 'Alexandria'
    } else if (
      data.toLowerCase().includes('asyut') ||
      data.toLowerCase().includes('أسيوط')
    ) {
      return 'Asyut'
    } else if (
      data.toLowerCase().includes('assouan') ||
      data.toLowerCase().includes('أسوان')
    ) {
      return 'Aswan'
    } else if (
      data.toLowerCase().includes('beni suef') ||
      data.toLowerCase().includes('بنى سويف')
    ) {
      return 'Beni Suef'
    } else if (
      data.toLowerCase().includes('qalyubia') ||
      data.toLowerCase().includes('القليوبية')
    ) {
      return 'Qalyubia'
    } else if (
      data.toLowerCase().includes('cairo') ||
      data.toLowerCase().includes('القاهرة')
    ) {
      return 'Cairo'
    } else if (
      data.toLowerCase().includes('beheira') ||
      data.toLowerCase().includes('البحيرة')
    ) {
      return 'Beheira'
    } else if (
      data.toLowerCase().includes('damietta') ||
      data.toLowerCase().includes('دمياط')
    ) {
      return 'Damietta'
    } else if (
      data.toLowerCase().includes('new valley') ||
      data.toLowerCase().includes('الوادي الجديد')
    ) {
      return 'New Valley'
    } else if (
      data.toLowerCase().includes('faiyum') ||
      data.toLowerCase().includes('الفيوم')
    ) {
      return 'Faiyum'
    } else if (
      data.toLowerCase().includes('red sea') ||
      data.toLowerCase().includes('البحر الأحمر')
    ) {
      return 'Red Sea'
    } else if (
      data.toLowerCase().includes('ismailia') ||
      data.toLowerCase().includes('الإسماعيلية')
    ) {
      return 'Ismailia'
    } else if (
      data.toLowerCase().includes('kafr el-sheikh') ||
      data.toLowerCase().includes('كفر الشيخ')
    ) {
      return 'Kafr El Sheikh'
    } else if (
      data.toLowerCase().includes('luxor') ||
      data.toLowerCase().includes('الأقصر')
    ) {
      return 'Luxor'
    } else if (
      data.toLowerCase().includes('matrouh') ||
      data.toLowerCase().includes('مطروح')
    ) {
      return 'Matrouh'
    } else if (
      data.toLowerCase().includes('minya') ||
      data.toLowerCase().includes('المنيا')
    ) {
      return 'Minya'
    } else if (
      data.toLowerCase().includes('port said') ||
      data.toLowerCase().includes('بورسعيد')
    ) {
      return 'Port Said'
    } else if (
      data.toLowerCase().includes('qena') ||
      data.toLowerCase().includes('قنا')
    ) {
      return 'Qena'
    } else if (
      data.toLowerCase().includes('monufia') ||
      data.toLowerCase().includes('المنوفية')
    ) {
      return 'Menofia'
    } else if (
      data.toLowerCase().includes('south sinai') ||
      data.toLowerCase().includes('جنوب سيناء')
    ) {
      return 'South Sinai'
    } else if (
      data.toLowerCase().includes('sohag') ||
      data.toLowerCase().includes('سوهاج')
    ) {
      return 'Sohag'
    } else {
      return ''
    }
  }
  async function showPosition(position: any) {
    try {
      const { data } = await axios.get(
        `https://us1.locationiq.com/v1/reverse.php?key=pk.49f42f5ce86c30300b67591afd65161c&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
      )
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)

      const display_address_value = `${
        data.address.house_number ? data.address.house_number : ''
      }${data.address.road ? ' ' + data.address.road + ',' : ''}${
        data.address.neighbourhood ? ' ' + data.address.neighbourhood + ',' : ''
      }${data.address.suburb ? ' ' + data.address.suburb : ''}${
        data.address.city ? ' ' + data.address.city + ',' : ''
      }${
        data.address.state || data.address.town
          ? ' ' +
            cleanGovernorate(
              data.address.state
                ? data.address.state
                : data.address.town
                ? data.address.town
                : '',
              data.address.city
            ) +
            ', '
          : ''
      }Egypt${', ' + phoneNumber}`
      setDisplay_address(display_address_value)
      dispatch({
        type: 'GEOCODING_SUCCESS',
        payload: {
          location: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          display_address: display_address_value,
          address: `${
            data.address.house_number ? data.address.house_number : ''
          }${data.address.road ? ' ' + data.address.road + ',' : ''}${
            data.address.neighbourhood
              ? ' ' + data.address.neighbourhood + ','
              : ''
          }${data.address.suburb ? ' ' + data.address.suburb : ''}`,
          city: `${
            data.address.city
              ? data.address.city
              : data.address.town
              ? data.address.town
              : data.address.village
              ? data.address.village
              : ''
          }`,
          governorate: cleanGovernorate(
            data.address.state
              ? data.address.state
              : data.address.town
              ? data.address.town
              : '',
            data.address.city
          ),
          phoneNumber: address.phoneNumber ? address.phoneNumber : null,
        },
      })
    } catch (error: any) {
      dispatch({
        type: 'GEOCODING_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  const geolocationHandler = () => {
    if (!geocodingLoading) {
      if (navigator.geolocation) {
        dispatch({ type: 'GEOCODING_REQUEST' })
        navigator.geolocation.getCurrentPosition(showPosition)
      } else {
        alert('Geolocation is not supported by this browser.')
      }
    }
  }
  const addressTypesOptions = [
    { value: 'Detecting my location', label: 'Detecting my location' },
    {
      value: 'Entering another location manualy',
      label: 'Entering another location manualy',
    },
  ]

  return (
    <>
      <CheckoutSteps step1 step2 current='step2' />

      <StyledShipping>
        <form onSubmit={submitHandler}>
          <div className='title'>
            <h1>Shipping</h1>
          </div>

          <div className='type'>
            <label>Tell us the address by</label>
            <Select
              styles={customStyles}
              onChange={(e: any) => {
                setAddressType(e.value)
                if (address.addressType !== e.value) {
                  setAddress('')
                  setPhoneNumber('')
                  setCity('')
                  setGovernorate('')
                } else {
                  setAddress(address.address)
                  setPhoneNumber(address.phoneNumber)
                  setCity(address.city)
                  setGovernorate(address.governorate)
                }
              }}
              value={
                addressType.length
                  ? { label: addressType, value: addressType }
                  : ''
              }
              options={addressTypesOptions}
            />
            <input
              autoComplete='off'
              style={{
                opacity: 0,
                height: '100%',
                pointerEvents: 'none',
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                transform: 'translate(2.5% ,-15%)',
              }}
              value={addressType}
              required={true}
              onChange={(e) => e}
            />
          </div>
          {addressType === 'Detecting my location' && (
            <button
              className='geolocation'
              type='button'
              onClick={geolocationHandler}
            >
              Get my Location
              {geocodingLoading && <Loader />}
            </button>
          )}
          {((addressType !== 'Detecting my location' &&
            addressType.length > 0) ||
            (addressType === 'Detecting my location' &&
            address.addressType !== 'Detecting my location'
              ? geocodingSuccess
              : true && latitude > 0 && longitude > 0)) && (
            <>
              <div className='address'>
                <label htmlFor='address'>Address</label>
                <input
                  value={addressValue}
                  id='address'
                  type='text'
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
                <XSign
                  onClick={() => setAddress('')}
                  style={{
                    display: `${addressValue.length ? 'block' : 'none'}`,
                  }}
                  className='xSign2'
                />
              </div>
              <div className='city'>
                <label htmlFor='city'>City</label>
                <input
                  value={city}
                  id='city'
                  type='text'
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
                <XSign
                  onClick={() => setCity('')}
                  style={{ display: `${city.length ? 'block' : 'none'}` }}
                  className='xSign2'
                />
              </div>
              <div className='governorate'>
                <label htmlFor='governorate'>Governorate</label>
                <Select
                  styles={customStyles}
                  onChange={(e: any) => setGovernorate(e.value)}
                  value={
                    governorate.length
                      ? { label: governorate, value: governorate }
                      : null
                  }
                  options={options}
                />
                <input
                  autoComplete='off'
                  style={{
                    opacity: 0,
                    height: '100%',
                    pointerEvents: 'none',
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: 'translate(2.5% ,-15%)',
                  }}
                  value={governorate}
                  required={true}
                  onChange={(e) => e}
                />
              </div>
              <div className='phoneNumber'>
                <label htmlFor='phoneNumber'>Phone Number</label>
                <input
                  style={{
                    boxShadow: `${
                      (!phoneNumber.toString().startsWith('01') &&
                        phoneNumber.length) ||
                      (phoneNumber.toString().length !== 11 &&
                        phoneNumber.length)
                        ? '0 0 3px red'
                        : 'unset'
                    }`,
                  }}
                  value={phoneNumber}
                  id='phoneNumber'
                  type='number'
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <XSign
                  onClick={() => setPhoneNumber('')}
                  style={{
                    display: `${phoneNumber.length ? 'block' : 'none'}`,
                  }}
                  className='xSign2'
                />
              </div>
              <button type='submit'>
                Continue {forwardGeocoding && <Loader />}
              </button>
            </>
          )}
        </form>
      </StyledShipping>
    </>
  )
}
const StyledShipping = styled.div`
  #loader {
    animation: loaderAnim 0.9s infinite linear;
  }
  #loader:first-child {
    width: 1.7rem !important;
    height: 1.7rem !important;
    margin-left: unset;
    #greybackground path {
      stroke: white;
    }
  }

  .css-1uccc91-singleValue {
    color: #000 !important;
    font-size: calc(1rem + 0.3vw) !important;
  }
  .css-g1d714-ValueContainer {
    padding: 0 !important;
    margin: 0 !important;
  }
  .css-26l3qy-menu {
  }
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1 1 auto;

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 52%;
    justify-content: center;
    margin-bottom: 1.5rem;
    max-width: 750px;
    margin-top: 1.8rem;
    h1 {
      color: #1a1a1a;
      font-weight: 500;
      font-size: calc(2rem + 1vw);
    }
    .signInDiv {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .geolocation {
      padding: 0.5rem 0.9rem;
      border-radius: 6px;
      font-size: calc(1rem + 0.3vw);
      margin-bottom: 1rem;

      #loader:first-child {
        height: 1.3rem !important;
        width: 1.3rem !important;
        margin-left: 0.3rem !important;
      }
    }
    .address,
    .governorate,
    .city,
    .phoneNumber,
    .type {
      position: relative;
      width: 100%;
      input {
        background: #f3f3f3;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        width: 100%;
        font-size: calc(1rem + 0.3vw);
        margin-top: 0.1rem;
      }
      label {
        font-size: calc(1rem + 0.3vw);
        color: #343a40;
      }
    }
    .governorate {
      position: relative;
    }

    button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.4rem 0.9rem;
      border: none;
      background: #00b2d8;
      color: white;
      border-radius: 6px;
      font-size: calc(1.1rem + 0.3vw);
      cursor: pointer;
      transition: 0.1s;
      &:hover {
        background: #00a8ce;
      }
      #loader:first-child {
        width: calc(0.9rem + 0.5vw) !important;
        height: calc(0.9rem + 0.5vw) !important;
        margin-left: 0.45rem !important;
        #greybackground path {
          stroke: white !important;
        }
      }
    }
    .title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.2rem;
    }
    #governorate,
    #city,
    #address,
    #phoneNumber {
      margin-bottom: 1rem;
      margin-top: 0.3rem;
      padding-right: 2.8rem;
    }
  }
  .xSign2 {
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translate(-50%, -12%);
    width: calc(0.75rem + 1vw);
    cursor: pointer;
    padding: 0.2rem;
  }

  @media screen and (max-width: 1050px) {
    margin-top: unset !important;
    justify-content: flex-start;
    .xSign2 {
      width: calc(1.2rem + 1vw);
      cursor: pointer;
      transform: translate(-48%, -28%) !important;
    }
    form {
      .geolocation {
        padding: 0.55rem 0.9rem;
        #loader:first-child {
          height: 1.1rem !important;
          width: 1.1rem !important;
          margin-left: 0.3rem !important;
        }
      }
      width: 100%;
      margin-top: 1.2rem;
      h1 {
        font-size: calc(2.5rem + 1vw);
      }
      input {
        font-size: calc(1.1rem + 0.3vw);
      }
      label {
        font-size: calc(1.3rem + 0.3vw);
      }
      .css-yk16xz-control,
      .css-1pahdxg-control {
        padding: 0.38rem 1rem !important;
        padding-right: 0.4rem !important;
      }
      .css-1uccc91-singleValue {
        color: #000 !important;
        font-size: calc(1.1rem + 0.3vw);
      }
      button {
        font-size: calc(1.15rem + 0.3vw);
        border-radius: 6px;
        padding: 0.5rem 0.9rem;
      }
      #address,
      #password,
      #governorate,
      #city {
        margin-bottom: 1.3rem;
      }
    }
  }
`

export default Shipping
