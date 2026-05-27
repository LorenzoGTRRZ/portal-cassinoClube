import { useState } from 'react';

// 1. MÁGICA DO VITE: Puxa as fotos das CARTEIRAS
// MÁGICA DO VITE: Puxa as fotos das CARTEIRAS (agora aceitando maiúsculas)
const modulosCarteiras = import.meta.glob('./fotos-carteiras/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });
const fotosCarteiras = Object.values(modulosCarteiras).map((modulo) => modulo.default);

// MÁGICA DO VITE: Puxa TODAS as fotos de todas as subpastas dentro de 'fotos-clube'
const modulosFotosClube = import.meta.glob('./fotos-clube/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });

// Agrupa as fotos pela subpasta de forma automática
const albunsClube = {};
for (const caminho in modulosFotosClube) {
  const nomePasta = caminho.split('/')[2]; 
  if (!albunsClube[nomePasta]) {
    albunsClube[nomePasta] = [];
  }
  albunsClube[nomePasta].push(modulosFotosClube[caminho].default);
}

// Lista oficial dos Álbuns
const LISTA_ALBUNS = [
  { id: 'carnaval-2008', titulo: 'Carnaval 2008' },
  { id: 'carnaval-2009', titulo: 'Carnaval 2009' },
  { id: 'carnaval-2011', titulo: 'Carnaval 2011' },
  { id: 'cassino', titulo: 'Cassino' },
  { id: 'cassino-fotos', titulo: 'Cassino Fotos' },
  { id: 'clube-cassino', titulo: 'Clube Cassino' },
  { id: 'de-itaqui', titulo: 'De Itaqui' },
  { id: 'nero', titulo: 'Nero' },
  { id: 'reformas-cassino-2009', titulo: 'Reformas Cassino 2009' },
  { id: 'show-karine-cassino', titulo: 'Show Karine Cassino' },
  { id: 'show-karine-cassino-2', titulo: 'Show Karine Cassino 2' },
  { id: 'show-karine-cassino-3', titulo: 'Show Karine Cassino 3' },
  { id: 'terca-2008', titulo: 'Terça 2008' }
];

// Links do Google Drive
const LINKS_DRIVE = {
  documentos: {
    listaefetivos: "https://drive.google.com/drive/folders/13Fd6tEaUtVMJTujJWzvjLRuxnCORClX6?usp=sharing",
    docgerais: "https://drive.google.com/drive/folders/150TlvA2aF4tlY85VEGYrHrTD0g1uG0gk?usp=sharing",
    Sociosefetivosemmuitoatraso: "https://drive.google.com/drive/folders/1jkTWla-1LkzTPq8yatojSMolaqQ_Nt17?usp=sharing",
    sociosremidos: "https://drive.google.com/drive/folders/1xvI-4-yA_-J47Y_3ctLdsZxP8E0KqHmG?usp=sharing",
  },
  fotos: {
    bingos: "https://drive.google.com/drive/folders/SEU_LINK_AQUI_5",
    ingressos: "https://drive.google.com/drive/folders/SEU_LINK_AQUI_7",
  },
  sss: "https://drive.google.com/drive/folders/SEU_LINK_AQUI_8"
};

export default function App() {
  const [telaAtiva, setTelaAtiva] = useState('inicio');
  const [albumSelecionado, setAlbumSelecionado] = useState(null);
  
  // NOVO ESTADO: Controla qual foto está ampliada na tela
  const [fotoExpandida, setFotoExpandida] = useState(null);

  // Componente interno para evitar repetir o código da Galeria
  const GradeDeFotos = ({ fotos }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
      {fotos.map((foto, index) => (
        <div 
          key={index} 
          className="group relative aspect-square overflow-hidden rounded-xl shadow-sm border border-slate-200 bg-slate-100 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          onClick={() => setFotoExpandida(foto)}
        >
          <img 
            src={foto} 
            alt={`Miniatura ${index + 1}`} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      ))}
    </div>
  );

  return (
    // Fundo geral do site com gradiente sutil
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 font-sans p-4 sm:p-6 md:p-12 selection:bg-blue-300 text-slate-800">
      
      {/* CABEÇALHO ELEGANTE */}
      <header className="max-w-6xl mx-auto text-center mb-10 bg-gradient-to-r from-blue-900 to-slate-800 text-white p-8 md:p-12 rounded-[2rem] shadow-2xl border-b-8 border-amber-500">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 drop-shadow-md">
          Acervo do Clube
        </h1>
        <p className="text-lg md:text-2xl text-blue-100 font-medium max-w-2xl mx-auto">
          Sistema de organização de documentos, atas e registros fotográficos.
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        
        {/* BOTÃO VOLTAR - Estilizado para ficar muito evidente e bonito */}
        {telaAtiva !== 'inicio' && (
          <button
            onClick={() => {
              if (telaAtiva === 'visualizar-album') setTelaAtiva('fotos');
              else setTelaAtiva('inicio');
            }}
            className="w-full mb-8 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 text-xl md:text-2xl font-black py-5 px-8 rounded-2xl shadow-lg border-b-4 border-amber-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
          >
            ← {telaAtiva === 'visualizar-album' ? 'VOLTAR PARA A LISTA DE ÁLBUNS' : 'VOLTAR AO MENU PRINCIPAL'}
          </button>
        )}

        {/* TELA INICIAL */}
        {telaAtiva === 'inicio' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <button
              onClick={() => setTelaAtiva('socios')}
              className="bg-white hover:bg-slate-50 p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all border border-slate-200 group flex flex-col items-center justify-center text-center gap-4"
            >
              <div className="bg-blue-100 text-blue-700 p-6 rounded-full group-hover:scale-110 transition-transform">
                <span className="text-6xl block">📁</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Secretaria</h2>
                <p className="text-slate-500 text-lg">Pastas de sócios e listagens gerais</p>
              </div>
            </button>

            <button
              onClick={() => setTelaAtiva('fotos')}
              className="bg-white hover:bg-slate-50 p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all border border-slate-200 group flex flex-col items-center justify-center text-center gap-4"
            >
              <div className="bg-emerald-100 text-emerald-700 p-6 rounded-full group-hover:scale-110 transition-transform">
                <span className="text-6xl block">📸</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Galeria Visual</h2>
                <p className="text-slate-500 text-lg">Fotos do clube, eventos e álbuns antigos</p>
              </div>
            </button>

            <a
              href={LINKS_DRIVE.sss}
              target="_blank"
              rel="noopener noreferrer"
              className="md:col-span-2 bg-slate-800 hover:bg-slate-900 p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all border border-slate-700 group flex flex-col md:flex-row items-center justify-center text-center gap-6"
            >
              <div className="bg-slate-700 text-white p-5 rounded-full group-hover:scale-110 transition-transform">
                <span className="text-5xl block">📄</span>
              </div>
              <div className="text-left">
                <h2 className="text-3xl font-bold text-white mb-2">Documentos Gerais e Atas</h2>
                <p className="text-slate-300 text-lg">Acessar arquivos históricos completos (Abre no Google Drive) ↗</p>
              </div>
            </a>
          </div>
        )}

        {/* TELA DE SÓCIOS */}
        {telaAtiva === 'socios' && (
          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-200">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-8 flex items-center gap-4">
              <span className="text-blue-600">📁</span> Arquivos de Sócios
            </h2>
            
            <button 
              onClick={() => setTelaAtiva('galeria-carteiras')}
              className="w-full mb-10 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-2xl font-bold p-8 rounded-2xl shadow-sm border-2 border-indigo-200 transition-all flex items-center justify-center gap-4"
            >
              <span className="text-4xl">🪪</span> VER FOTOS DAS CARTEIRAS NO SITE
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { link: LINKS_DRIVE.documentos.docgerais, titulo: "Documentos Gerais" },
                { link: LINKS_DRIVE.documentos.Sociosefetivosemmuitoatraso, titulo: "Sócios efetivos em atraso" },
                { link: LINKS_DRIVE.documentos.sociosremidos, titulo: "Sócios Remidos" },
                { link: LINKS_DRIVE.documentos.listaefetivos, titulo: "Lista Efetivos" }
              ].map((item, i) => (
                <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="bg-slate-50 hover:bg-blue-50 text-slate-800 text-xl font-bold p-6 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors flex justify-between items-center group">
                  <span>📄 {item.titulo}</span>
                  <span className="text-blue-500 opacity-50 group-hover:opacity-100">↗</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* TELA DE FOTOS E ÁLBUNS */}
        {telaAtiva === 'fotos' && (
          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-6 flex items-center gap-3 border-b pb-4">
              <span className="text-emerald-600">📂</span> Pastas de Eventos (Drive)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              <a href={LINKS_DRIVE.fotos.bingos} target="_blank" rel="noopener noreferrer" className="bg-slate-50 hover:bg-emerald-50 text-slate-800 text-xl font-bold p-6 rounded-xl border border-slate-200 hover:border-emerald-300 flex justify-between items-center group">
                Abrir: Pastas dos Bingos <span className="text-emerald-500 opacity-50 group-hover:opacity-100">↗</span>
              </a>
              <a href={LINKS_DRIVE.fotos.ingressos} target="_blank" rel="noopener noreferrer" className="bg-slate-50 hover:bg-emerald-50 text-slate-800 text-xl font-bold p-6 rounded-xl border border-slate-200 hover:border-emerald-300 flex justify-between items-center group">
                Abrir: Ingressos e Jantares <span className="text-emerald-500 opacity-50 group-hover:opacity-100">↗</span>
              </a>
            </div>

            <h2 className="text-3xl font-extrabold text-slate-800 mb-6 flex items-center gap-3 border-b pb-4">
              <span className="text-pink-600">📸</span> Álbuns de Fotos (No Site)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {LISTA_ALBUNS.map(album => (
                <button
                  key={album.id}
                  onClick={() => {
                    setAlbumSelecionado(album.id);
                    setTelaAtiva('visualizar-album');
                  }}
                  className="bg-white hover:bg-pink-50 text-slate-800 text-lg font-bold p-5 rounded-xl shadow-sm border border-slate-200 hover:border-pink-300 transition-all flex items-center justify-between group"
                >
                  <span className="truncate pr-2">🖼️ {album.titulo}</span>
                  <span className="text-pink-500 opacity-30 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all">➔</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TELAS DE VISUALIZAÇÃO COM O NOVO GRID */}
        
        {/* ÁLBUM ESPECÍFICO */}
        {telaAtiva === 'visualizar-album' && (
          <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-xl border border-slate-200">
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">
              {LISTA_ALBUNS.find(a => a.id === albumSelecionado)?.titulo}
            </h2>
            <p className="text-lg text-slate-500 mb-8 border-b pb-4">Clique em qualquer imagem para ampliar.</p>

            {(!albunsClube[albumSelecionado] || albunsClube[albumSelecionado].length === 0) ? (
              <div className="bg-yellow-50 text-yellow-800 p-8 rounded-xl text-lg font-medium text-center border border-yellow-200">
                Nenhuma foto encontrada neste álbum.
              </div>
            ) : (
              <GradeDeFotos fotos={albunsClube[albumSelecionado]} />
            )}
          </div>
        )}

        {/* CARTEIRAS */}
        {telaAtiva === 'galeria-carteiras' && (
          <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-xl border border-slate-200">
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">Carteiras do Clube</h2>
            <p className="text-lg text-slate-500 mb-8 border-b pb-4">Sócio Efetivo, Remido, Dependentes e Cortesias. Clique para ampliar.</p>

            {fotosCarteiras.length === 0 ? (
              <div className="bg-yellow-50 text-yellow-800 p-8 rounded-xl text-lg font-medium text-center border border-yellow-200">
                Nenhuma carteira encontrada.
              </div>
            ) : (
              <GradeDeFotos fotos={fotosCarteiras} />
            )}
          </div>
        )}

      </main>

      {/* ========================================== */}
      {/* MODAL DE AMPLIAÇÃO (LIGHTBOX) OVERLAY      */}
      {/* ========================================== */}
      {fotoExpandida && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setFotoExpandida(null)} // Clicar no fundo escuro fecha a foto
        >
          {/* Botão Fechar Gigante */}
          <button 
            onClick={() => setFotoExpandida(null)}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 w-14 h-14 bg-white/10 hover:bg-red-500 text-white rounded-full flex items-center justify-center text-4xl pb-1 transition-colors border border-white/20"
            title="Fechar ampliação"
          >
            &times;
          </button>
          
          {/* Imagem Ampliada */}
          <img 
            src={fotoExpandida} 
            alt="Ampliação" 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl ring-1 ring-white/20"
            onClick={(e) => e.stopPropagation()} // Impede que clicar dentro da foto feche o modal
          />
        </div>
      )}

    </div>
  );
}