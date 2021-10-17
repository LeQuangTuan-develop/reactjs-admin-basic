import { useEffect, useState } from 'react'
import Api from '../../util/Api'
import './chatOnline.css'

export default function ChatOnline({onlineUsers, currentId, setCurrentChat}) {
    const [patients, setPatients] = useState([])
    const [onlinePatients, setOnlinePatients] = useState([])

    useEffect(() => {
        const getPatients = async () => {
            try {
                const patientsData = await Api.get(`doctors/patients/${currentId}`)
                setPatients(patientsData.data)
            } catch (error) {
                console.log(error);
            }
        }
        getPatients()
    }, [currentId])

    useEffect(() => {
        setOnlinePatients(patients.filter(patient => onlineUsers.includes(patient._id)))
    }, [patients, onlineUsers])

    const handleClick = async (user) => {
        try {
            const conversation = await Api.get(`conversations/find/${user._id}/${currentId}`)
            if (conversation.data) {
                setCurrentChat(conversation.data)
            } else {
                const newConversation = await Api.post(`conversations/create`, {
                    senderId: currentId,
                    receiverId: user._id,
                })
                setCurrentChat(newConversation.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="chatOnline">
            {onlinePatients.map(patient => 
                <div key={patient._id} className="chatOnlinepatient" onClick={() => handleClick(patient)}>
                    <div className="chatOnlineImgContainer">
                        <img 
                            src={ patient.profilePicture } 
                            alt="" 
                            className="chatOnlineImg"
                        />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{patient.username}</span>
                </div>
            )}
        </div>
    )
}
