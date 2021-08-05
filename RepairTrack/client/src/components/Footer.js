//     *****     Chad[well] Clark 2021     *****     //
import React from "react";

// import { getDobbs } from "../../modules/Dobbs.js";
// import "./Footer.css";
// import { Bob } from "./Bob.js";
// import { Mark } from "./Mark.js";

const Footer = () => {
  // const [bobs, setBobs] = useState([]);

  // const handleBob = () => {
  //   getDobbs().then((jr) => {
  //     setBobs(jr);
  //     return jr;
  //   });
  // };
  // const handleMark = () => {
  //   console.log("github link");
  // };

  return (
    <div className="p-2 row footer">
      <div className="footer-title">
        <h4>&copy; {new Date().getFullYear()} Chad[well] Clark</h4>
      </div>
      {/* <div>
          <Mark handleMark={handleMark} />
        </div> */}
      {/* <div className="bbdbb">{bobs.joke}</div>
        <div className="bob">
          <Bob handleBob={handleBob} />
        </div> */}
    </div>
  );
};

export default Footer;
