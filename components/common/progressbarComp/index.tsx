import React, { useEffect, useState } from "react";

const ProgressBarComp = ({ percentage }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (percentage >= 100) {
      setProgress(100)
    } else {
      setProgress(percentage)
    }
  }, [percentage])



  return (
    <div style={{ width: '100%', height: "20px", background: "white", borderRadius: "10px" }}>
      <div style={{ width: `${progress}%`, height: "20px", background: "#3D83DF", color: "white", fontSize: "14px", display: "flex", justifyContent: 'center', alignItems: 'center', borderRadius: "10px" }}>
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBarComp;