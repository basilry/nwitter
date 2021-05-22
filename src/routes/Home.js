import Nweet from "components/Nweet";
import {v4 as uuidv4} from "uuid"
import { dbService, storageService } from "fBase";
import React, { useEffect, useState } from "react";

const Home = ({userObj}) => {
  const [nweet, setNweet] = useState("")
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttatchment] = useState("");
  useEffect(() => {
    // 스냅샷은 기본적으로 데이터베이스에 무슨일 있으면 받는 역할
    dbService.collection("nweets").onSnapshot(snapshot => {
      const nweetArray = snapshot.docs.map(doc => ({
        // 무슨 일이 있으면 이 데이터를 만든다.
        id: doc.id,
        ...doc.data()
      }))
      // 그리고 위의 데이터가 여기에 들어간다
      setNweets(nweetArray)
    })
  }, [])
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if(attachment !== "") {
          //uuid는 자동적으로 생성해주는 랜덤한 이름 id
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
      const nweetObj = {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl
      }
    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    setAttatchment("");
  }
  const onChange = (event) => {
    const {target:{value}} = event;
    setNweet(value);
  };
  const onFileChange = (event) => {
    const {target: {files},
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishiedEvent) => {
      const {
        currentTarget: { result },
      } = finishiedEvent;
      console.log(finishiedEvent);
      setAttatchment(result);
    }
    reader.readAsDataURL(theFile);
  }

  const onClearAttachment = () => setAttatchment(null)

  return (
  <div>
    <form onSubmit={onSubmit}>
      <input 
        value={nweet} 
        onChange={onChange} 
        type="text" 
        placeholder="What's on your mind?" 
        maxLength={120}
      />
      <input type="file" accdept="image/*" onChange={onFileChange}/>
      <input type="submit" value="Nweet" />
      {attachment && (
        <div>
          <img src={attachment} width="100px" height="100px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
    <div>
      {nweets.map((nweet) => (
        // 트윗의 기본적인 데이터들
        <Nweet 
          key={nweet.id} 
          nweetObj={nweet} 
          isOwner={nweet.creatorId === userObj.uid} />
      ))}
    </div>
  </div>
  )
}
export default Home;