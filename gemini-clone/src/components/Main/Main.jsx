import React, { useContext } from 'react'
import { Context } from '../../context/Context'
import avatar from '../../assets/avatar.png'
import compass from '../../assets/compass.png'
import bulb from '../../assets/bulb.png'
import code from '../../assets/code.png'
import message from '../../assets/message.png'
import gallery from '../../assets/gallery.png'
import mic from '../../assets/mic.png'
import send from '../../assets/send.png'
import response from '../../assets/response.png'
import './Main.css'


const Main = () => {

    const {onSent, resentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context);

  return (
    <div className='main'>
        <div className='nav'>
            <p>Gemini</p>
            <img className='avatar' src={avatar} alt=''/>
        </div>
        <div className='main-container'>
         
         {!showResult
         ?<>
       <div className="greet">
            <p><span>Hello, Dev.</span></p>
            <p>How can I help you today?</p>
          </div>
          <div className="cards">
            <div className="card">
              <p>Suggets beautiful places to see an upcoming road trip</p>
              <img src={compass} alt=''/>
            </div>
            <div className="card">
              <p>Briefly summerize this concept: urban planning </p>
              <img src={bulb} alt=''/>
            </div>
            <div className="card">
              <p>Brianstorm team bonding activities for our work retread</p>
              <img className='message' src={message} alt=''/>
            </div>
            <div className="card">
              <p>Improve the readability of the following code </p>
              <img src={code} alt=''/>
            </div>
          </div>
          </>
          :<div className='result'>
            <div className="result-title">
              <img src={avatar} alt=''/>
              <p>{resentPrompt}</p>
            </div>
           <div className="result-data">
            <img src={response} alt=''/>
            {loading
            ?<div className='loader'>
              <hr/>
              <hr/>
              <hr/>
            </div>
             :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
            }
            
           </div>
          </div>
         }

          <div className="main-bottom">
            <div className="search-box">
              <input onChange={(e) =>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
              <div>
                <img src={gallery} alt=''/>
                <img src={mic} alt=''/>
                {input?<img onClick={() =>onSent()} src={send} alt=''/>:null}
              </div>
            </div>
            <p className="bottom-info">
              Gemini may display inaccurate info.
            </p>
          </div>


        </div>
    </div>
  )
}

export default Main