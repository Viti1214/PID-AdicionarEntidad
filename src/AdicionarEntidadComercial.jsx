import React, { useState } from 'react';

const initialForm = {
  denominacion: '',
  abreviatura: '',
  codigoREUP: '',
  noNIT: '',
  registroMercantil: '',
  registroComercial: '',
  grupoEmpresarial: '', // Comienza en blanco
};

const monedaOptions = ['USD', 'EUR', 'CUP'];
const grupoEmpresarialOptions = ['MINED', 'MES', 'GEIL', 'MICOM'];

function AdicionarEntidadComercial() {
  const [form, setForm] = useState(initialForm);
  const [cuentas, setCuentas] = useState([
    { cuenta: '', banco: '', moneda: 'USD' } // Comienza con una cuenta en blanco
  ]);
  const [tab, setTab] = useState(2);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCuentaChange = (idx, field, value) => {
    setCuentas(cuentas.map((c, i) => i === idx ? { ...c, [field]: value } : c));
  };

  const handleEliminar = (idx) => {
    setCuentas(cuentas.filter((_, i) => i !== idx));
  };

  const handleAgregarCuenta = () => {
    setCuentas([
      ...cuentas,
      { cuenta: '', banco: '', moneda: 'USD' }
    ]);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.denominacion.trim()) newErrors.denominacion = 'Campo requerido';
    if (!form.abreviatura.trim()) newErrors.abreviatura = 'Campo requerido';
    if (!form.codigoREUP.trim()) newErrors.codigoREUP = 'Campo requerido';
    if (!form.noNIT.trim()) newErrors.noNIT = 'Campo requerido';
    if (!form.registroMercantil.trim()) newErrors.registroMercantil = 'Campo requerido';
    if (!form.registroComercial.trim()) newErrors.registroComercial = 'Campo requerido';
    if (!form.grupoEmpresarial) newErrors.grupoEmpresarial = 'Campo requerido';
    cuentas.forEach((c, idx) => {
      if (!c.cuenta.trim() || !c.banco.trim() || !c.moneda) {
        newErrors[`cuenta_${idx}`] = 'Todos los campos de la cuenta son requeridos';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Aquí iría la lógica de envío
      alert('Formulario válido y enviado');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e9f0fc]">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6 text-left">Adicionar entidad comercial</h2>
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Denominación</label>
            <input name="denominacion" value={form.denominacion} onChange={handleInputChange} className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.denominacion ? 'border-red-400' : 'border-gray-300'}`} />
            {errors.denominacion && <span className="text-xs text-red-500">{errors.denominacion}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Abreviatura</label>
            <input name="abreviatura" value={form.abreviatura} onChange={handleInputChange} className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.abreviatura ? 'border-red-400' : 'border-gray-300'}`} />
            {errors.abreviatura && <span className="text-xs text-red-500">{errors.abreviatura}</span>}
          </div>
        </div>
        <div className="flex space-x-2 mb-6">
          <button type="button" onClick={() => setTab(1)} className={`px-4 py-2 rounded-t-lg font-medium ${tab === 1 ? 'bg-white border-b-2 border-blue-600 text-blue-700' : 'bg-gray-100 text-gray-400'}`}>Datos generales</button>
          <button type="button" onClick={() => setTab(2)} className={`px-4 py-2 rounded-t-lg font-medium ${tab === 2 ? 'bg-white border-b-2 border-blue-600 text-blue-700' : 'bg-gray-100 text-gray-400'}`}>Datos comerciales</button>
          <button disabled className="px-4 py-2 rounded-t-lg font-medium bg-gray-100 text-gray-400">Gerencia</button>
          <button disabled className="px-4 py-2 rounded-t-lg font-medium bg-gray-100 text-gray-400">Contactos</button>
          <button disabled className="px-4 py-2 rounded-t-lg font-medium bg-gray-100 text-gray-400">Documentos</button>
        </div>
        {tab === 2 && (
          <div>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">CodigoREUP</label>
                <input name="codigoREUP" value={form.codigoREUP} onChange={handleInputChange} className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.codigoREUP ? 'border-red-400' : 'border-gray-300'}`} />
                {errors.codigoREUP && <span className="text-xs text-red-500">{errors.codigoREUP}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">NoNIT</label>
                <input name="noNIT" value={form.noNIT} onChange={handleInputChange} className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.noNIT ? 'border-red-400' : 'border-gray-300'}`} />
                {errors.noNIT && <span className="text-xs text-red-500">{errors.noNIT}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">RegistroMercantil</label>
                <input name="registroMercantil" value={form.registroMercantil} onChange={handleInputChange} className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.registroMercantil ? 'border-red-400' : 'border-gray-300'}`} />
                {errors.registroMercantil && <span className="text-xs text-red-500">{errors.registroMercantil}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">RegistroComercial</label>
                <input name="registroComercial" value={form.registroComercial} onChange={handleInputChange} className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.registroComercial ? 'border-red-400' : 'border-gray-300'}`} />
                {errors.registroComercial && <span className="text-xs text-red-500">{errors.registroComercial}</span>}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-blue-700">Grupo empresarial</label>
              <select name="grupoEmpresarial" value={form.grupoEmpresarial} onChange={handleInputChange} className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.grupoEmpresarial ? 'border-red-400' : 'border-gray-300'}`}>
                {grupoEmpresarialOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errors.grupoEmpresarial && <span className="text-xs text-red-500">{errors.grupoEmpresarial}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cuentas</label>
              <div className="rounded-xl bg-[#e9f0fc] p-2">
                <div className="grid grid-cols-4 text-xs font-semibold text-gray-600 px-4 py-2 bg-blue-100 rounded-t-xl">
                  <div>CUENTA</div>
                  <div>AGENCIA BANCARIA</div>
                  <div>MONEDA</div>
                  <div>ACCIONES</div>
                </div>
                {cuentas.map((c, idx) => (
                  <div key={idx} className="grid grid-cols-4 items-center px-4 py-2 bg-white border-b last:border-b-0">
                    <div>
                      <input value={c.cuenta} onChange={e => handleCuentaChange(idx, 'cuenta', e.target.value)} className={`w-full rounded border px-2 py-1 ${errors[`cuenta_${idx}`] ? 'border-red-400' : 'border-gray-300'}`} />
                    </div>
                    <div>
                      <input value={c.banco} onChange={e => handleCuentaChange(idx, 'banco', e.target.value)} className={`w-full rounded border px-2 py-1 ${errors[`cuenta_${idx}`] ? 'border-red-400' : 'border-gray-300'}`} />
                    </div>
                    <div>
                      <select value={c.moneda} onChange={e => handleCuentaChange(idx, 'moneda', e.target.value)} className={`w-full rounded border px-2 py-1 ${errors[`cuenta_${idx}`] ? 'border-red-400' : 'border-gray-300'}`}>
                        {monedaOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <button type="button" onClick={() => handleEliminar(idx)} className="text-red-500 bg-red-100 px-3 py-1 rounded hover:bg-red-200">Eliminar</button>
                    </div>
                  </div>
                ))}
                {cuentas.map((_, idx) => errors[`cuenta_${idx}`] && <div key={idx} className="text-xs text-red-500 px-4">{errors[`cuenta_${idx}`]}</div>)}
                <div className="flex justify-start p-2">
                  <button type="button" onClick={handleAgregarCuenta} className="border border-blue-400 text-blue-700 px-4 py-1 rounded-lg hover:bg-blue-50">+ Agregar cuenta</button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-end space-x-4 mt-8">
          <button type="button" className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">Cancelar</button>
          <button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Aceptar</button>
        </div>
      </form>
    </div>
  );
}

export default AdicionarEntidadComercial;
