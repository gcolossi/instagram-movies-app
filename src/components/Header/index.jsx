import imgSuperman from "../../assets/superman.png";
import imgBatman from "../../assets/batman.png";
import imgWonderWoman from "../../assets/wonderWoman.png";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { api } from "../../api/axios-instance";

export function Header() {
  const [allPosts, setAllPosts] = useState([""]);
  const [allLikes, setAllLikes] = useState([""]);
  const [allComments, setAllComments] = useState([""]);
  const [user, setUser] = useState(false);
  const [testArray, SetTestArray] = useState([""]);
  const [isSelect, setIsSelect] = useState(true);

  const getAllDataPost = async () => {
    const response = await api.get("posts");
    return response.data;
  };

  const getAllDataLikes = async () => {
    const response = await api.get("likes");
    return response.data;
  };

  const getAllDataComments = async () => {
    const response = await api.get("comments");
    return response.data;
  };

  const selectUser = () => {
   if(user) {
     setUser(false);
     console.log(user)
   } else {
     setUser(true);
   }
  }


  





  useEffect(() => {
    getAllDataPost().then((resp) => setAllPosts(resp));
    getAllDataLikes().then((resp) => setAllLikes(resp));
    getAllDataComments().then((resp) => setAllComments(resp));


  }, []);

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.imgContainer}>
          <img src={imgSuperman} />
        </div>
        <div className={styles.infoContainer}>
          <span className={styles.titleUser}>{allPosts[0].user}</span>
          <span>{allPosts.length} posts</span>
          <span>{allLikes.length} curtidas</span>
          <span>{allComments.length} comentários</span>
        </div>
        </div>
        <div className={styles.userContainer}>
        <div className={styles.selectUserTitleContainer}>
        <span>Visualizar timeline com:</span>
        </div>
        <div className={styles.selectUserContainer}>
         {user === false ? <img src={imgSuperman} value={"superman"} onClick={() => selectUser()} /> : <img className={styles.clicked} src={imgSuperman} value={"superman"}  onClick={() => selectUser()}/>  }
          <img src={imgBatman} />
          <img src={imgWonderWoman} />
        </div>
        </div>

    </>
  );
}

