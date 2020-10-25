import React, { useEffect, useState } from 'react'
import './style.css';
import { withRouter } from 'react-router-dom'
import { getAllShips, state } from "./../../../redux/action"
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import { connect } from 'react-redux';
import axios from 'axios'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: "5px",
        textAlign: "center",
    },
}));
const Table = ({ searchResult }) => {
    let [state, setState] = useState({
        searchResult: null,
        ships: null,
        total: 0,
        currentPage: 1,
        image: null
    })
    useEffect(() => {
        console.log("makind api call from table")
        const makeApiCall = async () => {
            let total = await axios.get('http://localhost:4000/api/v1/ship/count')
            let ships = await axios.get('http://localhost:4000/api/v1/ship')
            if (ships) {
                console.log(ships.data.rows)
                let pages = total.data.total / 5;
                pages = Math.ceil(pages)
                console.log(pages)
                setState({ ...state, ships: ships.data.rows, total: total.data.total, pages })
            }
        }
        makeApiCall()
    }, [])
    const pageChange = async (e, page) => {
        console.log(page)
        let ships = await axios.get(`http://localhost:4000/api/v1/ship?offset=${(page - 1) * 5}`)
        console.log(ships.data)
        setState({ ...state, ships: ships.data.rows, currentPage: page })
    }
    const showShips = () => {
        if (searchResult === null) {
            return state.ships.map((ship, index) => {
                console.log("show all ships")
                console.log(ship.icon)
                return (
                    <tr key={ship.id}>
                        <td>{ship.type}</td>
                        <td>{ship.weight}</td>
                        <td>{ship.homeport}</td>
                        <td>{ship.name}</td>
                        <td>{ship.class}</td>
                        {/* <td>icon</td> */}
                        <td>{ship.icon === null ? showUpoad(ship.id) : showIcon(ship.icon)}</td>
                    </tr>)
            })
        } else return showSearchResults()

    }
    const showIcon = () => {
        return "icon"
    }
    const showUpoad = () => {
        return (<div>
            <input type="file" name="file" onChange={(e) => { imageUploadHandler(e) }} />
            <Button startIcon={<PublishIcon />} onClick={(e) => { uploadImage() }} variant="contained" color='secondary' >upload</Button>
        </div>)
    }
    const imageUploadHandler = event => {
        console.log(event.target.files[0])
        setState({ ...state, image: event.target.files[0] })
    }
    const uploadImage = () => {
        console.log("uploading images")
        const data = new FormData()
        data.append('file', state.image)
        console.log(data)
        axios.post("http://localhost:4000/api/v1/upload", data, {
            // receive two    parameter endpoint url ,form data
        }).then(res => { // then print response status
            console.log(res.statusText)
        }).catch((err) => { console.log(err) })
    }

    const showSearchResults = () => {
        console.log("showing search results")
        console.log(searchResult)
        return searchResult.ships.map((ship, index) => {
            console.log(ship)
            return (
                <tr key={ship.id}>
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
            {searchResult === null ? <h1>All ships</h1> : <h1>Search Results</h1>}
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
                <tbody>
                    {state.ships !== null ? showShips() : null}
                </tbody>
            </table>
            {searchResult === null ? <div><Pagination page={state.currentPage} count={state.pages} onChange={(e, page) => { pageChange(e, page) }} />
            </div> : null}

        </div>
    )
}
const mapStateToProps = (state) => ({
    ships: state.ships
})
// export default Table
export default connect(mapStateToProps, { getAllShips })(Table)
