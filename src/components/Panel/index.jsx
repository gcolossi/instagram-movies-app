import { api } from "../../api/axios-instance";
import imgSuperman from "../../assets/superman.png";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export function Panel() {
  const [panelPosts, setPanelPosts] = useState([""]);
  const [panelLikes, setPanelLikes] = useState([""]);
  const [panelComments, setPanelComments] = useState([""]);

  const getPanelPosts = async () => {
    const response = await api.get("posts");
    return response.data;
  };

  const getPanelLikes = async () => {
    const response = await api.get("likes");
    return response.data;
  };
  const getPanelComments = async () => {
    const response = await api.get("comments");
    return response.data;
  };

  useEffect(() => {
    getPanelPosts().then((resp) => setPanelPosts(resp));
    getPanelLikes().then((resp) => setPanelLikes(resp));
    getPanelComments().then((resp) => setPanelComments(resp));
  }, []);

  return (
    <div>
      {panelPosts.map((post) => {
        const postLikes = panelLikes.filter(e => e.postId === post.id)
        return (
          <>
            <div className={styles.infoPanelContainer}>
              <div className={styles.imgPanelContainer}>
                <img src={post.picture} alt="" />
              </div>
              <div className={styles.contentPanel}>
                <img src={imgSuperman} alt="" />
                <span>{post.user}</span>
                <span title={postLikes.map(e => e.user).join('\n')}>Likes :{postLikes.length}</span>
                <span>Comentarios: {panelComments.filter(e => e.postId === post.id).length}</span>
                <span>{post.title}</span>
                {panelComments.map((comments) => {
                  if (comments.postId == post.id) {
                    return (
                      <>
                        <span>
                          <strong>{comments.user}</strong>
                        </span>
                        <span>{comments.comment}</span>
                      </>
                    );
                  }
                })}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
