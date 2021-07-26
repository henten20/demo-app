import React from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';

function Footer() {
    return(
        <React.Fragment>
            <Toolbar>
                <Item location={'left'}>
                    <div>Version 0.0.1</div>
                </Item>
            </Toolbar>
        </React.Fragment>
    );
}

export default Footer;