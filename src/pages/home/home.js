import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import Header from '../../components/header/header';
import Aside from '../../components/aside/aside';
import { Grid } from '@mui/material';
import Paper from '@mui/material';
import { makeStyles } from '@mui/styles';

//import Article from '../../components/article/article';
import Footer from '../../components/footer/footer';
//import Movies from '../movies/movies';
import './home.css';
const useStyles = makeStyles({
  root: {
    marginBottom: 0,
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item md={12} style={{ marginTop: 0 }}>
        <Header />
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        className
        style={{ marginRight: 0, marginTop: 83 }}
      >
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={8}>
        <Outlet />
      </Grid>
      <Grid item xs={12} md={12}>
        <Navbar />
      </Grid>
    </Grid>
  );
}
