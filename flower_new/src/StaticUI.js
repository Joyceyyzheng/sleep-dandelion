import useStore from "./store"


export default function StaticUI() {

    // const setModelActive = useStore((state) => state.setModelActive);
    // const setFlowerActive = useStore((state) => state.setFlowerActive);
    const dayNumber = useStore(state => state.dayNumber);
    const dayPhase = useStore(state => state.dayPhase);

    // function growModel() {
    //     setModelActive(true);
    // }

    // function growFlower() {
    //     console.info("flowers")
    //     setFlowerActive(true)
    // }

    return (
        <>
            {/* <div className="ui-cat" onClick={growModel}>Cat✨</div>
            <div className="ui-flower" onClick={growFlower}>💡</div> */}
            {/* <div className="ui-cat">Current Day: {dayNumber}</div> */}
            <div className="progress-bar-parent">

                {/* <div className="checkbox" id="dayOne"></div> 
                 <div className="checkbox" id="dayTwo"></div>
                <div className="checkbox" id="dayThree"></div>
                <div className="checkbox" id="dayFour"></div>
                <div className="checkbox" id="dayFive"></div>
                <div className="checkbox" id="daySix"></div>
                <div className="checkbox" id="daySeven"></div> */}
                <div className={`checkbox ${dayNumber >= 1 ? (dayPhase ? 'day-checked' : 'night-checked') : dayNumber === 0 ? 'default' : ''}`} id="dayOne"></div>
                <div className={`checkbox ${dayNumber >= 2 ? (dayPhase ? 'day-checked' : 'night-checked') : dayNumber === 0 ? 'default' : ''}`} id="dayTwo"></div>
                <div className={`checkbox ${dayNumber >= 3 ? (dayPhase ? 'day-checked' : 'night-checked') : dayNumber === 0 ? 'default' : ''}`} id="dayThree"></div>
                <div className={`checkbox ${dayNumber >= 4 ? (dayPhase ? 'day-checked' : 'night-checked') : dayNumber === 0 ? 'default' : ''}`} id="dayFour"></div>
                <div className={`checkbox ${dayNumber >= 5 ? (dayPhase ? 'day-checked' : 'night-checked') : dayNumber === 0 ? 'default' : ''}`} id="dayFive"></div>
                <div className={`checkbox ${dayNumber >= 6 ? (dayPhase ? 'day-checked' : 'night-checked') : dayNumber === 0 ? 'default' : ''}`} id="daySix"></div>
                <div className={`checkbox ${dayNumber >= 7 ? (dayPhase ? 'day-checked' : 'night-checked') : dayNumber === 0 ? 'default' : ''}`} id="daySeven"></div>

            </div>
        </>
    );
}
