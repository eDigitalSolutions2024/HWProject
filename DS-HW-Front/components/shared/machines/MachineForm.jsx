import React from 'react';
import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc')
//Redux
import ToolTip from '../../shared/ToolTip'
import { useDispatch, useSelector } from 'react-redux';
import Required from '../../shared/Required'
//form
import { useForm } from "react-hook-form";
//actions
import { createMachineAction } from '@machineActions';
import { getMachineListApi } from '@Api/machine';

const MachineForm = (props) => {
    dayjs.extend(utc)
    const { setShow } = props;
    const dispatch = useDispatch();
    const { register, setError, formState: { errors }, handleSubmit } = useForm();


    
    const checkDuplicate = async (field, value) => {
        const res = await fetch('http://localhost:8010/machineCalibration/check-duplicate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ field, value })
        });
    
        if (!res.ok) {
            console.error("❌ Duplicate check request failed:", res.status);
            return false;
        }
    
        const result = await res.json();
        console.log("🔁 Result from backend:", result);
        return result.exists;
    };
    
    
    
     /*const processData = async (data) => {
              
        await dispatch(createMachineAction(data))
        console.log(data);
        
        setShow(false);
    } Working code 11032025 */
    const processData = async (data) => {
    
        try {
            console.log("✅ data received:", data);
    
            if (!data) {
                alert("❌ No data received in processData!");
                return;
            }
    
            const serial = data.serial;
            const id = data.id_maquina;
    
            console.log("🔎 Checking serial:", serial);
            console.log("🔎 Checking ID:", id);
    
            const duplicateSerial = await checkDuplicate('serial', serial);
            console.log("🧪 duplicateSerial?", duplicateSerial);
    
            const duplicateId = await checkDuplicate('id_maquina', id);
            console.log("🧪 duplicateId?", duplicateId);
            
            if (duplicateId) {
                setError("id_maquina", {
                    type: "manual",
                    message: `Ya existe una máquina con el ID "${id}"`
                });
                return;
            }
            
    
            await dispatch(createMachineAction(data));

            //await dispatch(getMachineListApi());//accion para refrescar
            setShow(false);
        } catch (error) {
            console.error("❌ processData threw an error:", error);
            alert("❌ Ocurrió un error al validar duplicados.");
        }
    };
    
    
  

    return (
        <div className='mx-2'>
           <form onSubmit={handleSubmit(processData)}>
                <div className="mb-3">
                    <Required />
                </div>
                <div className='d-flex flex-between w-100'>
                    <div className='d-flex flex-column w-100 me-2'>
                        <label className='input-label me-2'><span className="color-primary h5" ><strong>*</strong></span>  <strong>Seccion</strong></label>
                        <select name='seccion' className='form-control my-2' {...register("seccion", { required: { value: true, message: 'La seccion es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} >
                            <option>Interna</option>
                            <option>Externa</option>
                            </select>
                        <span className='text-danger text-small d-block mb-2'>{errors?.seccion?.message}</span>
                    </div>
                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'>
                            <span className="color-primary h5"></span><strong>Cargar Certificado</strong> 
                        </label>
    
                        {/* Input para cargar el archivo */}
                        <input name="cargar_certificado" 
                            type="file" 
                            className='form-control my-2' 
                            {...register("cargar_certificado")} 
                        />
                        {/* Mensaje de error */}
                        <span className='text-danger text-small d-block mb-2'>
                            {errors?.certificado?.message}
                        </span>
                    </div>
                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5"></span><strong>Liga Certificado</strong></label>
                        <input name='liga_certificado' type="text" placeholder='' className='form-control my-2' {...register("liga_certificado")}/>
                        <span className='text-danger text-small d-block mb-2'>{errors?.liga_certificado?.message}</span>
                    </div>
                </div>
                <div className='d-flex flex-between w-100'>
                    <div className='d-flex flex-column w-100 me-2'>
                        <label className='input-label me-2'><span className="color-primary h5" ><strong>*</strong></span><strong>Id</strong></label>
                        <input name='id_maquina' type="text" placeholder='' className='form-control my-2' {...register("id_maquina", { required: { value: true, message: 'El Id obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.id_maquina?.message}</span>
                    </div>

                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5"><strong>*</strong></span><strong>Nombre</strong></label>
                        <input name='nomMaquina' type="text" placeholder='' className='form-control my-2' {...register("nomMaquina", { required: { value: true, message: 'El Nombre es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.nomMaquina?.message}</span>
                    </div>

                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5"><strong>*</strong></span><strong>Serial</strong></label>
                        <input name='serial' type="text" placeholder='' className='form-control my-2' {...register("serial", { required: { value: true, message: 'El Serial es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.serial?.message}</span>
                    </div>
                </div>

                <div className='d-flex flex-between w-100'>
                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5"><strong>*</strong></span><strong>Manufacturador</strong></label>
                        <input name='manufacturador' type="text" placeholder='' className='form-control my-2' {...register("manufacturador", { required: { value: true, message: 'El Manufacturador es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.manufacturador?.message}</span>
                    </div>

                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5"><strong>*</strong></span><strong>Proveedor</strong></label>
                        <input name='proveedor' type="text" placeholder='' className='form-control my-2' {...register("proveedor", { required: { value: true, message: 'El Proveedor es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.proveedor?.message}</span>
                    </div>

                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5"><strong>*</strong></span><strong>Tipo</strong></label>
                        <input name='type' type="text" placeholder='' className='form-control my-2' {...register("type", { required: { value: true, message: 'El Tipo de maquina es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.type?.message}</span>
                    </div>
                </div>

                <div className='d-flex flex-between w-100'>
                    <div className='d-flex flex-column w-100 me-2'>
                        <label className='input-label me-2'><span className="color-primary h5" ><strong>*</strong></span><strong>Área de negocio</strong></label>
                        <select name='loc1' className='form-control my-2' {...register("loc1", { required: { value: true, message: 'El área de negocio es obligatoria' }, minLength: { value: 2, message: "Min lenght 2" } })} >
                            <option>Process Instruments</option>
                            <option>Field Instruments</option>
                            <option>Mercury Instrumets</option>
                            <option>S&P</option>
                            <option>Warehouse</option>
                            <option>NPI</option>
                            <option>Cuarto de Bombas</option>
                            <option>Oficinas</option>
                            </select>
                        <span className='text-danger text-small d-block mb-2'>{errors?.seccion?.message}</span>
                    </div>

                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5"><strong>*</strong></span><strong>Área de producción</strong></label>
                        <input name='loc2' type="text" placeholder='' className='form-control my-2' {...register("loc2", { required: { value: true, message: 'El Loc2 es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.loc2?.message}</span>
                    </div>

                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5"><strong>*</strong></span><strong>Estación</strong></label>
                        <input name='loc3' type="text" placeholder='' className='form-control my-2' {...register("loc3", { required: { value: true, message: 'El Loc3 de maquina es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.loc3?.message}</span>
                    </div>
                </div>

                <div className='d-flex flex-between w-100'>
                    <div className='d-flex flex-column w-100 me-2'>
                        <label className='input-label'><span className="color-primary h5"><strong>*</strong></span><strong>Última fecha de calibración</strong></label>
                        <input name='last_calibration_date' type="date" placeholder=''  className='form-control my-2' {...register("last_calibration_date")} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.last_calibration_date?.message}</span>
                    </div>


                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5"><strong>*</strong></span><strong>Intervalo de calibración</strong></label>
                        <input
                            name='calibration_interval_define'
                            type="text"
                            placeholder=''
                            className='form-control my-2'
                            onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                            {...register("calibration_interval_define", {
                                required: { value: true, message: 'El Intervalo de calibración es obligatorio' },
                            })}
                        />
                        <span className='text-danger text-small d-block mb-2'>{errors?.calibration_interval_define?.message}</span>
                    </div>

                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5"><strong>*</strong></span><strong>Proxima calibracion</strong></label>
                        <input name='next_calibration' type="date" placeholder='' className='form-control my-2' {...register("next_calibration ")} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.comments?.message}</span>
                    </div>

                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label me-2'><span className="color-primary h5" ><strong>*</strong></span><strong>Tiempo de Intervalo</strong></label>
                        <select name='tiempoIntervalo' className='form-control my-2' {...register("tiempoIntervalo", { required: { value: true, message: 'El tiempo de intervalo es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} >
                            <option>Semana/s</option>
                            <option>Mes/s</option>
                            <option>Año/s</option>
                            </select>
                        <span className='text-danger text-small d-block mb-2'>{errors?.seccion?.message}</span>
                    </div>
                </div>
                

                <div className='d-flex flex-between w-100'>
                <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5"><strong>*</strong></span><strong>Expira</strong></label>
                        <input name='expira' type="date" placeholder='' className='form-control my-2' {...register("expira")} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.expira?.message}</span>
                    </div>
                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5"><strong>*</strong></span><strong>Rango de Trabajo</strong></label>
                        <input name='rango_trabajo' type="text" placeholder='' className='form-control my-2' {...register("rango_trabajo", { required: { value: true, message: 'El Rango de Trabajo es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.rango_trabajo?.message}</span>
                    </div>

                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5"></span><strong>Comentario</strong></label>
                        <input name='comments' type="text" placeholder='' className='form-control my-2' {...register("comments")} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.comments?.message}</span>
                    </div>

                    

                    
                    {/* 3 archivos:
                    -foto equipo
                    -foto etiqueta
                    -certificado pdf */}
                </div>
                <CreateButtons /> 
            </form>
        </div>
    )
}

function CreateButtons(props) {
    return (
        <div className='d-flex justify-content-end'>
            <button type="submit" className='btn btn-action-primary w-auto my-4'>Nueva Maquina</button>
        </div>
    )
}


export default MachineForm;