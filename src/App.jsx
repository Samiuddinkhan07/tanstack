import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Box } from "@chakra-ui/react";
import DATA from "./Data";
import EditableInput from "./EditableInput";

const columns = [
  {
    accessorKey: "task",
    header: "Task",
    cell: EditableInput,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => <p>{props.getValue()?.name}</p>,
  },
  {
    accessorKey: "due",
    header: "Due",
    cell: (props) => <p>{props.getValue()?.toLocaleTimeString()}</p>,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: (props) => <p>{props.getValue()}</p>,
  },
];


function App() {
  const [data, setData] = useState(DATA);

  console.log(data)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode:"onChange",
    meta:{
      updateData:(rowIndex,columnId,value) =>{
        setData(prev => 
          prev.map((row,index) =>
            index === rowIndex ? {
              ...prev[rowIndex],
              [columnId]:value
            } : row
          )
        )
      }
    }
  });

  // console.log(table.getHeaderGroups());
  return (
    <>
      <Box>
        <Box className="table" w={table.getTotalSize()}>
          {table.getHeaderGroups().map((headerGroup) => (
            <Box className="tr" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Box className="th" w={header.column.getSize()} key={header.id}>
                  {header.column.columnDef.header}
                  <Box 
                    onMouseDown={
                      header.getResizeHandler()
                    }
                    onTouchStart={
                      header.getResizeHandler()
                    }
                    className={
                      `resizer ${header.column.getIsResizing() ? "isResizing" : ""}`
                    }
                  />
                    
                </Box>
              ))}
            </Box>
          ))}
          {table.getRowModel().rows.map((row) => (
            <Box className="tr" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Box className="td"w={cell.column.getSize()} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default App;
