import React from 'react';
import logo from "../error.jpg";

// when unexpected error happens
const UnhandledError =()=>
<React.Fragment>
<h3>Something went wrong!</h3>
<img style={{width:'100%'}} src={logo} alt={'error'} />
</React.Fragment>

export default UnhandledError 