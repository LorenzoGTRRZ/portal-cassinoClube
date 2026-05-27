import { useState } from 'react';

// 1. Cole aqui os links reais que você copiou do Google Drive
const LINKS_DRIVE = {
  documentos: {
    listaefetivos: "https://drive.google.com/drive/folders/13Fd6tEaUtVMJTujJWzvjLRuxnCORClX6?usp=sharing",
    docgerais: "https://drive.google.com/drive/folders/150TlvA2aF4tlY85VEGYrHrTD0g1uG0gk?usp=sharing",
    Sociosefetivosemmuitoatraso: "https://drive.google.com/drive/folders/1jkTWla-1LkzTPq8yatojSMolaqQ_Nt17?usp=sharing",
    sociosremidos: "https://drive.google.com/drive/folders/1xvI-4-yA_-J47Y_3ctLdsZxP8E0KqHmG?usp=sharing",
  },
  eventos: {
    bingos: "https://drive.google.com/drive/folders/SEU_LINK_AQUI_5",
    fotos: "https://drive.google.com/drive/folders/SEU_LINK_AQUI_6",
    ingressos: "https://drive.google.com/drive/folders/SEU_LINK_AQUI_7",
  },
  sss: "https://drive.google.com/drive/folders/SEU_LINK_AQUI_8"
};

export default function App() {
  // Controle de qual tela está ativa
  const [telaAtiva, setTelaAtiva] = useState('inicio');

  return (
    <div className="min-h-screen bg-slate-100 font-sans p-6 md:p-12 selection:bg-blue-200">
      
      {/* Cabeçalho fixo, bem grande e claro */}
      <header className="max-w-4xl mx-auto text-center mb-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
          Portal de Arquivos do Clube
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium">
          Clique nos botões grandes abaixo para acessar os documentos.
        </p>
      </header>

      <main className="max-w-4xl mx-auto">
        
        {/* Botão de Voltar gigante, caso não esteja na tela inicial */}
        {telaAtiva !== 'inicio' && (
          <button
            onClick={() => setTelaAtiva('inicio')}
            className="w-full mb-8 bg-amber-500 hover:bg-amber-600 text-slate-900 text-2xl font-black py-5 px-8 rounded-2xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-3"
          >
            ← CLIQUE AQUI PARA VOLTAR AO INÍCIO
          </button>
        )}

        {/* TELA INICIAL: Categorias Principais */}
        {telaAtiva === 'inicio' && (
          <div className="grid grid-cols-1 gap-6">
            <button
              onClick={() => setTelaAtiva('socios')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-3xl font-bold p-12 rounded-3xl shadow-lg transition-all active:scale-[0.98] text-left flex items-center justify-between border-4 border-blue-200"
            >
              <span>📁 Documentos do Clube</span>
              <span className="text-4xl">➔</span>
            </button>

            <button
              onClick={() => setTelaAtiva('eventos')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-3xl font-bold p-12 rounded-3xl shadow-lg transition-all active:scale-[0.98] text-left flex items-center justify-between border-4 border-emerald-200"
            >
              <span>📁 BINGOS, FESTAS E EVENTOS</span>
              <span className="text-4xl">➔</span>
            </button>

            <a
              href={LINKS_DRIVE.documentos}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white text-3xl font-bold p-12 rounded-3xl shadow-lg transition-all active:scale-[0.98] text-left flex items-center justify-between border-4 border-purple-200 block"
            >
              <span>📄 DOCUMENTOS GERAIS E ATAS</span>
              <span className="text-4xl">↗</span>
            </a>
          </div>
        )}

        {/* TELA DE SÓCIOS */}
        {telaAtiva === 'socios' && (
          <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-6 border-b pb-4">Pastas de Sócios:</h2>
            <div className="grid grid-cols-1 gap-4">
              <a href={LINKS_DRIVE.documentos.docgerais} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-900 text-white text-2xl font-bold p-6 rounded-xl block text-center shadow shadow-md">
                📄 Documentos Gerais ↗
              </a>
              <a href={LINKS_DRIVE.documentos.Sociosefetivosemmuitoatraso} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-900 text-white text-2xl font-bold p-6 rounded-xl block text-center shadow shadow-md">
                📄 Sócios efetivos em muito atraso ↗
              </a>
              <a href={LINKS_DRIVE.documentos.sociosremidos} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-900 text-white text-2xl font-bold p-6 rounded-xl block text-center shadow shadow-md">
                📄 Sócios Remidos ↗
              </a>
              <a href={LINKS_DRIVE.documentos.listaefetivos} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-900 text-white text-2xl font-bold p-6 rounded-xl block text-center shadow shadow-md">
                📄 Lista Efetivos
              </a>
            </div>
          </div>
        )}

        {/* TELA DE EVENTOS */}
        {telaAtiva === 'eventos' && (
          <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-6 border-b pb-4">Pastas de Eventos:</h2>
            <div className="grid grid-cols-1 gap-4">
              <a href={LINKS_DRIVE.eventos.bingos} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-900 text-white text-2xl font-bold p-6 rounded-xl block text-center shadow shadow-md">
                Abrir Pasta: Pastas dos Bingos ↗
              </a>
              <a href={LINKS_DRIVE.eventos.ingressos} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-900 text-white text-2xl font-bold p-6 rounded-xl block text-center shadow shadow-md">
                Abrir Arquivos: Ingressos e Jantares ↗
              </a>
            </div>
          </div>
        )}

      </main>

      {/* Rodapé explicativo simples */}
      <footer className="max-w-4xl mx-auto text-center mt-12 text-slate-500 font-medium text-lg">
        Dica: Os arquivos serão abertos em uma nova aba do navegador de forma segura.
      </footer>
    </div>
  );
}