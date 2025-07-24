import React, { useState } from 'react';
import { Shield, ExternalLink } from 'lucide-react';
import { CustomerData } from './CustomerForm';
import { Plan } from '../types/Plan';

interface PaymentSectionProps {
  customerData: CustomerData;
  selectedFiles: File[];
  selectedPlan: Plan;
  onPaymentSuccess: () => void;
}

const PaymentSection = ({ customerData, selectedFiles, selectedPlan, onPaymentSuccess }: PaymentSectionProps) => {
  const handlePaymentCompleted = () => {
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

        <div className="max-w-4xl mx-auto">
          {/* Pagamento */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              <ExternalLink className="h-6 w-6 inline mr-2" />
              Pagamento
            </h3>

            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <Shield className="h-4 w-4 inline mr-1" />
                  Após completar o pagamento de R$ {selectedPlan.price},00 para {selectedPlan.images} {selectedPlan.images === 1 ? 'foto' : 'fotos'}, clique no botão abaixo
                </p>
              </div>

              {/* Iframe do Cakto */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <iframe
                  src={selectedPlan.paymentLink}
                  width="100%"
                  height="900"
                  frameBorder="0"
                  title="Pagamento Cakto"
                  className="w-full"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <Shield className="h-4 w-4 inline mr-1" />
                  Após completar o pagamento acima, clique no botão abaixo para continuar
                </p>
              </div>

              <button
                onClick={handlePaymentCompleted}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg transition-colors"
              >
                Efetuei o Pagamento
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Clique apenas após completar o pagamento acima
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;