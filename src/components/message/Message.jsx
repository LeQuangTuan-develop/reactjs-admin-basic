import "./message.css";
import {format} from "timeago.js"
import { useEffect, useState } from "react";
import Api from "../../util/Api";

export default function Message({own, message}) {
  const [user, setUser] = useState({})

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await Api.get(own ? `doctors/detail/${message.senderId}` : `/users?userId=${message.senderId}`)
        console.log(userData.data);
        setUser(userData.data) 
      } catch (error) {
        console.log(error);
      }
    }
    getUser()
  }, [message, own])

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={own ? user.img : user.profilePicture }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
