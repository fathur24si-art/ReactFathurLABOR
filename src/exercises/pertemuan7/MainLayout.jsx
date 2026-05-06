import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.36em] text-slate-500">
                Admin Resto
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                Dashboard Admin Resto
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Kelola menu, pesanan, dan pelanggan dengan tampilan yang bersih dan
                mudah dinavigasi.
              </p>
            </div>
          </div>
        </header>
        <main className="grow">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
