import { hot } from "react-hot-loader/root";
import React, { useState } from "react";
import GlobalStyle from "../theme";
import { Application } from "./styles";
import Table from "./components/tabledisplay/Table";
import Controller from "./components/controller/Control";
import Header from "./components/header/Header";

const App = () => {
  const [search, setSearch] = useState({
    searchResult: null,
  });
const handleSearch =(data)=>{
    console.log(data)
    setSearch({...search, searchResult : data})
}
  return (
    <>
      <Application>
        <Header />
        <Controller handleSearch={handleSearch} />
        <Table searchResult={search.searchResult} />
      </Application>
      <GlobalStyle />
    </>
  );
};

export default hot(App);
