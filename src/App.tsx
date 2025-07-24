import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import UploadSection from './components/UploadSection';
import CustomerForm, { CustomerData } from './components/CustomerForm';
import PaymentSection from './components/PaymentSection';
import Success from './components/Success';
import Footer from './components/Footer';

type Step = 'landing' | 'upload' | 'form' | 'payment' | 'success';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('landing');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [orderNumber] = useState(() => Math.random().toString(36).substr(2, 9).toUpperCase());

  const handleStartClick = () => {
    setCurrentStep('upload');
    // Scroll to upload section
    setTimeout(() => {
      document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleUploadNext = () => {
    if (selectedFile) {
      setCurrentStep('form');
    }
  };

  const handleFormSubmit = (data: CustomerData) => {
    setCustomerData(data);
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = () => {
    setCurrentStep('success');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'upload':
        return (
          <UploadSection
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            onNext={handleUploadNext}
          />
        );
      case 'form':
        return <CustomerForm onSubmit={handleFormSubmit} />;
      case 'payment':
        return (
          <PaymentSection
            customerData={customerData!}
            selectedFile={selectedFile!}
            onPaymentSuccess={handlePaymentSuccess}
          />
        );
      case 'success':
        return (
          <Success
            customerData={customerData!}
            orderNumber={orderNumber}
          />
        );
      default:
        return (
          <>
            <Hero onStartClick={handleStartClick} />
            <HowItWorks />
            <Testimonials />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {renderCurrentStep()}
      {currentStep !== 'success' && <Footer />}
    </div>
  );
}

export default App;