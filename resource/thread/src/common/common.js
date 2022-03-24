import React, { Component, useState, useEffect } from "react";
import { FaColumns, FaDatabase, FaList, FaProjectDiagram, FaQuestionCircle } from "react-icons/fa";

function createProjectLink(projkey) {
    return '/projects/' + projkey + '/flow/';
}

function createDatasetLink(projkey, ds) {
    return '/projects/' + projkey + '/datasets/' + ds + '/explore/';
}

function createDatasetLinkTag(proj, ds) {
    return '<a href="' + this.createDatasetLink(proj, ds) + '" target="_blank">' + proj + '.' + ds + '</a>';
}

function getIconForDataikuItemType(type, size = "11px") {
    switch(type) {
        case "project":
            return <FaProjectDiagram size={size} />;
        case "dataset":
            return <FaDatabase size={size} />;
        case "column":
            return <FaColumns size={size} />;
        case "definition":
            return <FaList size={size} />;
        default: 
            return <FaQuestionCircle size={size} />;
    }   
}

function useOnScreen(ref) {

    const [isIntersecting, setIntersecting] = useState()
  
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting)
    )
  
    useEffect(() => {
      observer.observe(ref.current)
      // Remove the observer as soon as the component is unmounted
      return () => { observer.disconnect() }
    }, [])
  
    return isIntersecting
}

const Common = {
    createDatasetLink,
    createProjectLink,
    createDatasetLinkTag,
    getIconForDataikuItemType,
    useOnScreen
};

export default Common;