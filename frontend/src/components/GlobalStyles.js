import { createGlobalStyle } from 'styled-components'

const Global = createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family: 'Poppins', sans-serif;
    outline:none;
    scrollbar-width:thin; 
}

*::-webkit-scrollbar {
  width: 7.4px;
}
*::-webkit-scrollbar-track {
  background: transparent;
}
*::-webkit-scrollbar-thumb {
  background: #cdcdcd;
  border: transparent;
}
a{
    color:white;
    text-decoration:none;
}
img{
  image-rendering: -webkit-optimize-contrast;
}
.loadingText{
  text-align:center;
  margin:0.5rem 0;
}
.App{
    min-height:100vh;
    display:flex;
    flex-direction:column;
}

#logoutLoading{
  overflow-y:hidden !important; 
}
    .starsRating {
      position: relative;
      margin: 0.2rem 0;
      display: inline-block;
    }
    .ratingCount {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(100%, -50%);
      span {
        font-size: calc(0.75rem + 0.3vw);
        color: #00b2d8;
      }
    }
    .starsRating .fas,
    .starsRating .far {
      padding-right: 0.1rem;
      color: #00b2d8;
      font-size: calc(1rem + 0.3vw);
      &:last-child {
        padding-right: 0rem;
      }
    }
    #loader{
        width:calc(3rem + 1vw);
        height:calc(3rem + 1vw);
        animation:loaderAnim 1.4s infinite ease-out;
        transform-origin:center;
    }
    @keyframes loaderAnim {
       from {
        transform:rotate(0deg)
       }
       to{
        transform:rotate(360deg)
       }
    }
  
  .gobackMessage {
    display: inline-flex !important;
    margin-left:5vw;
  }
  .filepond--drop-label label{
    font-size:calc(0.74rem + 0.3vw) !important;
  }
  .browseTextFilePond{
    cursor: pointer;
    text-decoration:underline;
  }
  .goBackForgotPassword ,.flexCont {
    display: inline-flex !important;
  }
  .goBackForgotPassword{
    margin-left: 5vw;
  }
   .__react_component_tooltip {
    background: #1e203e;
    border-radius: 5px;
    padding: 8px 18px;
    &::after {
      border-top-color: #1e203e !important;
    }
  }
   .starsRating{
      display: flex;
      align-items: center !important;
      margin-right:0!important;
    }
   .ratingCount {
      position: unset;
      transform:unset;
      display:flex;
      
    }
@media screen and (max-width:1050px){
      .starsRating{
      display: flex !important;
    }
    *{   
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0.05);
    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none;
    }
      .filepond--drop-label label{
    font-size:calc(0.64rem + 0.3vw) !important;
  }
    .xSign{
        width: calc(2.1rem + 1vw) !important;
        padding:0.6rem !important;
        transform: translate(-7%,-50%) !important;
    }
    .burger{
        display:flex !important;
    }
    .dropDown{
        display:none !important;
    }
    .inputDiv input {
        border-top-left-radius:5px;
        border-bottom-left-radius:5px;
        font-size: calc(0.7rem + 1vw);
    }
    .profile{
        display:none !important;
    }
    .searchForm{
        order: 3;
        flex: 1 1 400rem !important;
        margin: unset !important;
        margin-top: calc(0.35rem + 1vw);
        
    }
    .submit img{
        width: calc(1rem + 1vw)!important;
    }
    nav{
        flex-wrap:wrap;
        width:94%;
    }
    header{
        padding:calc(0.8rem + 1vw) 0 !important;
    }
    .cart h1{
        font-size: calc(0.7rem + 1vw);
    }
    .cartImg{
        width: calc(1.65rem + 0.8vw) !important;
        .cart_counter{
            height: 1.25rem;
            width: 1.25rem;
            font-size: calc(0.7rem + 0.2vw);
        }
    }
}
@media screen and (max-width:350px){
    nav div svg{
        width: calc(9rem + 5vw) !important;
    }
}
@media screen and (max-width:450px){
    *::-webkit-scrollbar {
  width: 4px;
}
*::-webkit-scrollbar-thumb {
  border-radius:1px;
}
   .burger span{
       width: 2.4rem !important;
       height: 0.2rem !important;
       margin: 0.15rem 0 !important;
   }
}
@media screen and (max-width:300px){
   .burger {
       margin-right: 0 !important;
       span{
        width: 1.75rem !important;
        height: 0.16rem !important;  
        margin: 0.13rem 0 !important; 
       }
   }
      .cartImg{
        width: calc(1.35rem + 0.8vw) !important;
        .cart_counter{
            height: 0.9rem;
            width: 0.9rem;
            font-size: calc(0.6rem + 0.2vw);
        }
    }
}
  .goBackVerification{
        display:inline-flex !important;
        .flex-cont{
            display:inline-flex !important;
        }
    }
    .goBackVerifyCont{
        justify-self: flex-start;
        align-self: flex-start;
        margin-left:5vw;
        width: max-content;
        height: max-content;
        
    }
`
export default Global
