import React, { useEffect, useState } from "react";
import axios from "axios";

function ProdukList() {
  const [produk, setProduk] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newNama, setNewNama] = useState("");
  const [newHarga, setNewHarga] = useState("");
  const [notification, setNotification] = useState(null);

  // Fetch data produk
  useEffect(() => {
    axios
      .get("http://localhost:3000/produk")
      .then((response) => setProduk(response.data))
      .catch((error) => {
        console.error("Terjadi error:", error);
        setNotification({
          type: "error",
          message: "Gagal memuat data produk.",
        });
      });
  }, []);

  // Fungsi menghapus produk
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/produk/${id}`)
      .then(() => {
        setProduk((prevProduk) => prevProduk.filter((p) => p.id !== id));
        setNotification({
          type: "success",
          message: "Produk berhasil dihapus.",
        });
      })
      .catch((error) => {
        console.error("Error saat menghapus:", error);
        setNotification({
          type: "error",
          message: "Gagal menghapus produk.",
        });
      });
  };

  // Fungsi memulai edit produk
  const handleEdit = (id, nama, harga) => {
    setEditingId(id);
    setNewNama(nama);
    setNewHarga(harga);
  };

  // Fungsi menyimpan perubahan produk
  const handleSave = (id) => {
    axios
      .put(`http://localhost:3000/produk/${id}`, { nama: newNama, harga: newHarga })
      .then(() => {
        setProduk(produk.map((p) => p.id === id ? { ...p, nama: newNama, harga: newHarga } : p));
        setEditingId(null);
        setNotification({ type: "success", message: "Produk berhasil diperbarui." });
      })
      .catch((error) => {
        console.error("Error saat mengupdate:", error);
        setNotification({ type: "error", message: "Gagal memperbarui produk." });
      });
  };

  return (
    <div className="mt-3">
      {notification && (
        <div
          className={`alert ${
            notification.type === "error"
              ? "alert-danger"
              : "alert-success"
          }`}
        >
          {notification.message}
        </div>
      )}

      {produk.map((item) => (
        <div
          key={item.id}
          className="d-flex justify-content-between align-items-center p-3 mb-2 bg-white rounded shadow-sm"
        >
          {editingId === item.id ? (
            // FORM EDIT PRODUK
            <div className="w-100">
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={newNama}
                  onChange={(e) => setNewNama(e.target.value)}
                  placeholder="Nama Produk"
                />
              </div>
              <div className="mb-2">
                <input
                  type="number"
                  className="form-control"
                  value={newHarga}
                  onChange={(e) => setNewHarga(e.target.value)}
                  placeholder="Harga Produk"
                />
              </div>
              <div className="d-flex">
                <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(item.id)}>
                  ✅ Simpan
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>
                  ❌ Batal
                </button>
              </div>
            </div>
          ) : (
            // TAMPILAN PRODUK BIASA
            <>
              <div>
                <h5 className="fw-bold mb-1">{item.nama}</h5>
                <h6 className="text-primary fw-bold">
                  Rp{parseInt(item.harga).toLocaleString("id-ID")}
                </h6>
                <span className="badge bg-success">Tersedia</span>
              </div>
              <div>
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => handleEdit(item.id, item.nama, item.harga)}
                >
                  ✏ Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
                  🗑 Hapus
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProdukList;
