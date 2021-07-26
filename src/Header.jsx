import React from 'react';
import Menu from 'devextreme-react/menu';
import 'whatwg-fetch';

const menuOptions = [{
    id: 0,
    name: 'Home',
    onClick: () => alert("Home page is not available at this time.")
}, {
    id: 1,
    name: 'User Registration',
    onClick: () => window.location = '/'
}, {
    id: 1,
    name: 'Upload Enrollment Sheet',
    onClick: () => window.location = '/enroll'
}, {
    id: 2,
    name: "LISP Parser",
    onClick: () => window.location = '/parse'
}];

function Header() {
    return(
        <React.Fragment>
            <div className={'logo'}>
                <img src={'/logo192.png'} width={'50'} height={50} alt={'Demo'}></img>
            </div>
            <Menu
                dataSource={menuOptions}
                displayExpr={'name'}
                orientation={'horizontal'}
            />
        </React.Fragment>
    );
}

export default Header;