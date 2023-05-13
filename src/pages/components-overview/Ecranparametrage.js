import React, { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import TypeMission from "./TypeMission";
import Nature from "./Nature";
import TypeNature from "./TypeNature";
const Ecranparametrage = () => {
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        display: "inline-block",
        width: "100%",
        maxWidth: "400px",
        marginBottom: "10px"
      }}>
        <TypeMission />
      </div>
      <div style={{
        display: "inline-block",
        width: "100%",
        maxWidth: "400px",
        marginBottom: "10px",
        marginLeft: "10px",
        marginRight: "10px"
      }}>
        <Nature />
      </div>
      <div style={{
        display: "inline-block",
        width: "100%",
        maxWidth: "400px",
        marginBottom: "10px"
      }}>
        <TypeNature />
      </div>
    </div>
  );
};

export default Ecranparametrage;
