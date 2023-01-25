import React, { useState, useEffect } from "react";

const Seachbox = (props) => {
    const [search, setsearch] = useState("")
    const [searchlistplaces, setsearchlistplaces] = useState([])
    const [searchnotfound, setsearchnotfound] = useState(false)
    const [populationnotfound, setpopulationnotfound] = useState(false)
    const [population, setpopulation] = useState([])
    const [apistatus, setapistatus] = useState(false)

    const setNewLocation = async (locationArray) => {
        setapistatus(true)
        setpopulationnotfound(false)
        props.setsearchlocation(locationArray)
        document.getElementById("floatingSearch").value = locationArray.display_name

        let history = JSON.parse(localStorage.getItem("placeHistory"));
        if (!history) {
            history = []
        }
        console.log(history)
        if (!history.includes(locationArray.display_name)) {
            history.push(locationArray.display_name);
            localStorage.setItem("placeHistory", JSON.stringify(history))

            let getHistory = JSON.parse(localStorage.getItem("placeHistory"))
            if (getHistory) {
                props.setallhistoryplacenames(getHistory)
            }
        }
        let test = []
        try {
            const apiUrl = `https://restcountries.com/v3.1/name/${locationArray.display_name}?fullText=true`
            const response = await fetch(apiUrl);
            let searchResults = await response.json();
           
            test.push(searchResults[0]['population'])
            test.push(Object.keys(searchResults[0]['gini'])[0])
            setpopulation(test)
            setpopulationnotfound(true)
        } catch (error) {
            console.log(error)
            test.push("Data not available")
            console.log(test)
            setpopulation(test)
            setpopulationnotfound(true)
        }


        document.getElementById("locationList").style.display = "none"
        setapistatus(false)
    }

    const setSearchText = async (event) => {
        setsearch(event.target.value)
    }


    const searchLocation = async () => {
        setapistatus(true)
        setsearchnotfound(false)
        setpopulationnotfound(false)
        try {
            const apiUrl = `https://nominatim.openstreetmap.org/search?q=${search}&format=json&polygon_geojson=1`
            const response = await fetch(apiUrl);
            let searchResults = await response.json();
            let administrativeArray = []
            searchResults.map((results) => {
                if (results['type'] === 'administrative') {
                    administrativeArray.push(results)
                }
            })
            console.log(searchResults)
            setsearchlistplaces(administrativeArray)

            document.getElementById("locationList").style.display = "block"
            document.getElementById("historyInnerContainer").style.marginTop = "50px";
            setapistatus(false)
            setsearchnotfound(false)
        } catch (error) {
            setapistatus(false)
            setsearchnotfound(true)
            setsearchlistplaces([])
            console.log(error);
        }
    }

    useEffect(() => {
        if (props.historyplacename) {
            autoResult()
        }
    }, [props.historyplacename])

    const autoResult = async () => {
        setapistatus(true)
        console.log(props.historyplacename)
        try {
            const apiUrl = `https://nominatim.openstreetmap.org/search?q=${props.historyplacename}&format=json&polygon_geojson=1`
            const response = await fetch(apiUrl);
            let searchResults = await response.json();
            setNewLocation(searchResults[0])
            setapistatus(false)
        } catch (error) {
            setapistatus(false)
            console.log(error);
        }

    }

    return (
        <>
        <div className="d-flex justify-content-end my-2" style={{"paddingRight":"10px"}}>
            <div className="input-group" style={{"width":"unset"}}>
                <input type="text" onChange={setSearchText} className="form-control border-end-0" id="floatingSearch" placeholder="Search Location"/>
                <span>
                    <button className="btn border" onClick={searchLocation}>
                        <i className="fa fa-search"></i>
                    </button>
                </span>
            </div>
        </div>

        {searchnotfound && <p className='text-center'><b>No map data found</b></p>}
     
        {populationnotfound && population[0] && 
              <div className='text-center d-flex justify-content-end my-2 populationContainer'>
                <p>Searched location population: <b>{population[0]}</b></p>
                {populationnotfound && population[1] && <p>Population as per: <b>{population[1]}</b></p>}
              </div>
        }

        <div className="d-flex justify-content-end my-2">
            <div className="autocomplete-items" id="locationList">
                {searchlistplaces.map((searchlistplace) => {
                    return <div key={searchlistplace.place_id} onClick={() => {
                        setNewLocation(searchlistplace);
                    }}>
                        {searchlistplace.display_name}
                    </div>
                })

                }

            </div>
        </div> 
        {apistatus && 
            <div className="loader d-flex justify-content-center">
                <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" />
                <span>Loading Api data</span>
                </div>
        }

        </>
    )
}

export default Seachbox