
import React, { useState, useEffect } from 'react';


const initialForm = {
  denominacion: '',
  abreviatura: '',
  codigoREUP: '',
  noNIT: '',
  registroMercantil: '',
  registroComercial: '',
  grupoEmpresarial: '',
};


const monedaOptions = ['USD', 'EUR', 'CUP'];
const grupoEmpresarialOptions = ['MINED', 'MES', 'GEIL', 'MICOM'];
const bancoOptions = ['Metropolitano', 'BANDEC', 'BPA', 'BFI'];

// Clases base para inputs y elementos comunes
const inputClass = (darkMode, hasError) => `
  w-full rounded-lg border px-3 py-2 
  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4d8371] focus-visible:ring-offset-[#e8f3f0] 
  hover-lift transition-all-smooth
  ${darkMode 
    ? 'bg-[#2d4f45] border-[#3d6356] text-[#e8f3f0] focus-visible:ring-offset-[#243b35]'
    : 'bg-[#f7fbfa] border-[#c1e3d9]'}
  ${hasError ? 'border-red-400' : ''}
`;

const labelClass = (darkMode) => `
  block text-sm font-medium mb-1
  transition-colors-smooth
  ${darkMode ? 'text-[#a8d5c8]' : 'text-[#2d6f5a]'}
`;

function AdicionarEntidadComercial() {
  const [form, setForm] = useState(initialForm);
  const [cuentas, setCuentas] = useState([
    { cuenta: '', banco: '', moneda: '' }
  ]);
  const [tab, setTab] = useState(2);
  const [errors, setErrors] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  // Persistir preferencia de modo oscuro
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark');
  };

  // Validación en vivo para campos principales y comerciales
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (!value.trim()) {
        newErrors[name] = 'Campo requerido';
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  // Validación en vivo para cuentas (solo números en cuenta y selects personalizados)
  const handleCuentaChange = (idx, field, value) => {
    let newValue = value;
    if (field === 'cuenta') {
      newValue = value.replace(/[^0-9]/g, '');
    }
    setCuentas(cuentas.map((c, i) => i === idx ? { ...c, [field]: newValue } : c));
    setErrors((prev) => {
      const newErrors = { ...prev };
      const cuenta = { ...cuentas[idx], [field]: newValue };
      if (!cuenta.cuenta.trim() || !cuenta.banco.trim() || !cuenta.moneda) {
        newErrors[`cuenta_${idx}`] = 'Todos los campos de la cuenta son requeridos';
      } else {
        delete newErrors[`cuenta_${idx}`];
      }
      return newErrors;
    });
  };

  const handleEliminar = (idx) => {
    // Solo permitir eliminar si hay más de una cuenta
    if (cuentas.length > 1) {
      setCuentas(cuentas.filter((_, i) => i !== idx));
    }
  };

  const handleAgregarCuenta = () => {
    setCuentas([
      ...cuentas,
      { cuenta: '', banco: '', moneda: '' }
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
    
    // Validar que haya al menos una cuenta y que sus campos estén completos
    if (cuentas.length === 0) {
      newErrors.cuentas = 'Debe haber al menos una cuenta';
    }
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
      console.log('Formulario válido', { form, cuentas });
    }
  };

  // Animación secuencial para elementos de la lista
  const getAnimationDelay = (index) => ({
    animationDelay: `${index * 100}ms`
  });

  return (
    <div className={`min-h-screen p-2 transition-colors-smooth
      ${darkMode ? 'bg-[#1a2b27]' : 'bg-[#e8f3f0]'}`}>
      <div className={`mx-auto min-h-screen rounded-none sm:rounded-2xl shadow-xl flex flex-col 
        transition-colors-smooth animate-fade-in
        ${darkMode ? 'bg-[#243b35] border-[#2d4f45]' : 'bg-white border-[#a8d5c8]'}`}>
        
        {/* Contenido del formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col h-full p-3 sm:p-4">
          {/* Header con título y toggle de modo oscuro */}
          <div className="flex justify-between items-center sticky top-0 z-20 py-2 mb-4">
            <h2 className={`text-xl font-semibold animate-slide-in
              ${darkMode ? 'text-[#c1e3d9]' : 'text-[#1a4d3e]'}`}>
              Adicionar entidad comercial
            </h2>
            <button
              type="button"
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all-smooth hover-lift
                ${darkMode ? 'bg-[#2d4f45] text-[#a8d5c8]' : 'bg-[#e8f3f0] text-[#2d6f5a]'}`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          <div className="flex-grow overflow-auto">
            {/* Campos principales */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              {['denominacion', 'abreviatura'].map((field, index) => (
                <div key={field} className="animate-fade-in" style={getAnimationDelay(index)}>
                  <label className={labelClass(darkMode)} htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    id={field}
                    name={field}
                    value={form[field]}
                    onChange={handleInputChange}
                    className={inputClass(darkMode, errors[field])}
                    tabIndex={index + 1}
                  />
                  {errors[field] && 
                    <span className="text-xs text-red-400 mt-1 animate-fade-in">
                      {errors[field]}
                    </span>
                  }
                </div>
              ))}
            </div>

            {/* Pestañas de navegación */}
            <div className="flex flex-wrap gap-1 mb-4 sticky top-16 z-10 py-1">
              {['Datos generales', 'Datos comerciales', 'Gerencia', 'Contactos', 'Documentos'].map((tabName, index) => (
                <button
                  key={tabName}
                  type="button"
                  disabled={index > 1}
                  onClick={() => setTab(index + 1)}
                  style={getAnimationDelay(index)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all-smooth hover-lift
                    ${index + 1 === tab
                      ? darkMode
                        ? 'bg-[#4d8371] text-white'
                        : 'bg-[#40826b] text-white'
                      : index > 1
                        ? darkMode
                          ? 'bg-[#2d4f45] text-[#6b8c82]'
                          : 'bg-[#f0f7f5] text-[#84ab9f]'
                        : darkMode
                          ? 'bg-[#2d4f45] text-[#a8d5c8] hover:bg-[#3d6356]'
                          : 'bg-[#e8f3f0] text-[#2d6f5a] hover:bg-[#d1e9e3]'}`}
                >
                  {tabName}
                </button>
              ))}
            </div>

            {/* Contenido de la pestaña seleccionada */}
            {tab === 2 && (
              <div className="space-y-4 pb-2 animate-fade-in">
                {/* Campos de la sección datos comerciales */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {['codigoREUP', 'noNIT', 'registroMercantil', 'registroComercial'].map((field, index) => (
                    <div key={field} className="animate-fade-in" style={getAnimationDelay(index)}>
                      <label className={labelClass(darkMode)}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        name={field}
                        value={form[field]}
                        onChange={handleInputChange}
                        className={inputClass(darkMode, errors[field])}
                      />
                      {errors[field] && 
                        <span className="text-xs text-red-400 mt-1 animate-fade-in">
                          {errors[field]}
                        </span>
                      }
                    </div>
                  ))}
                </div>

                {/* Grupo empresarial */}
                <div className="animate-fade-in" style={getAnimationDelay(4)}>
                  <label className={labelClass(darkMode)}>
                    Grupo empresarial
                  </label>
                  <select
                    name="grupoEmpresarial"
                    value={form.grupoEmpresarial}
                    onChange={handleInputChange}
                    className={inputClass(darkMode, errors.grupoEmpresarial)}
                  >
                    <option value="">Seleccione un grupo</option>
                    {grupoEmpresarialOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.grupoEmpresarial && 
                    <span className="text-xs text-red-400 mt-1 animate-fade-in">
                      {errors.grupoEmpresarial}
                    </span>
                  }
                </div>

                {/* Sección de cuentas */}
                <div className="animate-fade-in" style={getAnimationDelay(5)}>
                  <label className={labelClass(darkMode)}>Cuentas</label>
                  <div className={`rounded-lg p-3 shadow-inner transition-all-smooth hover-lift
                    ${darkMode ? 'bg-[#2d4f45]' : 'bg-[#f0f7f5]'}`}>
                    <div className={`grid grid-cols-4 text-xs font-semibold px-3 py-2 rounded-lg mb-2
                      transition-colors-smooth animate-slide-in
                      ${darkMode ? 'bg-[#3d6356] text-[#a8d5c8]' : 'bg-[#d1e9e3] text-[#2d6f5a]'}`}>
                      <div>CUENTA</div>
                      <div>AGENCIA BANCARIA</div>
                      <div>MONEDA</div>
                      <div>ACCIONES</div>
                    </div>
                    
                    {/* Lista de cuentas */}
                    <div className="max-h-[250px] overflow-auto">
                      {cuentas.map((c, idx) => (
                        <div key={idx}
                          className={`grid grid-cols-4 items-center gap-3 px-3 py-2 rounded-lg mb-2 
                            shadow-sm animate-scale-in hover-lift transition-all-smooth
                            ${darkMode ? 'bg-[#243b35]' : 'bg-white'}`}
                          style={getAnimationDelay(idx)}>
                          {/* Solo números en cuenta */}
                          <div>
                            <input
                              id={`cuenta_cuenta_${idx}`}
                              value={c.cuenta}
                              onChange={e => handleCuentaChange(idx, 'cuenta', e.target.value)}
                              className={inputClass(darkMode, errors[`cuenta_${idx}`])}
                              tabIndex={13 + idx * 3}
                              inputMode="numeric"
                              pattern="[0-9]*"
                              aria-label={`Número de cuenta ${idx + 1}`}
                            />
                          </div>
                          {/* Banco seleccionable */}
                          <div>
                            <select
                              id={`cuenta_banco_${idx}`}
                              value={c.banco}
                              onChange={e => handleCuentaChange(idx, 'banco', e.target.value)}
                              className={inputClass(darkMode, errors[`cuenta_${idx}`])}
                              tabIndex={13 + idx * 3 + 1}
                              aria-label={`Banco de la cuenta ${idx + 1}`}
                            >
                              <option value="">Seleccione banco</option>
                              {bancoOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                          {/* Moneda seleccionable con mensaje inicial */}
                          <div>
                            <select
                              id={`cuenta_moneda_${idx}`}
                              value={c.moneda}
                              onChange={e => handleCuentaChange(idx, 'moneda', e.target.value)}
                              className={inputClass(darkMode, errors[`cuenta_${idx}`])}
                              tabIndex={13 + idx * 3 + 2}
                              aria-label={`Moneda de la cuenta ${idx + 1}`}
                            >
                              <option value="">Seleccione moneda</option>
                              {monedaOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            {cuentas.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleEliminar(idx)}
                                className={`px-3 py-1 rounded-lg transition-all-smooth hover-lift
                                  ${darkMode
                                    ? 'bg-[#3d2929] text-[#e65d5d] hover:bg-[#4d3535]'
                                    : 'bg-[#fee7e7] text-[#e65d5d] hover:bg-[#fcd5d5]'}`}
                              >
                                Eliminar
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Mensajes de error y botón agregar */}
                    {errors.cuentas && 
                      <div className="text-xs text-red-400 px-3 mb-2 animate-fade-in">
                        {errors.cuentas}
                      </div>
                    }
                    <div className="flex justify-start p-2">
                      <button
                        type="button"
                        onClick={handleAgregarCuenta}
                        className={`px-4 py-1 rounded-lg text-sm transition-all-smooth hover-lift
                          ${darkMode
                            ? 'border-[#4d8371] text-[#a8d5c8] hover:bg-[#3d6356]'
                            : 'border border-[#40826b] text-[#2d6f5a] hover:bg-[#e8f3f0]'}`}
                      >
                        + Agregar cuenta
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer con botones de acción */}
          <div className={`flex justify-end space-x-3 mt-4 pt-2 sticky bottom-0 transition-colors-smooth
            ${darkMode ? 'border-t border-[#3d6356] bg-[#243b35]' : 'border-t border-[#c1e3d9] bg-white'}`}>
            <button
              type="button"
              className={`px-6 py-2 rounded-lg text-sm transition-all-smooth hover-lift
                ${darkMode
                  ? 'bg-[#2d4f45] text-[#a8d5c8] hover:bg-[#3d6356]'
                  : 'bg-[#e8f3f0] text-[#2d6f5a] hover:bg-[#d1e9e3]'}`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-6 py-2 rounded-lg text-sm shadow-sm transition-all-smooth hover-lift
                ${darkMode
                  ? 'bg-[#4d8371] text-white hover:bg-[#407661]'
                  : 'bg-[#40826b] text-white hover:bg-[#336d58]'}`}
            >
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdicionarEntidadComercial;
