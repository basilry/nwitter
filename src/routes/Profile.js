import { authService, dbService } from "fBase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

export default ({refreshUser, userObj}) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  // const getMyNweets = async () => { // 생성했다가 삭제한 부분
  //   const nweets = await dbService
  //   .collection("nweets")
  //   .where("creatorId", "==", userObj.uid)
  //   .orderBy("createdAt")
  //   .get();
  //   console.log(nweets.docs.map(doc => doc.data()));
  // };
  // useEffect(() => {
  //   getMyNweets()
  // }, [])
  const onChange = (event) => {
    const {
      target: {value},
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if(userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  }

  return (
    <>
    <form onSubmit={onSubmit}>
      <input 
        onChange={onChange} 
        type="text" 
        placeholder="Display Name" 
        value={newDisplayName}
      />
      <input type="submit" value="Update Profile" />
    </form>
     <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}