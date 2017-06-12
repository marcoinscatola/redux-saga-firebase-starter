import React from 'react';
import {Link} from 'react-router-dom'
import inject from 'react-jss';
let styles = {
    logo: {
        color: 'white',
        textDecoration: 'none'
    }
}
export default inject(styles)(
    ({classes}) => <Link to="/" className={classes.logo}>LOGO</Link>
)
