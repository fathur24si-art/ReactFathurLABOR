export const inputConfig = [
  {
    key: 'nama',
    label: 'Nama Pemesan',
    placeholder: 'Contoh: Andi Pratama',
    type: 'text',
  },
  {
    key: 'makanan',
    label: 'Nama Makanan',
    placeholder: 'Contoh: Nasi Goreng',
    type: 'text',
  },
  {
    key: 'jumlahPorsi',
    label: 'Jumlah Porsi',
    placeholder: 'Contoh: 2',
    type: 'text',
  },
]

export const tujuanOptions = [
  { value: '', label: 'Pilih tujuan' },
  { value: 'hemat', label: 'Hemat Budget' },
  { value: 'sehat', label: 'Makan Sehat' },
  { value: 'kenyang', label: 'Porsi Kenyang' },
]

export const tingkatPedasOptions = [
  { value: '', label: 'Pilih tingkat pedas' },
  { value: 'tidak-pedas', label: 'Tidak Pedas' },
  { value: 'sedang', label: 'Sedang' },
  { value: 'pedas', label: 'Pedas' },
]

export const baseKalori = {
  hemat: 350,
  sehat: 280,
  kenyang: 450,
}
