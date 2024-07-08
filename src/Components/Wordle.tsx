import React from "react"
const Wordle : React.FC = ()=> {

    return (
        <div>
            <label htmlFor="wordl">gavno</label>
            <input placeholder="gavno" id='word' name='wordl'></input>
        </div>
    );
}
export default Wordle;