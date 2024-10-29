import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

export default function SingleSelectTable() {
  const [selected, setSelected] = React.useState(null); // Single selection state
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [meusDados, setMeusDados] = React.useState([]);
  const [familiaEmms, setFamiliaEmms] = React.useState([]);
  const [marca, setMarca] = React.useState([]);
  const [operador, setOperador] = React.useState([]);
  const [valueChosenFamilia, setValueChosenFamilia] = React.useState("");
  const [valueChosenMarca, setValueChosenMarca] = React.useState("");
  const [valueChosenOperador, setValueChosenOperador] = React.useState("");

  //AXIOS SEND
  const handleChangeOp = async (event) => {
    console.log(event.target.value);
    setValueChosenOperador(event.target.value);
    // Send the selected value to the backend using axios
    const tableResult = await axios.get(
      `http://localhost:3000/data?Operador=${event.target.value}&FamiliaEmms=${valueChosenFamilia}&Marca=${valueChosenMarca}`
    );
    const selectResult1 = await axios.get(
      `http://localhost:3000/marca?Operador=${event.target.value}&FamiliaEmms=${valueChosenFamilia}&Marca=${valueChosenMarca}`
    );
    const selectResult2 = await axios.get(
      `http://localhost:3000/familiaEmms?Operador=${event.target.value}&FamiliaEmms=${valueChosenFamilia}&Marca=${valueChosenMarca}`
    );
    console.log("Server response:", tableResult.data); // Handle success
    console.log("Server response:", selectResult1.data); // Handle success
    console.log("Server response:", selectResult2.data); // Handle success
    setMeusDados(tableResult.data); // Receive data back from backend
    setMarca(selectResult1.data);
    setFamiliaEmms(selectResult2.data);
  };

  const handleChangeMarca = async (event) => {
    console.log(event.target.value);
    setValueChosenMarca(event.target.value);
    const tableResult = await axios.get(
      `http://localhost:3000/data?Marca=${event.target.value}&FamiliaEmms=${valueChosenFamilia}&Operador=${valueChosenOperador}`
    );
    const selectResult1 = await axios.get(
      `http://localhost:3000/familiaEmms?Marca=${event.target.value}&FamiliaEmms=${valueChosenFamilia}&Operador=${valueChosenOperador}`
    );
    const selectResult2 = await axios.get(
      `http://localhost:3000/operador?Marca=${event.target.value}&FamiliaEmms=${valueChosenFamilia}&Operador=${valueChosenOperador}`
    );
    console.log("Server response:", tableResult.data); // Handle success
    console.log("Server response:", selectResult1.data); // Handle success
    console.log("Server response:", selectResult2.data); // Handle success
    setMeusDados(tableResult.data); // Receive data back from backend
    setFamiliaEmms(selectResult1.data);
    setOperador(selectResult2.data);
  };

  const handleChangeFamilia = async (event) => {
    console.log(event.target.value);
    setValueChosenFamilia(event.target.value);
    const tableResult = await axios.get(
      `http://localhost:3000/data?FamiliaEmms=${event.target.value}&Operador=${valueChosenOperador}&Marca=${valueChosenMarca}`
    );
    const selectResult1 = await axios.get(
      `http://localhost:3000/marca?FamiliaEmms=${event.target.value}&Operador=${valueChosenOperador}&Marca=${valueChosenMarca}`
    );
    const selectResult2 = await axios.get(
      `http://localhost:3000/operador?FamiliaEmms=${event.target.value}&Operador=${valueChosenOperador}&Marca=${valueChosenMarca}`
    );
    console.log("Server response:", tableResult.data); // Handle success
    console.log("Server response:", selectResult1.data); // Handle success
    console.log("Server response:", selectResult2.data); // Handle success
    setMeusDados(tableResult.data); // Receive data back from backend
    setMarca(selectResult1.data);
    setOperador(selectResult2.data);
  };

  const handleChangeCode = async (event) => {
    console.log(event.target.value);
    const result = await axios.get(
      `http://localhost:3000/data?CodigoInterno=${event.target.value}`
    );
    console.log("Server response:", result.data); // Handle success
    setMeusDados(result.data); // Receive data back from backend
  };

  // AXIOS RECEIVE
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/data");
        setMeusDados(response.data);
      } catch (error) {
        console.error("Failed to fetch", error.message);
        res.status(500).send("Failed to fetch");
      }
    };
    fetchData();
    const fetchFamiliaEmms = async () => {
      try {
        const response2 = await axios.get(`http://localhost:3000/familiaEmms`);
        setFamiliaEmms(response2.data);
      } catch (error) {
        console.error("Failed to fetch", error.message);
        res.status(500).send("Failed to fetch");
      }
    };
    fetchFamiliaEmms();
    const fetchMarca = async () => {
      try {
        const response3 = await axios.get(`http://localhost:3000/marca`);
        setMarca(response3.data);
      } catch (error) {
        console.error("Failed to fetch", error.message);
        res.status(500).send("Failed to fetch");
      }
    };
    fetchMarca();
    const fetchOperador = async () => {
      try {
        const response4 = await axios.get(`http://localhost:3000/operador`);
        setOperador(response4.data);
      } catch (error) {
        console.error("Failed to fetch", error.message);
        res.status(500).send("Failed to fetch");
      }
    };
    fetchOperador();
  }, []);

  const handleClick = (event, id) => {
    setSelected(selected === id ? null : id); // Select or deselect the clicked row
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - meusDados.length) : 0;
  const visibleRows = meusDados.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-label="single select table">
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>
                  <Box
                    align="left"
                    component="form"
                    sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-basic"
                      label="CodigoInterno"
                      variant="outlined"
                      onChange={handleChangeCode}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    component="form"
                    sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                    noValidate
                    autoComplete="off"
                  >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        FamiliaEmms
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={valueChosenFamilia}
                        label="FamiliaEmms"
                        key="FamiliaEmms"
                        name="valueChosenFamilia"
                        onChange={handleChangeFamilia}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {familiaEmms.map((row) => (
                          <MenuItem key={row.ID} value={row.FamiliaEmms}>
                            {row.FamiliaEmms}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    component="form"
                    sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                    noValidate
                    autoComplete="off"
                  >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Marca
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="valueChosenMarca"
                        value={valueChosenMarca}
                        label="Marca"
                        key="Marca"
                        onChange={handleChangeMarca}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {marca.map((row) => (
                          <MenuItem key={row.ID} value={row.Marca}>
                            {row.Marca}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </TableCell>
                <TableCell>NSerie</TableCell>
                <TableCell>
                  <Box
                    component="form"
                    sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                    noValidate
                    autoComplete="off"
                  >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Operador
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="valueChosenOperador"
                        value={valueChosenOperador}
                        label="Operador"
                        key="Operador"
                        onChange={handleChangeOp}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {operador.map((row) => (
                          <MenuItem key={row.ID} value={row.Operador}>
                            {row.Operador}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected === row.ID; // Only one selected

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.ID)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} color="primary" />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.CodigoInterno}
                    </TableCell>
                    <TableCell>{row.Designacao}</TableCell>
                    <TableCell>{row.Marca}</TableCell>
                    <TableCell>{row.NSerie}</TableCell>
                    <TableCell>{row.Operador}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={meusDados.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
