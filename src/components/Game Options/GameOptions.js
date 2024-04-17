import { React } from "react";

import GameOption from "../Game Option/GameOption";

import classes from "./acts.module.css";

//Purpose: Display the game options in the game page
function GameOptions(props) {
    //Changes colors depending on level
    const lvlColorHandler = (lvl) => {
        if (lvl === 1) return `rgb(218, 247, 166)`;
        if (lvl === 2) return `rgb(133, 193, 233)`;
        if (lvl === 3) return `rgb(93, 173, 226)`;
        if (lvl === 4) return `rgb(102, 0, 204)`;
        return `rgb(${(63, 137, 187)})`;
    };

    //Actual display for different games
    return (
        <div className={classes.acts__container}>
            {/* Title */}
            <div className={classes.acts__title}>
                <h2>{props.title}</h2>
            </div>

            <div className={classes.display}>
                
                {/* Display game options within cards - changing game options requires going to associated handler */}
                {props.optionsArr.map((card, i) => (
                    <div className={classes.flex_item}>
                        <GameOption
                            key={i}
                            title={card.title}
                            src={card.src}
                            link={card.link}
                            level={lvlColorHandler(card.level)}
                            desc={card.desc}
                            voice={"voice01"}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameOptions;
