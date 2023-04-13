import React, { useEffect, useRef } from "react";

const Television = ({ children, playClickHandle }) => {
  const labelRef = useRef();
  return (
    <div className="tv">
      <div className="antenna-container">
        <div className="antenna"></div>
      </div>
      <div className="television-container">
        <div className="television">
          <div className="television-inner">
            <div className="television-screen-container">
              <div className="television-crt">
                {/* <div className="television-screen">
                  <div className="off"></div>
                  <div className="logo-container">
                    <div className="logo">
                      <div className="play"></div>
                    </div>
                    <div className="text">YouTube</div>
                  </div>
                  <div className="noise"></div>
                </div> */}
                {children}
              </div>
            </div>
            <div className="television-lateral">
              <div className="dial-container">
                <div
                  className="dial channel-button"
                  s
                  // tyle="--value: 0deg;"
                >
                  <div className="data-container">
                    <div className="data">#</div>
                    <div className="data">#</div>
                    <div className="data">#</div>
                    <div className="data">#</div>
                    <div className="data">#</div>
                    <div className="data">#</div>
                    <div className="data">#</div>
                    <div className="data">#</div>
                    <div className="data">#</div>
                    <div className="data">#</div>
                    <div className="data">#</div>
                    <div className="data">#</div>
                  </div>
                  <div className="dial-core"></div>
                  <div className="selector"></div>
                </div>
                <div
                  className="dial volume-button"
                  // style="--value: 0deg;"
                >
                  <div className="data-container">
                    <div className="data">#</div>
                    <div className="data">#</div>
                    <div className="data">#</div>
                    <div className="data">#</div>
                    <div className="data">#</div>
                    <div className="data">#</div>
                    <div className="data">#</div>
                    <div className="data">#</div>
                    <div className="data">#</div>
                    <div className="data">#</div>
                    <div className="data">#</div>
                    <div className="data">#</div>
                  </div>
                  <div className="dial-core"></div>
                  <div className="selector"></div>
                </div>
              </div>
              <div className="speaker-container">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="buttons">
              {/* <div className="button-container">
                <div className="button"></div>
              </div> */}
              <div
                className="button-container"
                style={{
                  position: "relative",
                }}
                onClick={() => {
                  if(labelRef.current){
                    labelRef.current.style.setProperty("display", "none");
            
                  }
                  playClickHandle()
                }}
              >
                <span ref={labelRef} style={{
                  position: "absolute",
                  padding: "1rem",
                  backgroundColor: "white",
                  zIndex: "1000",
                  width : "15rem",
                  borderRadius: "0 3rem 2rem 2rem",
                  top: '50%',
                  left: "100%",
                  // transform: "translate(100%,0)"
                }}>Click to play</span>
                <div className="button"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="television-base">
          <div className="slots">
            <div className="slot"></div>
            <div className="slot"></div>
            <div className="slot"></div>
          </div>
          <div className="slots">
            <div className="slot"></div>
            <div className="slot"></div>
            <div className="slot"></div>
            <div className="slot"></div>
            <div className="slot"></div>
            <div className="slot"></div>
          </div>
        </div>
        <div className="foot-container">
          <div className="foot left"></div>
          <div className="foot right"></div>
        </div>
      </div>
    </div>
  );
};

export default Television;
