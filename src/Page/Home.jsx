import React, { useState, useEffect } from 'react';
import Welcome from '../components/Welcome';
import Content from '../components/Content';

const Home = () => {
  const [pageChange, setPageChange] = useState(false);

  useEffect(() => {
    console.log("Page Change:", pageChange); // Log state change in Home
  }, [pageChange]);

  return (
    <>
      {!pageChange ? <Welcome setPageChange={setPageChange} /> : <Content />}
    </>
  );
};

export default Home;
