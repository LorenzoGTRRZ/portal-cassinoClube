import { useState } from 'react';

// 1. MÁGICA DO VITE: Puxa as fotos das CARTEIRAS
const modulosCarteiras = import.meta.glob('./fotos-carteiras/*.{jpg,jpeg,png,webp}', { eager: true });
const fotosCarteiras = Object.values(modulosCarteiras).map((modulo) => modulo.default);

// 2. MÁGICA DO VITE: Puxa TODAS as fotos de todas as subpastas dentro de 'fotos-clube'
const modulosFotosClube = import.meta.glob('./fotos-clube/*/*.{jpg,jpeg,png,webp}', { eager: true });

// Agrupa as fotos pela subpasta de forma automática
const albunsClube = {};
for (const caminho in modulosFotosClube) {
  // O caminho é algo como "./fotos-clube/carnaval-2009/foto1.jpg"
  const nomePasta = caminho.split('/')[2]; 
  if (!albunsClube[nomePasta]) {
    albunsClube[nomePasta] = [];
  }
  albunsClube[nomePasta].push(modulosFotosClube[caminho].default);
}

// Lista oficial dos Álbuns e como o nome vai aparecer no botão para o seu pai
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

// Links do Google Drive (Mantidos exatamente iguais)
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
  const [albumSelecionado, setAlbumSelecionado] = useState(null); // Guarda qual álbum ele quer ver

  return (
    <div className="min-h-screen bg-slate-100 font-sans p-6 md:p-12 selection:bg-blue-200">
      
      {/* Cabeçalho */}
      <header className="max-w-5xl mx-auto text-center mb-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
          Portal de Arquivos do Clube
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium">
          Clique nos botões grandes abaixo para acessar os documentos e fotos.
        </p>
      </header>

      <main className="max-w-5xl mx-auto">
        
        {/* Lógica inteligente do botão voltar */}
        {telaAtiva !== 'inicio' && (
          <button
            onClick={() => {
              if (telaAtiva === 'visualizar-album') setTelaAtiva('fotos');
              else setTelaAtiva('inicio');
            }}
            className="w-full mb-8 bg-amber-500 hover:bg-amber-600 text-slate-900 text-2xl font-black py-5 px-8 rounded-2xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-3"
          >
            ← {telaAtiva === 'visualizar-album' ? 'VOLTAR PARA A LISTA DE ÁLBUNS' : 'CLIQUE AQUI PARA VOLTAR AO INÍCIO'}
          </button>
        )}

        {/* TELA INICIAL */}
        {telaAtiva === 'inicio' && (
          <div className="grid grid-cols-1 gap-6">
            <button
              onClick={() => setTelaAtiva('socios')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-3xl font-bold p-12 rounded-3xl shadow-lg transition-all text-left flex items-center justify-between border-4 border-blue-200"
            >
              <span>📁 Documentos do Clube</span>
              <span className="text-4xl">➔</span>
            </button>

            <button
              onClick={() => setTelaAtiva('fotos')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-3xl font-bold p-12 rounded-3xl shadow-lg transition-all text-left flex items-center justify-between border-4 border-emerald-200"
            >
              <span>📸 Fotos e Álbuns</span>
              <span className="text-4xl">➔</span>
            </button>

            <a
              href={LINKS_DRIVE.sss}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white text-3xl font-bold p-12 rounded-3xl shadow-lg transition-all text-left flex items-center justify-between border-4 border-purple-200 block"
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
            
            <button 
              onClick={() => setTelaAtiva('galeria-carteiras')}
              className="w-full mb-6 bg-indigo-600 hover:bg-indigo-700 text-white text-2xl font-bold p-6 rounded-xl shadow-lg border-2 border-indigo-300 transition-all flex items-center justify-center gap-3"
            >
              📸 VER FOTOS DAS CARTEIRAS NO SITE
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href={LINKS_DRIVE.documentos.docgerais} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-900 text-white text-2xl font-bold p-6 rounded-xl block text-center shadow">
                📄 Documentos Gerais ↗
              </a>
              <a href={LINKS_DRIVE.documentos.Sociosefetivosemmuitoatraso} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-900 text-white text-2xl font-bold p-6 rounded-xl block text-center shadow">
                📄 Sócios efetivos em atraso ↗
              </a>
              <a href={LINKS_DRIVE.documentos.sociosremidos} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-900 text-white text-2xl font-bold p-6 rounded-xl block text-center shadow">
                📄 Sócios Remidos ↗
              </a>
              <a href={LINKS_DRIVE.documentos.listaefetivos} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-900 text-white text-2xl font-bold p-6 rounded-xl block text-center shadow">
                📄 Lista Efetivos ↗
              </a>
            </div>
          </div>
        )}

        {/* TELA DE FOTOS (Lista de Álbuns) */}
        {telaAtiva === 'fotos' && (
          <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-6 border-b pb-4">Pastas de Eventos (Drive):</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <a href={LINKS_DRIVE.fotos.bingos} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-900 text-white text-xl font-bold p-6 rounded-xl block text-center shadow">
                Abrir: Pastas dos Bingos ↗
              </a>
              <a href={LINKS_DRIVE.fotos.ingressos} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-900 text-white text-xl font-bold p-6 rounded-xl block text-center shadow">
                Abrir: Ingressos e Jantares ↗
              </a>
            </div>

            <h2 className="text-3xl font-extrabold text-slate-800 mb-6 border-b pb-4">Álbuns de Fotos (No Site):</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LISTA_ALBUNS.map(album => (
                <button
                  key={album.id}
                  onClick={() => {
                    setAlbumSelecionado(album.id);
                    setTelaAtiva('visualizar-album');
                  }}
                  className="bg-pink-600 hover:bg-pink-700 text-white text-xl font-bold p-5 rounded-xl shadow border-2 border-pink-300 transition-all flex items-center justify-between"
                >
                  <span>📸 {album.titulo}</span>
                  <span className="text-2xl">➔</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TELA: VISUALIZAR ÁLBUM ESPECÍFICO */}
        {telaAtiva === 'visualizar-album' && (
          <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-200">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2">
              {LISTA_ALBUNS.find(a => a.id === albumSelecionado)?.titulo}
            </h2>
            <p className="text-xl text-slate-500 mb-8 border-b pb-4">
              Fotos do evento
            </p>

            {/* Verifica se a pasta existe e tem fotos */}
            {(!albunsClube[albumSelecionado] || albunsClube[albumSelecionado].length === 0) ? (
              <div className="bg-yellow-100 text-yellow-800 p-8 rounded-xl text-xl font-bold text-center border-2 border-yellow-300">
                Nenhuma foto encontrada neste álbum. Verifique se as imagens estão na pasta "src/fotos-clube/{albumSelecionado}".
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {albunsClube[albumSelecionado].map((foto, index) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl transition-all">
                    <img src={foto} alt={`Foto ${index + 1}`} className="w-full h-auto rounded-xl object-contain" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TELA: GALERIA DE CARTEIRAS */}
        {telaAtiva === 'galeria-carteiras' && (
          <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-200">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2">Carteiras do Clube</h2>
            <p className="text-xl text-slate-500 mb-8 border-b pb-4">Sócio Efetivo, Remido, Dependentes e Cortesias</p>

            {fotosCarteiras.length === 0 ? (
              <div className="bg-yellow-100 text-yellow-800 p-8 rounded-xl text-xl font-bold text-center border-2 border-yellow-300">
                Nenhuma carteira encontrada. Adicione as imagens na pasta "src/fotos-carteiras".
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

      </main>
    </div>
  );
}