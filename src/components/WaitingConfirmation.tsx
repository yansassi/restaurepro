import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, Loader2, Camera } from 'lucide-react';
import { CustomerData } from './CustomerForm';
import { Plan } from '../types/Plan';
import { supabase } from '../lib/supabase';

interface WaitingConfirmationProps {
  customerData: CustomerData;
  selectedPlan: Plan;
  orderNumber: string;
  onPaymentConfirmed: () => void;
}

const WaitingConfirmation = ({ customerData, selectedPlan, orderNumber, onPaymentConfirmed }: WaitingConfirmationProps) => {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'confirmed' | 'failed'>('pending');
  const [isChecking, setIsChecking] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const checkPaymentStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('payment_status')
        .eq('order_number', orderNumber)
        .single();

      if (error) {
        console.error('Error checking payment status:', error);
        return 'pending';
      }

      return data?.payment_status || 'pending';
    } catch (error) {
      console.error('Error checking payment status:', error);
      return 'pending';
    }
  };

  useEffect(() => {
    // Timer para contar tempo decorrido
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    // Polling para verificar status do pagamento
    const pollInterval = setInterval(async () => {
      const status = await checkPaymentStatus();
      setPaymentStatus(status);

      if (status === 'confirmed') {
        clearInterval(pollInterval);
        clearInterval(timer);
        setIsChecking(false);
        setTimeout(() => {
          onPaymentConfirmed();
        }, 2000);
      } else if (status === 'failed') {
        clearInterval(pollInterval);
        setIsChecking(false);
      }
    }, 5000); // Check every 5 seconds

    // Stop polling after 10 minutes
    const timeout = setTimeout(() => {
      clearInterval(pollInterval);
      clearInterval(timer);
      setIsChecking(false);
    }, 600000); // 10 minutes

    return () => {
      clearInterval(pollInterval);
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [orderNumber, onPaymentConfirmed]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'confirmed':
        return <CheckCircle className="h-16 w-16 text-green-600" />;
      case 'failed':
        return <AlertCircle className="h-16 w-16 text-red-600" />;
      default:
        return <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />;
    }
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case 'confirmed':
        return {
          title: 'Pagamento Confirmado!',
          subtitle: 'Redirecionando para confirmação final...',
          color: 'text-green-800'
        };
      case 'failed':
        return {
          title: 'Pagamento Não Confirmado',
          subtitle: 'Entre em contato conosco se você já efetuou o pagamento',
          color: 'text-red-800'
        };
      default:
        return {
          title: 'Aguardando Confirmação do Pagamento',
          subtitle: 'Nosso sistema está verificando automaticamente seu pagamento',
          color: 'text-blue-800'
        };
    }
  };

  const statusInfo = getStatusMessage();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          {/* Status Icon */}
          <div className="mb-6">
            {getStatusIcon()}
          </div>

          {/* Status Title */}
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${statusInfo.color}`}>
            {statusInfo.title}
          </h2>
          
          <p className="text-xl text-gray-600 mb-8">
            {statusInfo.subtitle}
          </p>

          {/* Order Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div>
                <h3 className="font-semibold text-blue-900 mb-3">Informações do Pedido:</h3>
                <p className="text-blue-800 font-medium">Pedido: #{orderNumber}</p>
                <p className="text-blue-800">Plano: {selectedPlan.name}</p>
                <p className="text-blue-800">{selectedPlan.images} {selectedPlan.images === 1 ? 'foto' : 'fotos'}</p>
                <p className="text-blue-800 font-medium">Valor: R$ {selectedPlan.price},00</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-blue-900 mb-3">Cliente:</h3>
                <p className="text-blue-800">{customerData.name}</p>
                <p className="text-blue-800">{customerData.email}</p>
                <p className="text-blue-800">{customerData.phone}</p>
              </div>
            </div>
          </div>

          {/* Status-specific content */}
          {paymentStatus === 'pending' && isChecking && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <span className="text-yellow-800 font-medium">
                    Verificando há {formatTime(timeElapsed)}
                  </span>
                </div>
                <p className="text-yellow-800 text-sm">
                  O sistema verifica automaticamente a confirmação do pagamento a cada 5 segundos.
                  Isso pode levar alguns minutos dependendo do método de pagamento utilizado.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Camera className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800 font-medium">Próximos Passos</span>
                </div>
                <ul className="text-blue-800 text-sm space-y-2 text-left max-w-md mx-auto">
                  <li>• ✅ Pagamento efetuado</li>
                  <li>• 🔄 Aguardando confirmação automática</li>
                  <li>• 📸 Início da restauração das fotos</li>
                  <li>• 📧 Entrega em até 24h por email/WhatsApp</li>
                </ul>
              </div>
            </div>
          )}

          {paymentStatus === 'confirmed' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-green-800 font-medium mb-2">
                ✅ Pagamento confirmado com sucesso!
              </p>
              <p className="text-green-700">
                Nossa equipe iniciará a restauração das suas fotos imediatamente.
              </p>
            </div>
          )}

          {paymentStatus === 'failed' && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <p className="text-red-800 font-medium mb-2">
                  ❌ Não foi possível confirmar o pagamento
                </p>
                <p className="text-red-700 text-sm">
                  Se você já efetuou o pagamento, entre em contato conosco com o número do pedido.
                </p>
              </div>
              
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          )}

          {!isChecking && paymentStatus === 'pending' && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-gray-800 font-medium mb-2">
                ⏰ Tempo limite de verificação atingido
              </p>
              <p className="text-gray-700 text-sm mb-4">
                Se você já efetuou o pagamento, aguarde alguns minutos e recarregue a página,
                ou entre em contato conosco.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                Recarregar Página
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WaitingConfirmation;