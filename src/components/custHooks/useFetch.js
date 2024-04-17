import { React, useState, useEffect, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import AuthContext from "../store/auth-context";
import { db } from "../../firebase-config";

//This hook gets 1 or more strings as a parameter and returns the corresponding
//user documents/collection(s) as a nested array.
//Each collection is returned in the same position they were passed as a parameter
const useFetch = (...requests) => {
  let arr = [];
  const [FBDoc, setFBDoc] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [err, setErr] = useState(false);

  const user = useContext(AuthContext).fbUser;

  useEffect(() => {
    console.log(user);
    const getData = async function () {
      setIsPending(true);
      const docRef = doc(db, user);
      const docSnap = await getDoc(docRef);

      requests.forEach((req) => {
        docSnap.exists() ? arr.push(docSnap.data()[req]) : setErr(true);
      });
      setFBDoc(arr);

      setIsPending(false);
    };

    getData();
    console.log("FETCH DATA",arr);
  }, [user]);

  return [FBDoc, isPending, err];
};

export default useFetch;