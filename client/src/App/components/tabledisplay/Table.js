import React from 'react'
import './style.css';
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: "5px",
        textAlign: "center",
    },
}));
const Table = () => {

    return (
        <div>
            This is the table
            <table>
                <tr>
                    <th>Ship Type</th>
                    <th>Weight</th>
                    <th>Home Port</th>
                    <th>Ship Name</th>
                    <th>Class</th>
                    <th>Icon</th>
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                </tr>
               
            </table>
        </div>
    )
}

export default Table
