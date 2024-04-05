import React from "react";
import './Popup.css'

//Purpose: Popup Modal
function Popup(props) {
    //Check if the props trigged. if so, display it. If not, nothing happens
    return (props.trigger) ? (
        //Styling
        <div className="popup">
            
            <div className="popup-inner">
                {/* Close button */}
                <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
                {/* Display the children of popup when declared */}
                { props.children }
            </div>
        </div>
    ) : "";
}

export default Popup