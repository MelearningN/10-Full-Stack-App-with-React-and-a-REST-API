import React from 'react';
import logo from "../noResultFound.png";

// route doesnt exist
const NotFound=()=>
<React.Fragment>
<h3>No Results Found</h3>
<img style={{width:'100%'}} src={logo} alt={'error'} />
</React.Fragment>

export default NotFound
