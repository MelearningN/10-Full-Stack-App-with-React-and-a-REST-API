import React from 'react';
import logo from "../forbidden.jpg";

// user is directed here by no proper permission
const Forbidden=()=>
<React.Fragment>
<h3>Oh no! You are not allowed</h3>
<img style={{width:'100%'}} src={logo} alt={'error'} />
</React.Fragment>

export default Forbidden