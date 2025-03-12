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
        alert("🚀 processData called");
    
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
    
            if (duplicateSerial) {
                setError("serial", {
                    type: "manual",
                    message: `Ya existe una máquina con el serial "${serial}"`
                });
                return;
            }
            
            if (duplicateId) {
                setError("id_maquina", {
                    type: "manual",
                    message: `Ya existe una máquina con el ID "${id}"`
                });
                return;
            }
            
    
            await dispatch(createMachineAction(data));
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
                        <label className='input-label me-2'><span className="color-primary h5" >*</span>  Seccion:</label>
                        <select name='seccion' className='form-control my-2' {...register("seccion", { required: { value: true, message: 'La seccion es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} >
                            <option>Interna</option>
                            <option>Externa</option>
                            </select>
                        <span className='text-danger text-small d-block mb-2'>{errors?.seccion?.message}</span>
                    </div>
                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'>
                            <span className="color-primary h5"></span> Cargar Certificado:
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
                        <label className='input-label'><span className="color-primary h5">*</span>  Liga Certificado</label>
                        <input name='liga_certificado' type="text" placeholder='Liga de Certificado' className='form-control my-2' {...register("liga_certificado", { required: { value: true, message: 'El Liga de certificado es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.liga_certificado?.message}</span>
                    </div>
                </div>
                <div className='d-flex flex-between w-100'>
                    <div className='d-flex flex-column w-100 me-2'>
                        <label className='input-label me-2'><span className="color-primary h5" >*</span>  Id</label>
                        <input name='id_maquina' type="text" placeholder='Id Maquina' className='form-control my-2' {...register("id_maquina", { required: { value: true, message: 'El Id obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.id_maquina?.message}</span>
                    </div>

                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5">*</span>  Nombre</label>
                        <input name='nomMaquina' type="text" placeholder='Nombre Maquina' className='form-control my-2' {...register("nomMaquina", { required: { value: true, message: 'El Nombre es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.nomMaquina?.message}</span>
                    </div>

                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5">*</span>  Serial</label>
                        <input name='serial' type="text" placeholder='Serial' className='form-control my-2' {...register("serial", { required: { value: true, message: 'El Serial es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.serial?.message}</span>
                    </div>
                </div>

                <div className='d-flex flex-between w-100'>
                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5">*</span>  Manufacturador</label>
                        <input name='manufacturador' type="text" placeholder='Manufacturador' className='form-control my-2' {...register("manufacturador", { required: { value: true, message: 'El Manufacturador es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.manufacturador?.message}</span>
                    </div>

                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5">*</span>  Proveedor</label>
                        <input name='proveedor' type="text" placeholder='Proveedor' className='form-control my-2' {...register("proveedor", { required: { value: true, message: 'El Proveedor es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.proveedor?.message}</span>
                    </div>

                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5">*</span>  Tipo</label>
                        <input name='type' type="text" placeholder='Tipo' className='form-control my-2' {...register("type", { required: { value: true, message: 'El Tipo de maquina es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.type?.message}</span>
                    </div>
                </div>

                <div className='d-flex flex-between w-100'>
                    <div className='d-flex flex-column w-100 me-2'>
                        <label className='input-label me-2'><span className="color-primary h5" >*</span>  Área de negocio:</label>
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
                        <label className='input-label'><span className="color-primary h5">*</span>  Área de producción</label>
                        <input name='loc2' type="text" placeholder='Área de producción' className='form-control my-2' {...register("loc2", { required: { value: true, message: 'El Loc2 es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.loc2?.message}</span>
                    </div>

                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5">*</span>  Estación</label>
                        <input name='loc3' type="text" placeholder='Estación' className='form-control my-2' {...register("loc3", { required: { value: true, message: 'El Loc3 de maquina es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.loc3?.message}</span>
                    </div>
                </div>

                <div className='d-flex flex-between w-100'>
                    <div className='d-flex flex-column w-100 me-2'>
                        <label className='input-label'><span className="color-primary h5">*</span>  Última fecha de calibración</label>
                        <input name='last_calibration_date' type="date" placeholder='Última fecha de calibración'  className='form-control my-2' {...register("last_calibration_date")} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.last_calibration_date?.message}</span>
                    </div>

                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5">*</span>  Intervalo de calibración</label>
                        <input
    name='calibration_interval_define'
    type="text"
    placeholder='Intervalo de calibración'
    className='form-control my-2'
    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
    {...register("calibration_interval_define", {
        required: { value: true, message: 'El Intervalo de calibración es obligatorio' },
    })}
/>


                        <span className='text-danger text-small d-block mb-2'>{errors?.calibration_interval_define?.message}</span>
                    </div>

                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label me-2'><span className="color-primary h5" >*</span>  Tiempo de Intervalo:</label>
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
                        <label className='input-label'><span className="color-primary h5">*</span>  Expira</label>
                        <input name='expira' type="date" placeholder='Expira' className='form-control my-2' {...register("expira")} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.expira?.message}</span>
                    </div>
                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5">*</span>  Rango de Trabajo</label>
                        <input name='rango_trabajo' type="text" placeholder='Rango de Trabajo' className='form-control my-2' {...register("rango_trabajo", { required: { value: true, message: 'El Rango de Trabajo es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.rango_trabajo?.message}</span>
                    </div>

                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5"></span>  Comentario</label>
                        <input name='comments' type="text" placeholder='Comentario' className='form-control my-2' {...register("comments")} />
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