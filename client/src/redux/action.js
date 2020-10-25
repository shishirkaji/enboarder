import { GET_ALL_SHIPS, SEARCH_SHIPS } from './constants'
import axios from 'axios';
// export const getAllShips = () => (dispatch) => {
//     console.log("get all ships")
//     // const makeApiCall = async () => {
//     //     try {
//     //         let ships = await axios.get('http://localhost:4000/api/v1/ship')
//     //         if (ships) {
//     //             console.log(ships)
//     //             dispatch({
//     //                 type: GET_ALL_SHIPS,
//     //                 payload: ships
//     //             })
//     //         }
//     //     } catch (error) {
//     //         console.log(error)
//     //     }
//     // }
//     // makeApiCall()
//     // dispatch({
//     //     type:"hero"
//     // })

// }
export function getAllShips(postId) {
    console.log("get all ships")
    return async function (dispatch) {
    console.log("get all ships dispatch")

        try {
            let ships = await axios.get('http://localhost:4000/api/v1/ship')
            if (ships) {
                console.log(ships)
                dispatch({
                    type: GET_ALL_SHIPS,
                    payload: ships
                })
            }
        } catch (error) {
            console.log(error)
        }
    };
}