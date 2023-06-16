import React, {useState} from 'react';
import {View, Text, TouchableOpacity, PermissionsAndroid} from 'react-native';
var RNFS = require('react-native-fs');
import XLSX, {writeFile} from 'xlsx';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  // function to handle exporting
  const exportDataToExcel = () => {
    let sample_data_to_export = [
      {id: '1', name: 'First User'},
      {id: '2', name: 'Second User'},
    ];

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sample_data_to_export);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

    // Write generated excel to Storage
    RNFS.writeFile(
      RNFS.DownloadDirectoryPath + '/my_exported_file.xlsx',
      wbout,
      'ascii',
    )
      .then(r => {
        console.log('Success');
      })
      .catch(e => {
        console.log('Error', e);
      });
  };

  const handleClick = async () => {
    try {
      // Check for Permission (check if permission is already given or not)
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (!isPermitedExternalStorage) {
        // Ask for permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage permission needed',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted (calling our exportDataToExcel function)
          exportDataToExcel();
          console.log('Permission granted');
        } else {
          // Permission denied
          console.log('Permission denied');
        }
      } else {
        // Already have Permission (calling our exportDataToExcel function)
        exportDataToExcel();
      }
    } catch (e) {
      console.log('Error while checking permission');
      console.log(e);
      return;
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <Table />
      <TouchableOpacity
        onPress={() => handleClick()}
        style={{
          width: '50%',
          paddingVertical: 10,
          paddingHorizontal: 15,
          backgroundColor: 'blue',
          marginVertical: 20,
        }}>
        <Text style={{textAlign: 'center', color: 'white'}}>
          Export to Excel
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Table = () => {
  const data = [
    {a: '', b: '', c: '', d: '', e: ''},
    {a: '', b: '', c: '', d: '', e: ''},
    {a: '', b: '', c: '', d: '', e: ''},
    {a: '', b: '', c: '', d: '', e: ''},
    {a: '', b: '', c: '', d: '', e: ''},
    {a: '', b: '', c: '', d: '', e: ''},
    {a: '', b: '', c: '', d: '', e: ''},
    {a: '', b: '', c: '', d: '', e: ''},
    {a: '', b: '', c: '', d: '', e: ''},
    {a: '', b: '', c: '', d: '', e: ''},
  ];

  const [tableData, setTableData] = useState(data);

  return (
    <div>
      <div>
        <TableRow row={0} tableData={tableData} setTableData={setTableData} />
        <TableRow row={1} tableData={tableData} setTableData={setTableData} />
        <TableRow row={2} tableData={tableData} setTableData={setTableData} />
        <TableRow row={3} tableData={tableData} setTableData={setTableData} />
        <TableRow row={4} tableData={tableData} setTableData={setTableData} />
        <TableRow row={5} tableData={tableData} setTableData={setTableData} />
        <TableRow row={6} tableData={tableData} setTableData={setTableData} />
        <TableRow row={7} tableData={tableData} setTableData={setTableData} />
        <TableRow row={8} tableData={tableData} setTableData={setTableData} />
        <TableRow row={9} tableData={tableData} setTableData={setTableData} />
      </div>
    </div>
  );
};

const TableRow = ({row, tableData, setTableData}) => {
  const [rowData, setRowData] = useState({a: '', b: '', c: '', d: '', e: ''});

  useState(() => {
    let copiedTableData = tableData;
    copiedTableData[row] = rowData;
    setTableData(copiedTableData);
  }, [rowData]);

  return (
    <div style={{display: 'flex'}}>
      <InputCell
        name="a"
        id="a"
        col="a"
        rowData={rowData}
        setRowData={setRowData}
      />
      <InputCell
        name="b"
        id="b"
        col="b"
        rowData={rowData}
        setRowData={setRowData}
      />
      <InputCell
        name="c"
        id="c"
        col="c"
        rowData={rowData}
        setRowData={setRowData}
      />
      <InputCell
        name="d"
        id="d"
        col="d"
        rowData={rowData}
        setRowData={setRowData}
      />
      <InputCell
        name="e"
        id="e"
        col="e"
        rowData={rowData}
        setRowData={setRowData}
      />
    </div>
  );
};

const InputCell = ({name, id, col, rowData, setRowData}) => {
  function updateCell(val) {
    let copiedData = {...rowData};
    copiedData[col] = val;
    setRowData(copiedData);
  }
  return (
    <input
      type="text"
      name={name}
      id={id}
      onChange={e => {
        updateCell(e.target.value);
      }}
    />
  );
};

export default App;
