import React from "react";

function Form() {
  return (
    <form>
      <div>
        <input type="email" placeholder="Email" />
        {/* <div>
          <span>email 관련 error 메세지</span>
        </div> */}
      </div>
      <div>
        <input type="password" placeholder="Password" />
        {/* <div>
            <span>password 관련 error 메세지</span>
        </div> */}
      </div>
      <button>로그인</button>
      {/* <span></span> */}
    </form>
  );
}

export default Form;
