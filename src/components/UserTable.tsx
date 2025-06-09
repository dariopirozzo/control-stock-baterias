import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TextField, MenuItem, IconButton,
  Box, Button, Accordion, AccordionSummary, AccordionDetails, Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

let nextId = 1;

type Guarantee = {
  id: string;
  apellido: string;
  nombre: string;
  telefono: string;
  producto: string;
  codigoProducto: string;
  marca: string;
  modelo: string;
  dominio: string;
  fechaCompra: string;
  fechaDelDia: string;
  observaciones: string;
  estado: string;
};

const estados = ['Activa', 'En revisión', 'Finalizado', 'Expirada'];
const initialRows: Guarantee[] = [];

const camposFiltro = [
  { label: 'Apellido', value: 'apellido' },
  { label: 'Nombre', value: 'nombre' },
  { label: 'Teléfono', value: 'telefono' },
  { label: 'Producto', value: 'producto' },
  { label: 'Código de Producto', value: 'codigoProducto' },
  { label: 'Estado', value: 'estado' },
  { label: 'Dominio', value: 'dominio' },
];

const estadoColors: Record<string, string> = {
  Activa: '#C8E6C9',
  'En revisión': '#FFF9C4',
  Expirada: '#FFCDD2',
  Finalizado: '#B3E5FC'
};

const requiredLabel = (label: string) => (
  <span>{label} <span style={{ color: 'red' }}>*</span></span>
);

const UserTable: React.FC = () => {
  const [rows, setRows] = useState(initialRows);
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Guarantee>>({});
  const [searchText, setSearchText] = useState('');
  const [filterField, setFilterField] = useState<string>('apellido');
  const [newGuarantee, setNewGuarantee] = useState<Partial<Guarantee>>({
    apellido: '',
    nombre: '',
    telefono: '',
    producto: '',
    codigoProducto: '',
    marca: '',
    modelo: '',
    dominio: '',
    fechaCompra: '',
    fechaDelDia: new Date().toISOString().split('T')[0],
    observaciones: '',
    estado: 'Activa'
  });

  // Estado que guarda cuál acordeón está abierto, el valor es el id del acordeón
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>('datosPersonales');

  const generateId = () => String(nextId++).padStart(4, '0');

  const handleEditClick = (row: Guarantee) => {
    setEditRowId(row.id);
    setEditData(row);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: name === 'estado' ? value : value.toUpperCase() });
  };

  const handleNewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewGuarantee({ ...newGuarantee, [name]: name === 'estado' ? value : value.toUpperCase() });
  };

  const handleSaveClick = () => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === editRowId ? { ...row, ...editData } as Guarantee : row
      )
    );
    setEditRowId(null);
    setEditData({});
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm('¿Estás seguro de que querés eliminar esta garantía?')) {
      setRows((prev) => prev.filter((row) => row.id !== id));
    }
  };

  const handleAddGuarantee = () => {
    const requiredFields = ['apellido', 'nombre', 'telefono', 'producto', 'codigoProducto', 'fechaCompra', 'marca', 'modelo', 'dominio'];
    for (const field of requiredFields) {
      if (!newGuarantee[field as keyof Guarantee]) {
        alert('Todos los campos son obligatorios');
        return;
      }
    }

    const newRow: Guarantee = {
      ...(newGuarantee as Guarantee),
      id: generateId(),
      fechaDelDia: new Date().toISOString().split('T')[0]
    };

    setRows((prev) => [...prev, newRow]);
    setNewGuarantee({
      apellido: '',
      nombre: '',
      telefono: '',
      producto: '',
      codigoProducto: '',
      marca: '',
      modelo: '',
      dominio: '',
      fechaCompra: '',
      fechaDelDia: new Date().toISOString().split('T')[0],
      observaciones: '',
      estado: 'Activa'
    });
  };

  const filteredRows = rows.filter(row => {
    const valorCampo = (row as any)[filterField];
    if (!valorCampo) return false;
    return valorCampo.toUpperCase().includes(searchText.toUpperCase());
  });

  // Función para manejar el cambio de acordeón abierto
  const handleAccordionChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  return (
    <Box>
      {/* Filtros */}
      <Box display="flex" gap={2} mb={2} alignItems="center">
        <TextField
          select
          label="Filtrar por"
          value={filterField}
          onChange={(e) => setFilterField(e.target.value)}
          size="small"
          sx={{ width: 180 }}
        >
          {camposFiltro.map(({ label, value }) => (
            <MenuItem key={value} value={value}>{label}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Buscar"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value.toUpperCase())}
          sx={{ flexGrow: 1 }}
        />
      </Box>

      {/* Formulario con acordeones controlados */}
      <Paper sx={{ mb: 2, p: 1 }}>
        <Accordion expanded={expandedAccordion === 'datosPersonales'} onChange={handleAccordionChange('datosPersonales')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>📋 Datos Personales</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              label={requiredLabel("Apellido")}
              name="apellido"
              value={newGuarantee.apellido}
              onChange={handleNewChange}
              size="small"
            />
            <TextField
              label={requiredLabel("Nombre")}
              name="nombre"
              value={newGuarantee.nombre}
              onChange={handleNewChange}
              size="small"
            />
            <TextField
              label={requiredLabel("Teléfono")}
              name="telefono"
              value={newGuarantee.telefono}
              onChange={handleNewChange}
              size="small"
            />
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expandedAccordion === 'productoCodigo'} onChange={handleAccordionChange('productoCodigo')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>🔧 Producto y Código</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              label={requiredLabel("Producto")}
              name="producto"
              value={newGuarantee.producto}
              onChange={handleNewChange}
              size="small"
            />
            <TextField
              label={requiredLabel("Código de Producto")}
              name="codigoProducto"
              value={newGuarantee.codigoProducto}
              onChange={handleNewChange}
              size="small"
            />
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expandedAccordion === 'datosVehiculo'} onChange={handleAccordionChange('datosVehiculo')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>🚗 Datos del Vehículo</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              label={requiredLabel("Marca")}
              name="marca"
              value={newGuarantee.marca}
              onChange={handleNewChange}
              size="small"
            />
            <TextField
              label={requiredLabel("Modelo")}
              name="modelo"
              value={newGuarantee.modelo}
              onChange={handleNewChange}
              size="small"
            />
            <TextField
              label={requiredLabel("Dominio")}
              name="dominio"
              value={newGuarantee.dominio}
              onChange={handleNewChange}
              size="small"
            />
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expandedAccordion === 'detallesAdicionales'} onChange={handleAccordionChange('detallesAdicionales')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>📝 Detalles Adicionales</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              label={requiredLabel("Fecha de Compra")}
              name="fechaCompra"
              type="date"
              value={newGuarantee.fechaCompra}
              onChange={handleNewChange}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Observaciones"
              name="observaciones"
              value={newGuarantee.observaciones}
              onChange={handleNewChange}
              size="small"
              multiline
              rows={3}
              sx={{ minWidth: 400 }}
            />
            <TextField
              select
              label="Estado"
              name="estado"
              value={newGuarantee.estado}
              onChange={handleNewChange}
              size="small"
              sx={{ minWidth: 120 }}
            >
              {estados.map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
            </TextField>
            <Button variant="contained" onClick={handleAddGuarantee}>Agregar</Button>
          </AccordionDetails>
        </Accordion>
      </Paper>

      {/* Tabla de garantías */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Dominio</TableCell>
              <TableCell>Fecha Compra</TableCell>
              <TableCell>Fecha Registro</TableCell>
              <TableCell>Observaciones</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map(row => (
              <TableRow key={row.id}>
                {editRowId === row.id ? (
                  <>
                    <TableCell>{row.id}</TableCell>
                    <TableCell><TextField name="apellido" value={editData.apellido} onChange={handleInputChange} size="small" /></TableCell>
                    <TableCell><TextField name="nombre" value={editData.nombre} onChange={handleInputChange} size="small" /></TableCell>
                    <TableCell><TextField name="telefono" value={editData.telefono} onChange={handleInputChange} size="small" /></TableCell>
                    <TableCell><TextField name="producto" value={editData.producto} onChange={handleInputChange} size="small" /></TableCell>
                    <TableCell><TextField name="codigoProducto" value={editData.codigoProducto} onChange={handleInputChange} size="small" /></TableCell>
                    <TableCell><TextField name="marca" value={editData.marca} onChange={handleInputChange} size="small" /></TableCell>
                    <TableCell><TextField name="modelo" value={editData.modelo} onChange={handleInputChange} size="small" /></TableCell>
                    <TableCell><TextField name="dominio" value={editData.dominio} onChange={handleInputChange} size="small" /></TableCell>
                    <TableCell><TextField name="fechaCompra" type="date" value={editData.fechaCompra} onChange={handleInputChange} size="small" /></TableCell>
                    <TableCell>{row.fechaDelDia}</TableCell>
                    <TableCell><TextField name="observaciones" value={editData.observaciones} onChange={handleInputChange} size="small" multiline rows={3} /></TableCell>
                    <TableCell>
                      <TextField select name="estado" value={editData.estado || estados[0]} onChange={handleInputChange} size="small">
                        {estados.map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={handleSaveClick}><SaveIcon sx={{ color: '#2e7d32' }} /></IconButton>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.apellido}</TableCell>
                    <TableCell>{row.nombre}</TableCell>
                    <TableCell>{row.telefono}</TableCell>
                    <TableCell>{row.producto}</TableCell>
                    <TableCell>{row.codigoProducto}</TableCell>
                    <TableCell>{row.marca}</TableCell>
                    <TableCell>{row.modelo}</TableCell>
                    <TableCell>{row.dominio}</TableCell>
                    <TableCell>{row.fechaCompra}</TableCell>
                    <TableCell>{row.fechaDelDia}</TableCell>
                    <TableCell>{row.observaciones}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          bgcolor: estadoColors[row.estado] || 'transparent',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          textAlign: 'center',
                          fontWeight: 'bold'
                        }}
                      >
                        {row.estado}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditClick(row)}><EditIcon sx={{ color: '#1976d2' }} /></IconButton>
                      <IconButton onClick={() => handleDeleteClick(row.id)}><DeleteIcon sx={{ color: '#d32f2f' }} /></IconButton>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserTable;
