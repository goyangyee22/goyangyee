import React from "react";
import scissorImg from "./assets/scissor.svg";
import rockImg from "./assets/rock.svg";
import paperImg from "./assets/paper.svg";

function HandIcon({ className }) {
  return (
    <div>
      <img src={rockImg} className={className} />
    </div>
  );
}

export default HandIcon;
