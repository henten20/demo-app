import React, { useState } from "react";
import Toolbar, { Item } from 'devextreme-react/toolbar';

import Form , { ButtonItem, GroupItem, SimpleItem } from "devextreme-react/form";
import { Toast } from 'devextreme-react/toast';
import TextArea from "devextreme/ui/text_area";

function ParsePage() {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('info');
    const [lisp, setList] = useState({});

    function validate() {
        fetch('http://localhost:8080/parse', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(lisp.data)
        })
        .then(response => response.json())
        .then(result => processResult(result))
    }

    function processResult(result) {
        if(result){
            setMessage("Success!");
            setType("success");
            setVisible(true);
        } else {
            setMessage("Error in LISP code");
            setType("error");
            setVisible(true);
        }
    }

    return(
        <React.Fragment>
            <Toolbar height={100}>
                <Item location={'before'}>
                    <h1>LISP Parenthesis Parser</h1>
                </Item>
            </Toolbar>
            <Form colCount={1} formData={lisp} labelLocation={'top'}>
                <SimpleItem dataField={'data'} 
                    label={{visible: false}} 
                    editorType={'dxTextArea'} 
                    editorOptions={{height: '60vh'}}
                    helpText={'Paste in code with correct LISP syntax'}
                />
                <ButtonItem
                    horizontalAlignment={'right'}
                    verticalAlignment={'bottom'}
                    buttonOptions={{text: 'Validate', type: 'default', onClick: validate}}
                />
            </Form>
            <Toast
                visible={visible}
                message={message}
                type={type}
                onHiding={() => setVisible(false)}
                displayTime={6000}
            />
        </React.Fragment>
    );
}

export default ParsePage;