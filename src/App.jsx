import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export default function BasicTable() {

    const [meusDados, setMeusDados] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('http://localhost:3000/');
                //console.log(response.data);
                setMeusDados(response.data);
            }   catch (error) {
                console.error("Failed to fetch", error.message);
                res.status(500).send("Failed to fetch");
            }
        };
        fetchData();
    }, []);

    React.useEffect(() => {
        console.log(meusDados);
    }, [meusDados]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
         <TableHead>
          <TableRow>
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
          </Box>
            <TableCell>ID</TableCell>
            <TableCell align="right">FamiliaEmms</TableCell>
            <TableCell align="right">Tipo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meusDados.map((row) => (
            <TableRow
              key={row.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ID}
              </TableCell>
              <TableCell align="right">{row.FamiliaEmms}</TableCell>
              <TableCell align="right">{row.Tipo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}