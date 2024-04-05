import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { addDoc, collection, getDocs, orderBy, query, doc } from "firebase/firestore";
import NavProfile from "../../components/nav/Nav";
import Popup from "../../components/forumComp/Popup";
import classes from "./forumPages.module.css";
import useFetch from "../../components/custHooks/useFetch";
import personIcon from "../../assets/icons/Person Icon.png";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { Timestamp } from "firebase/firestore";


function DetectionForum() {
  const [postLists, setPostList] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [postText, setPostText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [activePostId, setActivePostId] = useState("");

  const postCollectionRef = collection(db, "detectionPosts");
  const date = new Date();
  const [[fName], isPending, err] = useFetch("fName", "lName");

  const createPost = async () => {
    let fileUrl = null;
    if (selectedFile) {
      const storage = getStorage();
      const storageRef = ref(storage, `uploads/${selectedFile.name}_${Date.now()}`);
      await uploadBytes(storageRef, selectedFile);
      fileUrl = await getDownloadURL(storageRef);
    }

    await addDoc(postCollectionRef, {
      postText,
      createdAt: Timestamp.fromDate(new Date()), // Storing as Timestamp
      createdBy: fName,
      fileUrl,
    });

    setButtonPopup(false);
    setPostText("");
    setSelectedFile(null);
    fetchPosts(); // Refetch posts after adding a new one
  };

  const addCommentToPost = async (postId, commentText, createdBy) => {
    const postRef = doc(db, "detectionPosts", postId);
    const commentsRef = collection(postRef, "comments");

    await addDoc(commentsRef, {
      commentText,
      createdAt: Timestamp.fromDate(new Date()), // Storing as Timestamp
      createdBy,
    });
    fetchPosts(); // Refetch posts to update comments
  };

  const fetchPosts = async () => {
    const postsQuery = query(postCollectionRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(postsQuery);
    const posts = await Promise.all(querySnapshot.docs.map(async (doc) => {
      const post = { ...doc.data(), id: doc.id, comments: [] };
      const commentsRef = collection(db, "detectionPosts", doc.id, "comments");
      const commentsSnapshot = await getDocs(query(commentsRef, orderBy("createdAt", "desc")));
      const comments = commentsSnapshot.docs.map(commentDoc => ({ id: commentDoc.id, ...commentDoc.data() }));
      post.comments = comments;
      return post;
    }));
  
    setPostList(posts);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      
      <NavProfile />

      <div>
       
        <div style={{ paddingTop: "10rem", paddingRight: "1rem", paddingBottom: "3rem", paddingLeft: "3rem", borderRight: "3px solid black" }}>
          <h1 style={{ paddingTop: "0rem", marginBottom: "0.5rem", fontFamily: "Sans-Serif", fontWeight: "bold" }}>Forum</h1>
          
          <div className={classes.homePage}>
          <button onClick={() => setButtonPopup(true)} className={classes.add_post_btn}>
          Add new post
        </button>
            {postLists.map((post) => (
              <div className={classes.post} key={post.id}>
                <div className={classes.postTextContainer}>
                  <p>{post.createdBy}</p>
                  <p>{post.createdAt.toDate().toLocaleString()}</p>
                  <p>{post.postText}</p>
                  {post.fileUrl && <img src={post.fileUrl} alt="Post attachment" style={{ maxWidth: '100%' }} accept="image/png, image/gif, image/jpeg, image.webp"/>}

                  <div>
                  <input className={classes.input}
                    type="text"
                    placeholder="Write a comment..."
                    value={activePostId === post.id ? commentText : ''}
                    onChange={(e) => {
                      setActivePostId(post.id);
                      setCommentText(e.target.value);
                    }}
                  />
                  </div>
                 <div>
                 <button className={classes.replyButton} onClick={() => {
                    addCommentToPost(post.id, commentText, fName);
                    setCommentText("");
                    setActivePostId("");
                  }}>Reply</button>
                 </div>
                 <p>Comments</p>
                 <div className={classes.comment_box}>
                 {post.comments.map((comment) => (
                    <p key={comment.id}><b>{comment.createdBy}:</b> {comment.commentText}</p>
                  ))}
                  </div>               
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={classes.btn_container}>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3>Add new post</h3>
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
          <textarea
            placeholder="Type a post..."
            className={classes.text_area}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <button onClick={createPost} className={classes.create_post_btn}>
            Save Post
          </button>
        </Popup>
      </div>
      </div>

     
    </>
  );
}

export default DetectionForum;
