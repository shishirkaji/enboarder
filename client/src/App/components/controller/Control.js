import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "5px",
    textAlign: "center",
  },
}));
const Control = () => {
  const classes = useStyles();
  const [age, setAge] = React.useState("type 1");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <label>Ship type</label>{" "}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            style={{ color: "white" }}
            onChange={handleChange}
          >
            <MenuItem value={"type 1"}>one</MenuItem>
            <MenuItem value={"type 2"}> two</MenuItem>
            <MenuItem value={"type 3"}>three</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={4} style={{ display: "flex" }}>
          <label>Weight</label>{" "}
          <TextField
            id="standard-number"
            style={{ color: "white" }}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <label>Home port</label>{" "}
          <TextField
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
          <Button variant="contained" color="secondary">
            Load all
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Control;
