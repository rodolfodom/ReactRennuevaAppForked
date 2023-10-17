import { jsPDF } from 'jspdf';
import 'jspdf-autotable';


  const exampleData = [
    { id: 1, name: "John", age: 28 },
    { id: 2, name: "Anna", age: 22 },
    { id: 3, name: "Mike", age: 32 }
  ];

  const generatePdf = () => {
    const doc = new jsPDF();

    doc.autoTable({
      head: [['ID', 'Name', 'Age']],
      body: exampleData.map((data) => [data.id, data.name, data.age]),
    });

    doc.save('example_report.pdf');
  };
