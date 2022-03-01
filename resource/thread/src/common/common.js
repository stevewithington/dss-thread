import React from "react";
import { FaColumns, FaDatabase, FaList, FaProjectDiagram, FaQuestionCircle } from "react-icons/fa";

function getIconForObjectType(type) {
    switch(type) {
        case "project":
            return <FaProjectDiagram />;
        case "dataset":
            return <FaDatabase />;
        case "column":
            return <FaColumns />;
        case "definition":
            return <FaList />;
        default: 
            return <FaQuestionCircle />;
    }   
}

const Common = {
    getIconForObjectType
};

export default Common;