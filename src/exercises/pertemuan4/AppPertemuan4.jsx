import { useMemo, useState } from 'react'
import kulinerServices from './data/kulinerServices.json'

const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)

function AppPertemuan4() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('Semua')
  const [cityFilter, setCityFilter] = useState('Semua')
  const [viewMode, setViewMode] = useState('guest')

  const categories = useMemo(
    () => ['Semua', ...new Set(kulinerServices.map((item) => item.kategori))],
    [],
  )
  const cities = useMemo(() => ['Semua', ...new Set(kulinerServices.map((item) => item.kota))], [])

  const filteredData = useMemo(() => {
    const q = search.toLowerCase()
    return kulinerServices.filter((item) => {
      const matchSearch =
        item.namaLayanan.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.kategori.toLowerCase().includes(q)
      const matchCategory = categoryFilter === 'Semua' || item.kategori === categoryFilter
      const matchCity = cityFilter === 'Semua' || item.kota === cityFilter
      return matchSearch && matchCategory && matchCity
    })
  }, [search, categoryFilter, cityFilter])

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 md:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Pertemuan 4</p>
          <h1 className="mt-2 text-2xl font-semibold md:text-3xl">Direktori Layanan Kuliner Nusantara</h1>
          <p className="mt-2 text-sm text-slate-300 md:text-base">
            Dataset berisi 20 layanan umum non-produk dengan atribut utama dan nested structure, ditampilkan
            untuk mode Guest (Card) dan Admin (Tabel).
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Responsive demo: mobile 1 kolom, tablet 2 kolom, desktop 3 kolom pada tampilan Guest.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4 md:p-6">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search nama layanan / id / kategori"
              className="rounded-xl border border-slate-600 bg-slate-950 px-4 py-2.5 text-sm outline-none focus:border-cyan-300"
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl border border-slate-600 bg-slate-950 px-4 py-2.5 text-sm outline-none focus:border-cyan-300"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  Filter Kategori: {category}
                </option>
              ))}
            </select>

            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="rounded-xl border border-slate-600 bg-slate-950 px-4 py-2.5 text-sm outline-none focus:border-cyan-300"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  Filter Kota: {city}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setViewMode('guest')}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                  viewMode === 'guest' ? 'bg-cyan-400 text-slate-900' : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                Guest View
              </button>
              <button
                onClick={() => setViewMode('admin')}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                  viewMode === 'admin' ? 'bg-cyan-400 text-slate-900' : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                Admin View
              </button>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-400">Menampilkan {filteredData.length} data dari 20 total data.</p>
        </section>

        {viewMode === 'guest' ? <GuestCardView data={filteredData} /> : <AdminTableView data={filteredData} />}
      </div>
    </div>
  )
}

function GuestCardView({ data }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {data.map((item) => (
        <article
          key={item.id}
          className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/70 shadow-lg transition hover:-translate-y-1 hover:shadow-cyan-900/30"
        >
          <img src={item.gambar} alt={item.namaLayanan} className="h-44 w-full object-cover" loading="lazy" />
          <div className="space-y-2 p-4">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-slate-800 px-2 py-1 text-xs">{item.id}</span>
              <span className="text-xs text-amber-300">Rating {item.rating}</span>
            </div>
            <h3 className="text-lg font-semibold">{item.namaLayanan}</h3>
            <p className="text-sm text-slate-300">
              {item.kategori} • {item.kota}
            </p>
            <p className="text-sm text-cyan-300">{formatRupiah(item.hargaMulai)}</p>
            <p className="text-xs text-slate-400">{item.lokasi.alamat}</p>
          </div>
        </article>
      ))}
    </section>
  )
}

function AdminTableView({ data }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/70">
      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full text-left text-sm">
          <thead className="bg-slate-800 text-slate-200">
            <tr>
              <th className="px-3 py-3">ID</th>
              <th className="px-3 py-3">Nama Layanan</th>
              <th className="px-3 py-3">Kategori</th>
              <th className="px-3 py-3">Kota</th>
              <th className="px-3 py-3">Harga</th>
              <th className="px-3 py-3">Rating</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Jadwal</th>
              <th className="px-3 py-3">Kontak</th>
              <th className="px-3 py-3">Lokasi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t border-slate-700 align-top">
                <td className="px-3 py-3">{item.id}</td>
                <td className="px-3 py-3">{item.namaLayanan}</td>
                <td className="px-3 py-3">{item.kategori}</td>
                <td className="px-3 py-3">{item.kota}</td>
                <td className="px-3 py-3">{formatRupiah(item.hargaMulai)}</td>
                <td className="px-3 py-3">{item.rating}</td>
                <td className="px-3 py-3">{item.status}</td>
                <td className="px-3 py-3">
                  {item.jadwal.buka} - {item.jadwal.tutup}
                </td>
                <td className="px-3 py-3">
                  {item.kontak.telepon}
                  <br />
                  <span className="text-xs text-slate-400">{item.kontak.email}</span>
                </td>
                <td className="px-3 py-3">
                  {item.lokasi.wilayah}
                  <br />
                  <span className="text-xs text-slate-400">{item.lokasi.alamat}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AppPertemuan4
