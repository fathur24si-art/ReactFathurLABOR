function AlertErrors({ errors = [] }) {
  if (!errors.length) return null

  return (
    <div className="rounded-xl border border-rose-300/75 bg-rose-100 px-3 py-2 text-left text-sm text-rose-700 shadow-sm">
      {errors.map((error) => (
        <p key={error}>- {error}</p>
      ))}
    </div>
  )
}

export default AlertErrors
