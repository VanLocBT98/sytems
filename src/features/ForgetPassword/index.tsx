import { Spin } from 'antd';
import React, { useState } from 'react';

import EmailForget, { ForgetPasswordFormTypes } from './EmailForget';
import Success from './Success';

import UnAuthentication from 'common/components/templates/UnAuthentication';

const ForgetPassword: React.FC = () => {
  const [step, setStep] = useState(0);

  const handleSubmitEmail = (data: ForgetPasswordFormTypes) => {
    console.log('forget: ', data);
    setStep(1);
  };

  const renderTemplate = () => {
    switch (step) {
      case 0:
        return <EmailForget onSubmit={handleSubmitEmail} />;
      case 1:
        return <Success handleResend={() => console.log('Gui lai')} />;
      default:
        return null;
    }
  };
  return (
    <UnAuthentication>
      <div className={`p-forgetPassword${step === 1 ? ' success' : ''}`}>
        <Spin spinning={false}>
          <div className="p-forgetPassword_context">
            {renderTemplate()}
          </div>
        </Spin>
      </div>
    </UnAuthentication>
  );
};

export default ForgetPassword;
