import { useState } from 'react';

// MÁGICA DO VITE 1: Puxa automaticamente as fotos das CARTEIRAS
const modulosCarteiras = import.meta.glob('./fotos-carteiras/*.{jpg,jpeg,png,webp}', { eager: true });
const fotosCarteiras = Object.values(modulosCarteiras).map((modulo) => modulo.default);

// MÁGICA DO VITE 2: Puxa automaticamente as fotos gerais do CLUBE
const modulosFotosClube = import.meta.glob('./fotos-clube/*.{jpg,jpeg,png,webp}', { eager: true });
const fotosClube = Object.values(modulosFotosClube).map((modulo) => modulo.default);

// Seus links reais copiados do Google Drive (Mantidos intactos)
const LINKS_DRIVE = {
  documentos: {
    listaefetivos: "https://drive.google.com/drive/folders/13Fd6tEaUtVMJTujJWzvjLRuxnCORClX6?usp=sharing",
    docgerais: "https://drive.google.com/drive/folders/150TlvA2aF4tlY85VEGYrHrTD0g1uG0gk?usp=sharing",
    Sociosefetivosemmuitoatraso: "https://drive.google.com/drive/folders/1jkTWla-1LkzTPq8yatojSMolaqQ_Nt17?usp=sharing",
    sociosremidos: "https://drive.google.com/drive/folders/1xvI-4-yA_-J47Y_3ctLdsZxP8E0KqHmG?usp=sharing",
  },
  fotos: {
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
              onClick={() => setTelaAtiva('fotos')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-3xl font-bold p-12 rounded-3xl shadow-lg transition-all active:scale-[0.98] text-left flex items-center justify-between border-4 border-emerald-200"
            >
              <span>📁 Fotos</span>
              <span className="text-4xl">➔</span>
            </button>

            <a
              href={LINKS_DRIVE.sss}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white text-3xl font-bold p-12 rounded-3xl shadow-lg transition-all active:scale-[0.98] text-left flex items-center justify-between border-4 border-purple-200 block"
            >
              <span>📄 DOCUMENTOS GERAIS E ATAS</span>
              <span className="text-4xl">↗</span>
            </a>
          </div>
        )}

        {/* TELA DE SÓCIOS (Documentos do Clube) */}
        {telaAtiva === 'socios' && (
          <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-6 border-b pb-4">Pastas de Sócios:</h2>
            
            {/* NOVO BOTÃO: Galeria de Carteiras local */}
            <button 
              onClick={() => setTelaAtiva('galeria-carteiras')}
              className="w-full mb-6 bg-indigo-600 hover:bg-indigo-700 text-white text-2xl font-bold p-6 rounded-xl shadow-lg border-2 border-indigo-300 transition-all flex items-center justify-center gap-3"
            >
              📸 VER FOTOS DAS CARTEIRAS NO SITE (Efetivo, Remido e Cortesias)
            </button>

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
                📄 Lista Efetivos ↗
              </a>
            </div>
          </div>
        )}

        {/* TELA DE FOTOS (Eventos e Fotos Gerais) */}
        {telaAtiva === 'fotos' && (
          <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-6 border-b pb-4">Pastas de Eventos:</h2>
            
            {/* NOVO BOTÃO: Galeria de Fotos local */}
            <button 
              onClick={() => setTelaAtiva('galeria-clube')}
              className="w-full mb-6 bg-pink-600 hover:bg-pink-700 text-white text-2xl font-bold p-6 rounded-xl shadow-lg border-2 border-pink-300 transition-all flex items-center justify-center gap-3"
            >
              📸 VER ÁLBUM DE FOTOS DO CLUBE NO SITE
            </button>

            <div className="grid grid-cols-1 gap-4">
              <a href={LINKS_DRIVE.fotos.bingos} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-900 text-white text-2xl font-bold p-6 rounded-xl block text-center shadow shadow-md">
                Abrir Pasta: Pastas dos Bingos ↗
              </a>
              <a href={LINKS_DRIVE.fotos.ingressos} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-900 text-white text-2xl font-bold p-6 rounded-xl block text-center shadow shadow-md">
                Abrir Arquivos: Ingressos e Jantares ↗
              </a>
            </div>
          </div>
        )}

        {/* --- TELAS DE GALERIAS DE IMAGENS --- */}

        {/* TELA: GALERIA DE CARTEIRAS */}
        {telaAtiva === 'galeria-carteiras' && (
          <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-200">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2">Carteiras do Clube</h2>
            <p className="text-xl text-slate-500 mb-8 border-b pb-4">
              Sócio Efetivo, Remido, Dependentes e Cortesias
            </p>

            {fotosCarteiras.length === 0 ? (
              <div className="bg-yellow-100 text-yellow-800 p-8 rounded-xl text-xl font-bold text-center border-2 border-yellow-300">
                Nenhuma carteira encontrada. Adicione as imagens na pasta "src/fotos-carteiras" no seu projeto.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {fotosCarteiras.map((foto, index) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-2xl shadow-xl border border-slate-200 hover:shadow-2xl transition-all">
                    <img src={foto} alt={`Carteira ${index + 1}`} className="w-full h-auto rounded-xl object-contain" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TELA: GALERIA DE FOTOS GERAIS DO CLUBE */}
        {telaAtiva === 'galeria-clube' && (
          <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-200">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2">Álbum de Fotos</h2>
            <p className="text-xl text-slate-500 mb-8 border-b pb-4">
              Registros, eventos e momentos do clube
            </p>

            {fotosClube.length === 0 ? (
              <div className="bg-yellow-100 text-yellow-800 p-8 rounded-xl text-xl font-bold text-center border-2 border-yellow-300">
                Nenhuma foto encontrada. Adicione as imagens na pasta "src/fotos-clube" no seu projeto.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {fotosClube.map((foto, index) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-2xl shadow-xl border border-slate-200 hover:shadow-2xl transition-all">
                    <img src={foto} alt={`Foto do Clube ${index + 1}`} className="w-full h-auto rounded-xl object-contain" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Rodapé explicativo simples */}
      <footer className="max-w-4xl mx-auto text-center mt-12 text-slate-500 font-medium text-lg">
        Dica: Os links com a seta (↗) serão abertos em uma nova aba do navegador de forma segura.
      </footer>
    </div>
  );
}