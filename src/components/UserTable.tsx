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
  cliente: string;
  producto: string;
  fechaVenta: string;
  fechaGarantia: string;
  estado: string;
};

const estados = ['Activa', 'Expirada', 'En revisión'];

const initialRows: Guarantee[] = [];

const UserTable: React.FC = () => {
  const [rows, setRows] = useState(initialRows);
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Guarantee>>({});
  const [newGuarantee, setNewGuarantee] = useState<Partial<Guarantee>>({
    cliente: '',
    producto: '',
    fechaVenta: '',
    fechaGarantia: '',
    estado: 'Activa'
  });

  const handleEditClick = (row: Guarantee) => {
    setEditRowId(row.id);
    setEditData(row);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
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

  const handleNewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGuarantee({ ...newGuarantee, [e.target.name]: e.target.value });
  };

  const handleAddGuarantee = () => {
    if (
      !newGuarantee.cliente ||
      !newGuarantee.producto ||
      !newGuarantee.fechaVenta ||
      !newGuarantee.fechaGarantia
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const newRow: Guarantee = {
      ...(newGuarantee as Guarantee),
      id: Date.now()
    };

    setRows((prev) => [...prev, newRow]);
    setNewGuarantee({
      cliente: '',
      producto: '',
      fechaVenta: '',
      fechaGarantia: '',
      estado: 'Activa'
    });
  };

  return (
    <Box>
      {/* Formulario para nueva garantía */}
      <Box
        display="flex"
        gap={2}
        p={2}
        component={Paper}
        alignItems="center"
        flexWrap="wrap"
        mb={2}
      >
        <TextField
          label="Cliente"
          name="cliente"
          value={newGuarantee.cliente}
          onChange={handleNewChange}
          size="small"
        />
        <TextField
          label="Producto"
          name="producto"
          value={newGuarantee.producto}
          onChange={handleNewChange}
          size="small"
        />
        <TextField
          label="Fecha Venta"
          name="fechaVenta"
          type="date"
          value={newGuarantee.fechaVenta}
          onChange={handleNewChange}
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Fecha Garantía"
          name="fechaGarantia"
          type="date"
          value={newGuarantee.fechaGarantia}
          onChange={handleNewChange}
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          select
          label="Estado"
          name="estado"
          value={newGuarantee.estado}
          onChange={handleNewChange}
          size="small"
        >
          {estados.map((estado) => (
            <MenuItem key={estado} value={estado}>
              {estado}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={handleAddGuarantee}>
          Agregar
        </Button>
      </Box>

      {/* Tabla de garantías */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Fecha Venta</TableCell>
              <TableCell>Fecha Garantía</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {editRowId === row.id ? (
                  <>
                    <TableCell>
                      <TextField
                        name="cliente"
                        value={editData.cliente}
                        onChange={handleInputChange}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="producto"
                        value={editData.producto}
                        onChange={handleInputChange}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="fechaVenta"
                        type="date"
                        value={editData.fechaVenta}
                        onChange={handleInputChange}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="fechaGarantia"
                        type="date"
                        value={editData.fechaGarantia}
                        onChange={handleInputChange}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        select
                        name="estado"
                        value={editData.estado}
                        onChange={handleInputChange}
                        size="small"
                      >
                        {estados.map((estado) => (
                          <MenuItem key={estado} value={estado}>
                            {estado}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={handleSaveClick}>
                        <SaveIcon sx={{ color: '#2e7d32' }} />
                      </IconButton>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{row.cliente}</TableCell>
                    <TableCell>{row.producto}</TableCell>
                    <TableCell>{row.fechaVenta}</TableCell>
                    <TableCell>{row.fechaGarantia}</TableCell>
                    <TableCell>{row.estado}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditClick(row)}>
                        <EditIcon sx={{ color: '#1976d2' }} />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(row.id)}>
                        <DeleteIcon sx={{ color: '#d32f2f' }} />
                      </IconButton>
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
