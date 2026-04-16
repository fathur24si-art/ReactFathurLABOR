import AlertErrors from './AlertErrors'

function FieldInput({ label, name, type, value, placeholder, onChange, errors }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-slate-100/95">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-slate-100 outline-none transition duration-200 placeholder:text-slate-400 focus:border-cyan-300 focus:bg-white/15"
      />
      <AlertErrors errors={errors} />
    </div>
  )
}

export default FieldInput
