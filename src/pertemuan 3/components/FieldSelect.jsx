import AlertErrors from './AlertErrors'

function FieldSelect({ label, name, value, onChange, options, errors }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-slate-100/95">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-slate-100 outline-none transition duration-200 focus:border-cyan-300 focus:bg-white/15"
      >
        {options.map((option) => (
          <option key={option.value || 'empty'} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <AlertErrors errors={errors} />
    </div>
  )
}

export default FieldSelect
