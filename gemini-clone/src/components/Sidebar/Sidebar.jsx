import React, { useCallback, useContext, useState } from 'react'
import './Sidebar.css'
import menuimg from '../../assets/menu.png'
import plusimg from '../../assets/plus.png'
import messageimg from '../../assets/message.png'
import question from '../../assets/question.png'
import settings from '../../assets/settings.png'
import clock from '../../assets/clock.png'
import { Context } from '../../context/Context'

const Sidebar = () => {

  const [extended,  setExtended] = useState(false)
  const {onSent, prevPrompts, setResentPrompt, newChat} = useContext(Context)

  const loadPrompts = async (prompt) => {
    setResentPrompt(prompt)
    await onSent(prompt)
  }


  return (
    <div className='sidebar'>
        <div className='top'>
            <img onClick={()=> setExtended(prev=>!prev)} className='menu' src={menuimg} alt=''/>
            <div onClick={()=>newChat()} className='new-chat'>
                <img src={plusimg} alt=''/>
                {extended?<p>New Chat</p>:null}
            </div>
            {extended
            ? <div className='recent'>
                <p className='recent-title'>Recent</p>
                {prevPrompts.map((item, index) =>{
                  return (
                    <div onClick={()=>loadPrompts(item)} className='recent-entry'>
                        <img src={messageimg} alt=''/>
                        <p>{item.slice(0.18)} ...</p>
                    </div>
                  )
                })}
        
            </div>
            :null
           }
        </div>
        <div className='bottom'>
          <div className="bottom-item recent-entry">
          <img src={question} alt=''/>
             {extended?<p>Help</p>:null}
          </div>
          <div className="bottom-item recent-entry">
          <img src={clock} alt=''/>
            {extended?<p>Activity</p>:null}
          </div>
          <div className="bottom-item recent-entry">
          <img src={settings} alt=''/>
              {extended?<p>Settings</p>:null}
          </div>
        </div>
    </div>
  )
}

export default Sidebar