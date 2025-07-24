import React, { useState } from 'react';
import { Shield, Clock, CheckCircle, ExternalLink } from 'lucide-react';
import { CustomerData } from './CustomerForm';

interface PaymentSectionProps {
  customerData: CustomerData;
  selectedFile: File;
  onPaymentSuccess: () => void;
}

const PaymentSection = ({ customerData, selectedFile, onPaymentSuccess }: PaymentSectionProps) => {
  const handleContinue = () => {
    onPaymentSuccess();
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Finalizar Pedido
          </h2>
          <p className="text-xl text-gray-600">
            Pagamento seguro e garantido
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Resumo do Pedido */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Resumo do Pedido</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Restauração de 1 foto</span>
                <span className="font-semibold">R$ 5,00</span>
              </div>
              
              <hr className="border-gray-200" />
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-blue-600">R$ 5,00</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Seus dados:</h4>
              <p className="text-sm text-gray-600">{customerData.name}</p>
              <p className="text-sm text-gray-600">{customerData.email}</p>
              <p className="text-sm text-gray-600">{customerData.phone}</p>
              <p className="text-sm text-blue-600">
                Entrega por: {customerData.deliveryMethod.map(method => 
                  method === 'whatsapp' ? 'WhatsApp' : 'Email'
                ).join(' e ')}
              </p>
              {customerData.imageUrl && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-900 mb-2">Sua foto:</p>
                  <img 
                    src={customerData.imageUrl} 
                    alt="Foto enviada" 
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center space-x-2 text-green-600">
                <Shield className="h-4 w-4" />
                <span className="text-sm">Pagamento 100% seguro</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Entrega em até 24 horas</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Garantia de satisfação</span>
              </div>
            </div>
          </div>

          {/* Pagamento */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              <ExternalLink className="h-6 w-6 inline mr-2" />
              Pagamento
            </h3>

            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <Shield className="h-4 w-4 inline mr-1" />
                  Complete o pagamento na janela abaixo de forma segura
                </p>
              </div>

              {/* Iframe do Cakto */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <iframe
                  src="https://pay.cakto.com.br/n2typzf_493515"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  title="Pagamento Cakto"
                  className="w-full"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Após completar o pagamento acima, clique no botão abaixo para continuar
                </p>
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-4 rounded-lg transition-colors"
              >
                Já Paguei / Continuar
              </button>

              <p className="text-xs text-gray-500 text-center">
                Clique apenas após completar o pagamento na janela acima
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;