import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import FileUploadForm from './screen/VendorManagement/FileUploadForm';
import ImageUpload from './screen/VendorManagement/FileUploadForm';
import VesselForm from './screen/VendorManagement/VessalTable';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import 'devextreme/dist/css/dx.light.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'devextreme/dist/css/dx.material.blue.light.compact.css';
// import './assets/scss/style.scss'
import './assets/scss/themes/font/_feather.scss'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
    {/* <VesselForm /> */}
    {/* <FileUploadForm/> */}
    {/* <ImageUpload/> */}
  </>
);
