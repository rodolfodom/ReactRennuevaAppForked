// Excel.js
import React, {useState} from "react";
import axios from "axios";
import * as XLSX from 'xlsx';

const generateExcel = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/get-all-donors-recollection/`)
      .then((response) => {
        const data = response.data.ordenes;
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Ordenes");
        XLSX.writeFile(workbook, "Ordenes.xlsx");
      })
      .catch((error) => {
        console.error(error);
      });
};


export { generateExcel };
