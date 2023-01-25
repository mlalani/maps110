import React, { useEffect, useState } from "react";

const History = (props) => {
    let host = window.location
    const { historyplacename, sethistoryplacename, setallhistoryplacenames, allhistoryplacenames } = props

    useEffect(() => {
        let history = JSON.parse(localStorage.getItem("placeHistory"));
        if (history) {
            setallhistoryplacenames(history)
        }
    }, [])

    return (
        <>
            <div className="historyContainer">
                <button id="historybtn" className="btn btn-light menuIcon" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                    <i className="fa fa-history">
                        <span>History</span>
                    </i>
                </button>
                <div id="historyInnerContainer">
                    <div className="collapse collapse-horizontal" id="collapseWidthExample">
                        {!allhistoryplacenames[0] && 
                            <div className="notMyCard card-body">
                                <div className="d-flex justify-content-between">
                                    <span>No Search History Found</span>
                                </div>
                            </div>                           
                        }
                        
                        {allhistoryplacenames && allhistoryplacenames.map((allhistoryplacename, i) => {
                            return <>
                                <div className="mycard card-body">
                                    <div className="d-flex justify-content-between" key={allhistoryplacename}>
                                        <span onClick={() => {
                                            sethistoryplacename(allhistoryplacename);
                                            document.getElementById("historybtn").click();
                                        }}>{allhistoryplacename}</span>

                                        <button data-bs-toggle="tooltip" title="Copy to clipboard" className="btn btn-primary" onClick={() => {
                                            navigator.clipboard.writeText(host + allhistoryplacename)
                                            console.log(navigator.clipboard.writeText(host + allhistoryplacename))
                                        }}><i className="fa fa-share-alt"></i></button>
                                    </div>
                                    <hr />
                                </div>
                            </>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default History