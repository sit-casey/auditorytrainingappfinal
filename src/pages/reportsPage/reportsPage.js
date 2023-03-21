import fakeData from "./MOCK_DATA.json";

import "./reportsPage2.module.css";
//import AuthContext from "../../components/store/auth-context";

import useFetch from "../../components/custHooks/useFetch";
//import { useContext, useEffect, useState } from "react";
import { useEffect, useState } from "react";
import React, { useMemo } from 'react';

import MaterialReactTable from 'material-react-table';


const date = new Date().toLocaleString('en-GB',{timeZone: 'EST'});
 //Retrieve user history

function ReportsPage() {

    const [[allActivitiesObj], isPending, err] = useFetch(fakeData);
    //setState to store retrieved data
    const [data, setData] = useState([]);

    useEffect(()=>{
        setData(data);
        console.log("DATA", data); //data somehow doesn't have anything, pulling from the void
    });
//TODO: Find how to access data in accessorKey, maybe dot notation but idk
    const columns = useMemo(
        () => [
        {
            accessorKey: "activity",
            header: 'ACTIVITY NAME',
            size: 100,
            muiTableHeadCellProps: {
            align: 'center',
            },
            muiTableBodyCellProps: {
            align: 'center',
            },
        },
        {
            accessorKey: 'date',
            header: 'DATE',
            size: 100,
            muiTableHeadCellProps: {
            align: 'center',
            },
            muiTableBodyCellProps: {
            align: 'center',
            },
        },
        {
            accessorKey: 'time',
            header: 'TIME',
            muiTableHeadCellProps: {
            align: 'right',
            },
            muiTableBodyCellProps: {
            align: 'right',
            },
        },
        {
            accessorKey: 'activity',
            header: 'ACTIVITY',
            muiTableHeadCellProps: {
            align: 'right',
            },
            muiTableBodyCellProps: {
            align: 'right',
            },
            Cell: ({ cell }) =>
            cell
                .getValue()
                .toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
        },
        {
            accessorKey: 'score',
            header: 'SCORE',
            muiTableHeadCellProps: {
            align: 'right',
            },
            muiTableBodyCellProps: {
            align: 'right',
            },
        },
        ],
        [],
    );

        return <MaterialReactTable columns={columns} data={data} />;
    };

export default ReportsPage;