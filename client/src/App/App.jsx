import { hot } from 'react-hot-loader/root';
import React from 'react';
import GlobalStyle from '../theme';
import { Application } from './styles';
import Table from './components/tabledisplay/Table';
import Controller from './components/controller/Control';
import Header from './components/header/Header'

const App = () => (
    <>
        <Application >
            <Header />
            <Controller />
            <Table />
        </Application>
        <GlobalStyle />
    </>
);

export default hot(App);