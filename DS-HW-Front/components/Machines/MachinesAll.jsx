import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import MachineImage from '../shared/machines/MachineImages';
import { getMachineImage } from '../../api/machine';
import NoDataFound from '../shared/NoDataFound';
import { deleteMachineByidAction } from '@machineActions';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function AllMachinesList() {
    const dispatch = useDispatch();
    const router = useRouter();
    const machinesList = useSelector(state => state.machine.list);
    const isLoading = useSelector(state => state.machine.isLoadingList);

    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({
        fecha_calibracion_min: '',
        fecha_calibracion_max: '',
        expira_min: '',
        expira_max: '',
    });

    const deleteLogicMachine = (id) => {
        dispatch(deleteMachineByidAction(id));
    };

    useEffect(() => {
        const filtered = machinesList.filter((machine) => {
            const matchesSearch = (
                machine.id_maquina?.toLowerCase().includes(search.toLowerCase()) ||
                machine.nomMaquina?.toLowerCase().includes(search.toLowerCase()) ||
                machine.serial?.toLowerCase().includes(search.toLowerCase()) ||
                machine.proveedor?.toLowerCase().includes(search.toLowerCase())
            );

            const calibracionDate = dayjs(machine.last_calibration_date);
            const expiraDate = dayjs(machine.expira);

            const matchesFilters = (
                (!filters.fecha_calibracion_min || calibracionDate.isAfter(filters.fecha_calibracion_min)) &&
                (!filters.fecha_calibracion_max || calibracionDate.isBefore(filters.fecha_calibracion_max)) &&
                (!filters.expira_min || expiraDate.isAfter(filters.expira_min)) &&
                (!filters.expira_max || expiraDate.isBefore(filters.expira_max))
            );

            return matchesSearch && matchesFilters;
        });

        setFilteredData(filtered);
    }, [search, filters, machinesList]);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData.map(machine => ({
            'ID Máquina': machine.id_maquina,
            'Nombre': machine.nomMaquina,
            'Serial': machine.serial,
            'Proveedor': machine.proveedor,
            'Fecha Calibración': dayjs(machine.last_calibration_date).format("YYYY-MM-DD"),
            'Expira': dayjs(machine.expira).format("YYYY-MM-DD"),
            'Estatus': machine.status ? 'Activo' : 'Inactivo',
            'Seccion': machine.seccion,//apartado de seccion para exportat a excell
        })));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Máquinas");

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(file, 'maquinas.xlsx');
    };


    return ( 
    <div className="card p-4 shadow-sm border-0 rounded -4">
        <div class = "d-flex gap-2 mb-3">
            <button class ="btn btn-light rounded-pill px-4 py-2 shadow-sm" onclick="openTab(event, 'Interna')">Interna</button>
            <button class ="btn btn-light rounded-pill px-4 py-2 shadow-sm" onclick="openTab(event, 'Externa')">Externa</button>
        </div>
        <div className="card p-4 shadow-sm border-0 rounded -5">
            <div className='mb-3'>
                <input
                    type="text"
                    className='form-control mb-2'
                    placeholder='Buscar máquina, nombre, serial o proveedor...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                    <div className='d-flex flex-wrap justify-content-end align-items-end gap-3 mb-3'>

                        <div>
                            <label>Seccion</label>
                            <select
                                name = 'seccion'
                                className = 'form-control my 1'
                                value = {filters.seccion}
                                onChange = {(e) => setFilters({ ...filters, seccion: e.target.value})}>
                                <option value = "">Todas</option>
                                <option value = "seccion">Interna</option>
                                <option value = "seccion">Externa</option>
                            </select>
                        </div>

                        <div>
                            <label>Fecha Calibración Desde</label>
                            <input type="date" className="form-control" onChange={(e) => setFilters({ ...filters, fecha_calibracion_min: e.target.value })} />
                        </div>

                        <div>
                            <label>Fecha Calibración Hasta</label>
                            <input type="date" className="form-control" onChange={(e) => setFilters({ ...filters, fecha_calibracion_max: e.target.value })} />
                        </div>

                        <div>
                            <label>Expira Desde</label>
                            <input type="date" className="form-control" onChange={(e) => setFilters({ ...filters, expira_min: e.target.value })} />
                        </div>

                        <div>
                            <label>Expira Hasta</label>
                            <input type="date" className="form-control" onChange={(e) => setFilters({ ...filters, expira_max: e.target.value })} />
                        </div>

                        <div className='align-self-end'>
                            <button className="btn btn-success" onClick={exportToExcel}>
                                Exportar a Excel
                            </button>
                        </div>

                    </div>
            </div>

            {filteredData?.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th className='table-header'>Estatus</th>
                            <th className='table-header'>Id Maquina</th>
                            <th className='table-header'>Nombre Maquina</th>
                            <th className='table-header'>Serial</th>
                            <th className='table-header'>Proveedor</th>
                            <th className='table-header'>Fecha calibración</th>
                            <th className='table-header'>Expira</th>
                            <th className='table-header'>Foto equipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((data, index) => (
                            <tr key={index}>
                              <td>
                                    <span
                                        className={`badge ${data.status ? 'bg-success' : 'bg-danger'} px-4 py-2 fs-6 rounded-pill`}
                                    >
                                        {data.status ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>


                                <td onClick={() => router.push(`/machine/${data._id}`)} className='pointer'><u>{data?.id_maquina}</u></td>
                                <td>{data?.nomMaquina}</td>
                                <td>{data?.serial}</td>
                                <td>{data?.proveedor}</td>
                                <td className='text-left'>{dayjs(data?.last_calibration_date).format("DD MMM YYYY")}</td>
                                <td className='text-left'>{dayjs(data?.expira).format("DD MMM YYYY")}</td>
                                <td>
                                    <MachineImage
                                        alt={data.nomMaquina}
                                        getImage={getMachineImage}
                                        param={data?._id}
                                        status={!!data?.foto_equipo}
                                        width='150px'
                                        height='100px'
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <NoDataFound className="mt-5" />
            )}
    </div>   </div>
    );
}
