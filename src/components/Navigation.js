import React, {useState}  from "react";
import './Navigation.css';

const Navigation = ({locations}) => {
    const [locationList, setList] = useState(locations)
    const getClasses = (ctx, index) => {
        let classes = `material-icons ${ctx}`;
        if (ctx === 'dots') {
            if (isLast(index)) {
                classes += ' hidden';
            }
        } else {
            classes += isLast(index) ? ' small' : ' x-small';
            if (index === 0) {
                classes += ' first';
            }
        }
        return classes;
    }

    const isLast = (index) => {
        return index === locations.length - 1;
    }
    const isFirst = (index) => {
        return index === 0;
    }
    const moveUp =(index) => {
        if(index >0){
            const newLocations = [...locationList];
            const loc = newLocations.splice(index, 1);
            newLocations.splice(index-1, 0, loc);
            setList(newLocations)
        }

    }
    const moveDown = (index) => {
        if(index < locationList.length-1){
            const newLocations = [...locationList];
            const loc = newLocations.splice(index, 1);
            newLocations.splice(index+1, 0, loc);
            setList(newLocations)
        }

    }
    return  <div className="layout-row align-items-center justify-content-center navigation-screen">
        <div className="card layout-row flat map-card">
            <section className="card pb-16 pr-16 flex-auto layout-column justify-content-center">
                <ul className="pl-0" data-testid="location-list">
                { locationList.map((location, index) => 
                    <li key={'row' + index} data-testid={'location-' + index}
                        className="layout-row justify-content-between align-items-center mr-8 pl-40 relative">
                        <div className="layout-column justify-content-start align-items-center handle">
                            <i className={getClasses('marker', index)}>{isLast(index) ? 'room' : 'radio_button_checked'}</i>
                            <i className={getClasses('dots', index)}>more_vert</i>
                        </div>
                        <div className="location-name">
                            <p className="caption text-start mb-4" data-testid="location">{location}</p>
                        </div>
                        <div>
                            {!isFirst(index) && <button className="icon-only small mx-0" data-testid="up-button" onClick={()=>moveUp(index)}>
                                <i className="material-icons">arrow_upward</i>
                            </button>}
                            {!isLast(index) && <button className="icon-only small mx-0" data-testid="down-button" onClick={()=>moveDown(index)}>
                                <i className="material-icons">arrow_downward</i>
                            </button>}
                        </div>
                    </li>

                )}            
                </ul>
            </section>
            <section className="flex-auto">
                <img src="images/map.svg" className="fill" alt="map"/>
            </section>
        </div>

    </div>
}
export default Navigation;
