import React from "react";

const Loader = () => {
  return (
    <>
      <div className="hole">
        {[...Array(10)].map((_, i) => (
          <i key={i} style={{ animationDelay: `${0.3 * (i + 1)}s` }}></i>
        ))}
      </div>

      <style>{`
        .hole {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 100px;
          height: 100px;
        }

        .hole i {
          display: block;
          position: absolute;
          width: 50px;
          height: 50px;
          border-radius: 140px;
          opacity: 0;
          background: gray;
          animation-name: scale;
          animation-duration: 1s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }

        @keyframes scale {
          0% {
            transform: scale(2);
            opacity: 0;
            box-shadow: 0px 0px 50px rgba(255, 255, 255, 0.5);
          }
          50% {
            transform: scale(1) translate(0px, -5px);
            opacity: 1;
            box-shadow: 0px 8px 20px rgba(255, 255, 255, 0.5);
          }
          100% {
            transform: scale(0.1) translate(0px, 5px);
            opacity: 0;
            box-shadow: 0px 10px 20px rgba(255, 255, 255, 0);
          }
        }
      `}</style>
    </>
  );
};

export default Loader;
