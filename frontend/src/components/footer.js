import React from "react";
import "./footer.css"
export default function footer(props){
    return(
        <>
        <footer>
        <div class={`container1 container1-${props.mode} bg-${props.mode==="light"?"rgb(29, 79, 96)":"dark"}`}>
            <div class="copyright">
              &copy; Copyrights All Rights Reserved
            </div>
            <div class="credits">
              Designed By <a href="https://www.linkedin.com/in/thrambadia-vishal">Vishal</a>
            </div>
          </div>
        </footer>
        </>
    )
}