import React, { useState } from "react";
import axios from "axios";

function TambahProduk() {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nama || !harga) {
      setError("Nama dan Harga wajib diisi");
      return;
    }

    axios
      .post("http://localhost:3000/produk", { nama, harga })
      .then(() => {
        setNama("");
        setHarga("");
        setError(null);
      })
      .catch(() => setError("Gagal menambahkan produk"));
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      {error && (
        <div className="alert alert-danger">
          <strong>Nama dan Harga wajib diisi</strong>
          <p>Mohon periksa kembali form isian Anda</p>
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Nama Produk</label>
        <input
          type="text"
          className="form-control"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Masukkan nama produk"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Harga</label>
        <div className="input-group">
          <span className="input-group-text">Rp</span>
          <input
            type="number"
            className="form-control"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            placeholder="Masukkan harga"
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        ➕ Tambah Produk
      </button>
    </form>
  );
}

export default TambahProduk;
