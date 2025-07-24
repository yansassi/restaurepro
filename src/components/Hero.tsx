import React from 'react';
import { Shield, Clock, Award } from 'lucide-react';

interface HeroProps {
  onStartClick: () => void;
}

const Hero = ({ onStartClick }: HeroProps) => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Seção Antes e Depois */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Veja a Diferença que Fazemos
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-red-100 px-4 py-2">
                <span className="text-red-800 font-semibold text-sm">ANTES</span>
              </div>
              <div className="p-4">
                <img 
                  src="/fotoantiga.jpg" 
                  alt="Foto antiga antes da restauração" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-green-100 px-4 py-2">
                <span className="text-green-800 font-semibold text-sm">DEPOIS</span>
              </div>
              <div className="p-4">
                <img 
                  src="/restaurada.jpg" 
                  alt="Foto restaurada depois do tratamento" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Reviva suas
            <span className="text-blue-600"> Memórias</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Restauramos suas fotos antigas com tecnologia avançada e cuidado artesanal. 
            Transforme suas lembranças desbotadas em imagens vibrantes novamente.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center space-x-2 text-green-600">
              <Shield className="h-5 w-5" />
              <span className="font-medium">100% Seguro</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Entrega em 24h</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-600">
              <Award className="h-5 w-5" />
              <span className="font-medium">Garantia de Satisfação</span>
            </div>
          </div>

          <button
            onClick={onStartClick}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Restaurar Minha Foto • R$ 5,00
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            Pagamento seguro • Sem mensalidades • Satisfação garantida
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;