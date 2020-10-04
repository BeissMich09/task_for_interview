import React from "react";
import style from "./Post.module.css";
import moment from "moment";

class Post extends React.Component {
  state = {
    posts: [],
  };
  componentDidMount() {
    const token = "Токен в документе";
    fetch(
      `https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${token}`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ posts: data }))
      .catch((err) => {
        console.log(err);
      });
  }

  dataCreate = (datePublicStr) => {
    return moment(datePublicStr).format("ll");
  };

  render() {
    if (this.state.posts.error) {
      return <div>{this.state.posts.error.message} </div>;
    }
    return (
      <div className={style.postItem}>
        <div className={style.item}>
          {this.state.posts.data
            ? this.state.posts.data.map((post) => {
                return (
                  <div key={post.id} className={style.intagramCard}>
                    <div className={style.withDate}>
                      <div className={style.username}>
                        <img
                          alt="Фото профиля beissenmich"
                          src="https://scontent-arn2-2.cdninstagram.com/v/t51.2885-19/s150x150/95650530_670360653797233_5207120020689125376_n.jpg?_nc_ht=scontent-arn2-2.cdninstagram.com&amp;_nc_ohc=Mf0xyUUz388AX_q9bfw&amp;oh=e1f6b8ee6ee893b467031938cac37602&amp;oe=5FA4BCAF"
                        ></img>
                        <p>{post.username}</p>
                      </div>
                      <div className={style.date}>
                        {this.dataCreate(post.timestamp)}
                      </div>
                    </div>
                    <img src={post.media_url} alt="фото поста" />
                    <div className={style.likeCount}>
                      <i
                        onClick={() => {
                          alert(post.id);
                        }}
                        className="fa fa-heart-o"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <p>{post.caption}</p>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default Post;
