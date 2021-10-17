import { useEffect, useState } from 'react'
import Api from '../../util/Api';
import './conversation.css'

export default function Conversation({conversation, currentUser}) {
    const [chater, setChater] = useState({}) 

    useEffect(() => {
        const friendId = conversation.members.find(m => m !== currentUser._id)
        const fetchChater = async () => {
            try {
                const chaterData = await Api.get(`/users?userId=${friendId}`)
                setChater(chaterData.data)                
            } catch (error) {
                console.log(error);
            }
        }
        fetchChater()
    }, [conversation, currentUser])

    return (
        <div className="conversation">
            <img src={ chater.profilePicture } alt="" className="conversationImg"/>
            <span className="conversationName">{chater.username}</span>
        </div>
    )
}
