import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import FieldInput from './components/FieldInput'
import FieldSelect from './components/FieldSelect'
import { baseKalori, inputConfig, tingkatPedasOptions, tujuanOptions } from './formConfig'
import { hasAnyError, validateInputs } from './validation'

function FormMakananTujuan() {
  const [form, setForm] = useState({
    nama: '',
    makanan: '',
    jumlahPorsi: '',
    tujuan: '',
    tingkatPedas: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const errors = useMemo(() => validateInputs(form), [form])
  const isValid = !hasAnyError(errors)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setIsSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isValid) return
    setIsSubmitted(true)
  }

  const totalKalori = (() => {
    const kaloriPerPorsi = baseKalori[form.tujuan] ?? 0
    const jumlah = Number(form.jumlahPorsi || 0)
    return kaloriPerPorsi * jumlah
  })()

  return (
    <section className="w-full rounded-3xl border border-white/25 bg-slate-950/65 p-6 text-left text-white shadow-2xl backdrop-blur-xl">
      <div className="mx-auto w-full max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Detail Pesanan Makanan</h2>
        <p className="mt-2 text-sm text-slate-300">
          Form ini dirancang untuk membantu proses pemesanan makanan berdasarkan kebutuhan dan tujuan
          konsumsi.
        </p>
        <p className="mt-1 text-sm text-slate-300">
          Tersedia 3 input dan 2 select dropdown dengan validasi aktif. Informasi error tampil sebagai
          alert di bawah setiap field.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {inputConfig.map((field) => (
            <FieldInput
              key={field.key}
              label={field.label}
              name={field.key}
              type={field.type}
              value={form[field.key]}
              placeholder={field.placeholder}
              onChange={handleChange}
              errors={errors[field.key]}
            />
          ))}

          <FieldSelect
            label="Tujuan Makan"
            name="tujuan"
            value={form.tujuan}
            onChange={handleChange}
            options={tujuanOptions}
            errors={errors.tujuan}
          />

          <FieldSelect
            label="Preferensi Pedas"
            name="tingkatPedas"
            value={form.tingkatPedas}
            onChange={handleChange}
            options={tingkatPedasOptions}
            errors={errors.tingkatPedas}
          />

          {isValid ? (
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-slate-900 transition hover:bg-slate-200"
            >
              Submit
            </motion.button>
          ) : (
            <p className="text-sm text-amber-300">
              Tombol submit hanya muncul jika semua validasi sudah terpenuhi.
            </p>
          )}
        </form>

        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="mt-6 rounded-2xl border border-emerald-300 bg-emerald-100 p-4 text-sm text-emerald-800"
          >
            <p className="font-semibold">Validasi berhasil terlewati. Berikut hasil input:</p>
            <p>Nama: {form.nama}</p>
            <p>Makanan: {form.makanan}</p>
            <p>Jumlah Porsi: {form.jumlahPorsi}</p>
            <p>Tujuan: {form.tujuan}</p>
            <p>Tingkat Pedas: {form.tingkatPedas}</p>
            <p className="mt-1 font-semibold">Estimasi Total Kalori: {totalKalori} kkal</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default FormMakananTujuan
