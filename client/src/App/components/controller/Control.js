import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "5px",
    textAlign: "center",
  },
}));
const Control = ({ handleSearch }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    type: "None",
    homeport: "",
    weight: 0,
    search: false
  });
  const handleChange = (event, name) => {
    if (name === "type") setState({ ...state, search: true, type: event.target.value });
    if (name === "weight") setState({ ...state, search: true, weight: event.target.value });
    if (name === "homeport") setState({ ...state, search: true, homeport: event.target.value });
  };
  useEffect(() => {
    let { type, weight, homeport } = state
    // make api call
    console.log("state")
    console.log(state)
    const apiCall = async () => {
      let data = new Object;
      if (type !== "None") {
        data = { ...data, type: type }
      }
      if (weight !== null && weight !== ""  && weight !== 0) {

        data = { ...data, weight: weight }
      }
      if (homeport !== null && homeport !== '') {
        data = { ...data, homeport: " " + homeport }
      }
      if (type === "None" && (weight === null || weight === '') && (homeport === null || homeport === '')) {
        console.log("not making any api call")
        return null
      }
      console.log("calling search api")
      console.log(data)
      axios.defaults.headers.post["Content-Type"] = "application/json";
      let response = await axios({
        method: "get",
        url: "http://localhost:4000/api/v1/ship/search",
        params: data
      })
      if (response) handleSearch(response.data)
    }
    if (state.search) {
      console.log("here")
      apiCall()
    }

  }, [state])
  const handleClearSearch = () => {
    // clear search fields 
    setState({
      type: "None",
      homeport: "",
      weight: 0,
      search: false
    })
    handleSearch(null)
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <label>Ship type</label>{" "}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.type}
            name="type"
            style={{ color: "white" }}
            onChange={(e) => handleChange(e, "type")}
          >
            <MenuItem value={"None"}>None</MenuItem>
            <MenuItem value={"Tug"}>Tug</MenuItem>
            <MenuItem value={"Cargo"}> Cargo</MenuItem>
            <MenuItem value={"Barge"}>Barge</MenuItem>
            <MenuItem value={"High Speed Craft"}>High speed craft</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={4} style={{ display: "flex" }}>
          <label>Weight</label>{" "}
          <TextField
            id="standard-number"
            style={{ color: "white" }}
            type="number"
            value ={state.weight}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              console.log("handling wirhg change")
              handleChange(e, "weight")
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <label>Home port</label>{" "}
          <TextField
          value ={state.homeport}
            onChange={(e) => {
              handleChange(e, "homeport")
            }}
          //   required
          //   id="filled-required"
          //   label="Required"
          //   defaultValue="Hello World"
          />
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary">
            Search
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="secondary" onClick={(e) => { handleClearSearch() }}>
            Clear Search
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Control;
