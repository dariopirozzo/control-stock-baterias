// src/components/UserTable.tsx
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TextField, MenuItem, IconButton, Box, Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

type Guarantee = {
  id: number;
  apellido: string;
  nombre: string;
  telefono: string;
  producto: string;
  codigoProducto: string;
  fechaCompra: string;
  fechaDelDia: string;
  observaciones: string;
  estado: string;
};

const estados = ['Activa', 'Expirada', 'En revisión'];
const initialRows: Guarantee[] = [];

const camposFiltro = [
  { label: 'Apellido', value: 'apellido' },
  { label: 'Nombre', value: 'nombre' },
  { label: 'Teléfono', value: 'telefono' },
  { label: 'Producto', value: 'producto' },
  { label: 'Código de Producto', value: 'codigoProducto' },
  { label: 'Estado', value: 'estado' },
];

const UserTable: React.FC = () => {
  const [rows, setRows] = useState(initialRows);
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Guarantee>>({});
  const [searchText, setSearchText] = useState('');
  const [filterField, setFilterField] = useState<string>('apellido');
  const [newGuarantee, setNewGuarantee] = useState<Partial<Guarantee>>({
    apellido: '',
    nombre: '',
    telefono: '',
    producto: '',
    codigoProducto: '',
    fechaCompra: '',
    fechaDelDia: new Date().toISOString().split('T')[0],
    observaciones: '',
    estado: 'Activa'
  });

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
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === editRowId ? { ...row, ...editData } : row
      )
    );
    setEditRowId(null);
    setEditData({});
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm('¿Estás seguro de que querés eliminar esta garantía?')) {
      setRows((prev) => prev.filter((row) => row.id !== id));
    }
  };

  const handleAddGuarantee = () => {
    const requiredFields = ['apellido', 'nombre', 'telefono', 'producto', 'codigoProducto', 'fechaCompra'];
    for (const field of requiredFields) {
      if (!newGuarantee[field as keyof Guarantee]) {
        alert('Todos los campos son obligatorios');
        return;
      }
    }

    const newRow: Guarantee = {
      ...(newGuarantee as Guarantee),
      id: Date.now(),
      fechaDelDia: new Date().toISOString().split('T')[0]
    };

    setRows((prev) => [...prev, newRow]);
    setNewGuarantee({
      apellido: '',
      nombre: '',
      telefono: '',
      producto: '',
      codigoProducto: '',
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

  const getEstadoStyle = (estado: string) => {
    switch (estado) {
      case 'Activa':
        return { backgroundColor: 'green', color: 'white' };
      case 'Expirada':
        return { backgroundColor: 'red', color: 'white' };
      case 'En revisión':
        return { backgroundColor: 'yellow', color: 'black' };
      default:
        return {};
    }
  };

  return (
    <Box>
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

      <Box
        display="flex"
        gap={2}
        p={2}
        component={Paper}
        alignItems="flex-start"
        flexWrap="wrap"
        mb={2}
      >
        <TextField label="Apellido" name="apellido" value={newGuarantee.apellido} onChange={handleNewChange} size="small" />
        <TextField label="Nombre" name="nombre" value={newGuarantee.nombre} onChange={handleNewChange} size="small" />
        <TextField label="Teléfono" name="telefono" value={newGuarantee.telefono} onChange={handleNewChange} size="small" />
        <TextField label="Producto" name="producto" value={newGuarantee.producto} onChange={handleNewChange} size="small" />
        <TextField label="Código de Producto" name="codigoProducto" value={newGuarantee.codigoProducto} onChange={handleNewChange} size="small" />
        <TextField label="Fecha de Compra" name="fechaCompra" type="date" value={newGuarantee.fechaCompra} onChange={handleNewChange} size="small" InputLabelProps={{ shrink: true }} />
        <TextField
          label="Observaciones"
          name="observaciones"
          value={newGuarantee.observaciones}
          onChange={handleNewChange}
          size="small"
          multiline
          rows={3}
          sx={{ minWidth: 200 }}
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
          {estados.map((estado) => (
            <MenuItem key={estado} value={estado}>{estado}</MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={handleAddGuarantee}>Agregar</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Apellido</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Fecha Compra</TableCell>
              <TableCell>Fecha Registro</TableCell>
              <TableCell>Observaciones</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                {editRowId === row.id ? (
                  <>
                    <TableCell><TextField name="apellido" value={editData.apellido} onChange={handleInputChange} size="small" /></TableCell>
                    <TableCell><TextField name="nombre" value={editData.nombre} onChange={handleInputChange} size="small" /></TableCell>
                    <TableCell><TextField name="telefono" value={editData.telefono} onChange={handleInputChange} size="small" /></TableCell>
                    <TableCell><TextField name="producto" value={editData.producto} onChange={handleInputChange} size="small" /></TableCell>
                    <TableCell><TextField name="codigoProducto" value={editData.codigoProducto} onChange={handleInputChange} size="small" /></TableCell>
                    <TableCell><TextField name="fechaCompra" type="date" value={editData.fechaCompra} onChange={handleInputChange} size="small" /></TableCell>
                    <TableCell>{row.fechaDelDia}</TableCell>
                    <TableCell>
                      <TextField
                        name="observaciones"
                        value={editData.observaciones}
                        onChange={handleInputChange}
                        size="small"
                        multiline
                        rows={3}
                        sx={{ minWidth: 200 }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        select
                        name="estado"
                        value={editData.estado || estados[0]}
                        onChange={handleInputChange}
                        size="small"
                        sx={{ minWidth: 120 }}
                      >
                        {estados.map((estado) => (
                          <MenuItem key={estado} value={estado}>{estado}</MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={handleSaveClick}><SaveIcon sx={{ color: '#2e7d32' }} /></IconButton>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{row.apellido}</TableCell>
                    <TableCell>{row.nombre}</TableCell>
                    <TableCell>{row.telefono}</TableCell>
                    <TableCell>{row.producto}</TableCell>
                    <TableCell>{row.codigoProducto}</TableCell>
                    <TableCell>{row.fechaCompra}</TableCell>
                    <TableCell>{row.fechaDelDia}</TableCell>
                    <TableCell>{row.observaciones}</TableCell>
                    <TableCell sx={{ ...getEstadoStyle(row.estado), fontWeight: 'bold', textAlign: 'center' }}>
                      {row.estado}
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
