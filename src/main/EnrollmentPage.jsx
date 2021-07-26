import React , { useState } from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import CSVReader from 'react-csv-reader';
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';
import { Button } from 'devextreme-react';

function EnrollmentPage() {
    const [users, setUsers] = useState([]);
    const [insurances, setInsurances] = useState([]);

    /**
     * Process the CSV file on the server. This method assumes the 
     * imported CSV file has a header row and will not include it
     * in the request.
     * 
     * @param {*} data upload CSV data in a nested array format
     */
    function handleLoad(data) {
        // remove the header row and ilter out empty spaces
        data.splice(0, 1);
        data = data.filter(s => s.length == 4);

        fetch('http://localhost:8080/enroll', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => processResult(result))
    }

    function handleError(error) {
        console.log(error);
    }

    /**
     * Process the results and export a CSV file for each insurance type
     * 
     * @param {*} result a nested array object consisting of customer
     * objects, separated by the insurance company
     */
    function processResult(result) {
        console.log(result)
        setInsurances(result);
    }

    function exportCSV(data) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Main');

        worksheet.columns = [
        { header: 'User ID', key: "id" },
        { header: 'First and Last Name', key: "firstAndLastName" },
        { header: 'Version', key: "version" },
        { header: 'Insurance Company', key: "insurance" },
        ];

        // Add Array Rows
        worksheet.addRows(data.customers);
        workbook.csv.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer], { type: 'application/octet-stream'}), data.insurance + '.csv')
        });
    }

    function renderExport(props) {
        return(
            <Button text={'Download CSV'} type={'normal'} onClick={() => exportCSV(props.data)}/>
        )
    }
    
    return(
        <React.Fragment>
            <Toolbar height={100}>
                <Item location={'before'}>
                    <h1>Upload Enrollment File</h1>
                </Item>
                <Item location={'after'}>
                    <CSVReader
                        cssClass="csv-reader-input"
                        label="Upload CSV"
                        onFileLoaded={handleLoad}
                        onError={handleError}
                    />
                </Item>
            </Toolbar>
            <DataGrid
                width={'100%'}
                height={'60vh'}
                noDataText={'No Entries found'}
                dataSource={insurances}
                showBorders={true}
                showColumnLines={false}
                showRowLines={true}
            >
                <Column dataField={'insurance'}/>
                <Column caption={''} width={150} cellRender={renderExport}/>
            </DataGrid>
        </React.Fragment>
    );
}

export default EnrollmentPage;