import Nweet from "components/Nweet";

import { dbService, storageService } from "fBase";
import React, { useEffect, useState } from "react";
import NweetFactory from "components/NweetFactory";
import { useHistory } from "react-router";

const Home = ({userObj}) => {
  const [nweets, setNweets] = useState([]);
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
 

  return (
  <div className="container">
    <NweetFactory userObj={userObj} />
    <div style={{marginTop: 30}}>
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