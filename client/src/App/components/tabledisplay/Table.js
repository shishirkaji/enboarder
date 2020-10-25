import React, { useEffect, useState } from 'react'
import './style.css';
import { withRouter } from 'react-router-dom'
import { getAllShips, state } from "./../../../redux/action"
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux';
import axios from 'axios'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: "5px",
        textAlign: "center",
    },
}));
const Table = () => {
    let [state, setState] = useState({
        searchResult: null,
        ships: null
    })
    useEffect(async () => {
        let ships = await axios.get('http://localhost:4000/api/v1/ship')
        if (ships) {
            console.log(ships.data.rows)
            setState({ ...state, ships: ships.data.rows })
        }
    }, [])
    const showShips = () => {
        return state.ships.map(ship => {
            return (<tr>
                <td>{ship.type}</td>
                <td>{ship.weight}</td>
                <td>{ship.homeport}</td>
                <td>{ship.name}</td>
                <td>{ship.class}</td>
                <td>Icon</td>
            </tr>)
        })

    }
    return (
        <div>
            This is the table
            <table>
                <thead>
                    <tr>
                        <th>Ship Type</th>
                        <th>Weight</th>
                        <th>Home Port</th>
                        <th>Ship Name</th>
                        <th>Class</th>
                        <th>Icon</th>
                    </tr>
                </thead>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                </tr>
                {state.ships !== null ? showShips() : null}
            </table>
        </div>
    )
}
const mapStateToProps = (state) => ({
    ships: state.ships
})
// export default Table
export default connect(mapStateToProps, { getAllShips })(Table)
