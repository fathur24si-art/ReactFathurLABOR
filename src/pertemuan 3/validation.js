export function validateInputs(form) {
  const errors = {
    nama: [],
    makanan: [],
    jumlahPorsi: [],
    tujuan: [],
    tingkatPedas: [],
  }

  if (!form.nama.trim()) errors.nama.push('Nama wajib diisi.')
  if (/\d/.test(form.nama)) errors.nama.push('Nama tidak boleh mengandung angka.')
  if (form.nama.trim() && form.nama.trim().length < 3) {
    errors.nama.push('Nama minimal 3 karakter.')
  }

  if (!form.makanan.trim()) errors.makanan.push('Nama makanan wajib diisi.')
  if (/\d/.test(form.makanan)) errors.makanan.push('Nama makanan tidak boleh mengandung angka.')
  if (form.makanan.trim() && form.makanan.trim().length < 3) {
    errors.makanan.push('Nama makanan minimal 3 karakter.')
  }

  if (!form.jumlahPorsi.trim()) errors.jumlahPorsi.push('Jumlah porsi wajib diisi.')
  if (form.jumlahPorsi && !/^\d+$/.test(form.jumlahPorsi)) {
    errors.jumlahPorsi.push('Jumlah porsi harus berupa angka bulat.')
  }
  if (/^0\d+/.test(form.jumlahPorsi)) {
    errors.jumlahPorsi.push('Jumlah porsi tidak boleh diawali nol.')
  }
  if (/^\d+$/.test(form.jumlahPorsi)) {
    const jumlah = Number(form.jumlahPorsi)
    if (jumlah < 1 || jumlah > 10) {
      errors.jumlahPorsi.push('Jumlah porsi harus antara 1 sampai 10.')
    }
  }

  if (!form.tujuan) errors.tujuan.push('Tujuan wajib dipilih.')
  if (!form.tingkatPedas) errors.tingkatPedas.push('Tingkat pedas wajib dipilih.')

  return errors
}

export function hasAnyError(errors) {
  return Object.values(errors).some((fieldErrors) => fieldErrors.length > 0)
}
