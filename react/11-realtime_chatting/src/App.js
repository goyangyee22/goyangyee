import { getUserAuth } from "./api/firebase";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./SignIn";

function App() {
  const auth = getUserAuth();
  // const user = auth.currentUser;
  const [user] = useAuthState(auth);
  // const [loginUser, setLoginUser] = useState(user);
  const handleLogout = () => {
    auth.signOut();
  };

  // useEffect(() => {
  //   // 인증 정보가 바뀌면 계속 실행되는 함수
  //   onAuthStateChanged(auth, (user) => {
  //     setLoginUser(user);
  //   });
  // }, []);

  return (
    <div className="App">
      <header>
        <h4>🙏 소원을 빌어주세요</h4>
        <button className="sign-out" onClick={handleLogout}>
          로그아웃
        </button>
      </header>
      <section>
        {user ? <ChatRoom auth={auth} /> : <SignIn auth={auth} />}
      </section>
    </div>
  );
}

export default App;