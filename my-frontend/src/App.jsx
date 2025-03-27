import React from "react";
import ProdukList from "./components/ProdukList";
import TambahProduk from "./components/TambahProduk";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container mt-4">
      <header className="text-center mb-4">
        <h1 className="fw-bold">Product Management</h1>
      </header>

      <div className="row">
        {/* Form Tambah Produk */}
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h4 className="fw-bold">Tambah Produk <span className="badge bg-primary">New</span></h4>
            <TambahProduk />
          </div>
        </div>

        {/* Daftar Produk */}
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h4 className="fw-bold">Daftar Produk <span className="badge bg-secondary"></span></h4>
            <ProdukList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
