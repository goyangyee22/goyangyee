import React, { useState } from "react";
import Form from "../../../components/form/Form";
import { useDispatch } from "react-redux";
import { getUserAuth, joinUser, syncCart } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../../store/user/userSlice";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [firebaseError, setFirebaseError] = useState("");
  const dispatch = useDispatch();
  const auth = getUserAuth();
  const navigate = useNavigate();

  const handleSignUpAndLogin = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const { user } = userCredential;

      //   로컬 스토리지에서 장바구니 데이터 읽기
      const cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];
      await joinUser(user.uid, user.email);
      await syncCart(user.uid, cartItems);
      dispatch(
        setUser({ email: user.email, token: user.refreshToken, uid: user.uid })
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      setFirebaseError("이메일 또는 비밀번호가 잘못되었습니다.");
    }
    // console.log(email, password);
  };

  return (
    <Form
      title={"회원가입"}
      getDataForm={handleSignUpAndLogin}
      firebaseError={firebaseError}
    />
  );
}

export default SignUp;
