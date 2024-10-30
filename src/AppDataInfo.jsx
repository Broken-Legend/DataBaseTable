import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function NestedGrid({ id }) {
  const [showID, setShowID] = React.useState(id);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (id !== showID) {
      setShowID(id);
    }
  }, [id]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (showID) {
        try {
          const response = await axios.get(
            `http://localhost:3000/ID?id=${showID}`
          );
          setData(response.data);
          console.table("data", response.data, showID, id);
        } catch (error) {
          console.error("Failed to fetch", error.message);
          res.status(500).send("Failed to fetch");
        }
      }
    };
    if (showID) {
      fetchData();
    }
  }, [showID]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          <Item>
            <Box align="left" id="category-a" sx={{ fontSize: "18px" }}>
              Operador de Verificação:
              {data.length > 0 && data[0].Operador_verificacao}
            </Box>
            <Box
              align="left"
              component="ul"
              aria-labelledby="category-a"
              sx={{ pl: 2 }}
            >
              Observações: {data.length > 0 && data[0].Observacoes}
            </Box>
          </Item>
        </Grid>
        <Grid container spacing={1} size={{ xs: 12, md: 7, lg: 8 }}>
          <Grid size={{ xs: 6, lg: 3 }}>
            <Item>
              <Box align="left" id="category-a" sx={{ fontSize: "18px" }}>
                Estado:
              </Box>
              <Box
                align="left"
                component="ul"
                aria-labelledby="category-a"
                sx={{ pl: 2 }}
              >
                Disponibilidade: {data.length > 0 && data[0].Disponibilidade}
              </Box>
            </Item>
          </Grid>
          <Grid size={{ xs: 6, lg: 3 }}>
            <Item>
              <Box
                id="category-b"
                sx={{ fontSize: "18px", textTransform: "uppercase" }}
              >
                Última Calibração
              </Box>
              <Box
                align="left"
                component="ul"
                aria-labelledby="category-b"
                sx={{ pl: 2 }}
              >
                <li>
                  TipoÚltimaCalibração:{" "}
                  {data.length > 0 && data[0].TipoUltimaCalibracao}
                </li>
                <li>
                  DataÚltimaCalibração:{" "}
                  {data.length > 0 && data[0].DataUltimaCalibracao}
                </li>
                <li>
                  EntidadeÚltimaCalibração:{" "}
                  {data.length > 0 && data[0].EntidadeUltimaCalibracao}
                </li>
                <li>
                  CertificadoÚltimaCalibração:{" "}
                  {data.length > 0 && data[0].CertificadoUltimaCalibracao}
                </li>
              </Box>
            </Item>
          </Grid>
          <Grid size={{ xs: 6, lg: 3 }}>
            <Item>
              <Box
                id="category-c"
                sx={{ fontSize: "18px", textTransform: "uppercase" }}
              >
                Próxima Calibração
              </Box>
              <Box
                align="left"
                component="ul"
                aria-labelledby="category-c"
                sx={{ pl: 2 }}
              >
                <li>
                  Periódo de Calibração:{" "}
                  {data.length > 0 && data[0].PeriodoCalibracao}
                </li>
                <li>
                  DataPróximaCalibração:{" "}
                  {data.length > 0 && data[0].DataProximaCalibracao}
                </li>
                <li>
                  TipoCalibração: {data.length > 0 && data[0].TipoCalibracao}
                </li>
              </Box>
            </Item>
          </Grid>
          <Grid size={{ xs: 6, lg: 3 }}>
            <Item>
              <Box
                id="category-d"
                sx={{ fontSize: "18px", textTransform: "uppercase" }}
              >
                Métricas
              </Box>
              <Box
                align="left"
                component="ul"
                aria-labelledby="category-d"
                sx={{ pl: 2 }}
              >
                <li>k: {data.length > 0 && data[0].k}</li>
                <li>Capex: {data.length > 0 && data[0].Capex}</li>
                <li>
                  Tolerância: {data.length > 0 && data[0].ToleranciaProcesso}
                </li>
                <li>TolProcUnits: {data.length > 0 && data[0].TolProcUnits}</li>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
