import React, { useState } from "react"
import Toolbar, { Item } from 'devextreme-react/toolbar';
import { Toast } from 'devextreme-react/toast';
import Form , { ButtonItem, GroupItem, SimpleItem } from "devextreme-react/form";

function DemoPage() {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('info');
    const [user, setUser] = useState({});

    function register(e) {
        e.preventDefault();
        console.log(JSON.stringify(user));
        fetch('http://localhost:8080/register', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(user)
        })
        .then(response => response.text())
        .then(result => notify(result))
    }

    function notify(result) {
        if(result){
            setMessage("User has been registered!");
            setType("success");
            setVisible(true);
        } else {
            setMessage("Unable to register new user.");
            setType("error");
            setVisible(true);
        }
    }   

    return(
        <React.Fragment>
            <Toolbar height={100}>
                <Item location={'before'}>
                    <h1>Register</h1>
                </Item>
            </Toolbar>
            <form onSubmit={register}>
            <Form colCount={2} formData={user}>
                <GroupItem>
                    <GroupItem caption={'Personal information'}>
                        <SimpleItem dataField={'firstName'} isRequired={true}/>
                        <SimpleItem dataField={'lastName'} isRequired={true}/>
                        <SimpleItem dataField={'npiNumber'} isRequired={true}/>
                    </GroupItem>
                    <GroupItem caption={'Contact Information'} isRequired={true}>
                        <SimpleItem dataField={'telephoneNumber'} isRequired={true}/>
                        <SimpleItem dataField={'email'} isRequired={true}/>
                    </GroupItem>
                </GroupItem>
                <GroupItem caption={'Address'}>
                    <SimpleItem dataField={'address1'} isRequired={true}/>
                    <SimpleItem dataField={'address2'}/>
                    <SimpleItem dataField={'city'} isRequired={true}/>
                    <SimpleItem dataField={'state'} editorType={'dxSelectBox'} editorOptions={{items: ['FL']}} isRequired={true}/>
                    <SimpleItem dataField={'zipCode'} isRequired={true}/>
                    <SimpleItem dataField={'country'} editorType={'dxSelectBox'} editorOptions={{items: ['USA']}} isRequired={true}/>
                </GroupItem>
                <GroupItem></GroupItem>
                <GroupItem colCount={1}>
                    <ButtonItem
                        horizontalAlignment={'right'}
                        verticalAlignment={'bottom'}
                        buttonOptions={{text: 'Register', type: 'default', useSubmitBehavior: true}}
                    />
                </GroupItem>
            </Form>
            </form>
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

export default DemoPage;