import { CHECKOUT_STEP_1, ACCOUNT } from '@/constants/routes';
import { Form, Formik } from 'formik';
import { displayActionMessage } from '@/helpers/utils';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import PropType from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { StepTracker } from '../components';
import withCheckout from '../hoc/withCheckout';
import CreditPayment from './CreditPayment';
import PayPalPayment from './PayPalPayment';
import Total from './Total';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'El nombre debe tener al menos 4 caracteres')
    .required('El nombre es requerido'),
  cardnumber: Yup.string()
    .min(13, 'Numero de la tarjeta debe tener al menos 13 digitos')
    .max(19, 'Numero de la tarjeta debe tener como maximo 19 digitos')
    .required('Numero de tarjeta es requerido'),
  expiry: Yup.date()
    .required('La fecha de vencimiento es requerida'),
  ccv: Yup.string()
    .min(3, 'CCV debe tener al menos 3 digitos')
    .max(4, 'CCV debe tener como maximo 4 digitos')
    .required('CCV es requerido'),
  type: Yup.string().required('Por favor selecciona un metodo de pago')
});

const Payment = ({ shipping, payment, subtotal, basket }) => {
  useDocumentTitle('Pago | Dolfino');
  useScrollTop();
  const profile = useSelector((state) => state.profile);

  const initFormikValues = {
    name: payment.name || '',
    cardnumber: payment.cardnumber || '',
    expiry: payment.expiry || '',
    ccv: payment.ccv || '',
    type: payment.type || 'paypal'
  };

  const onConfirm = () => {
    let result = axios.post('http://localhost:8000/api/purchase',{
      usuario: profile.email,
      basket,
      subtotal,
      payment,
      shipping
    })
    if(result){
      displayActionMessage('Compra realizada','success');
      return <Redirect to={ACCOUNT} />
    }else{
      displayActionMessage('Compra rechazada','info');
    }
    
  };

  if (!shipping || !shipping.isDone) {
    return <Redirect to={CHECKOUT_STEP_1} />;
  }
  return (
    <div className="checkout">
      <StepTracker current={3} />
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        onSubmit={onConfirm}
      >
        {() => (
          <Form className="checkout-step-3">
            <CreditPayment />
            <Total
              isInternational={shipping.isInternational}
              subtotal={subtotal}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

Payment.propTypes = {
  shipping: PropType.shape({
    isDone: PropType.bool,
    isInternational: PropType.bool
  }).isRequired,
  payment: PropType.shape({
    name: PropType.string,
    cardnumber: PropType.string,
    expiry: PropType.string,
    ccv: PropType.string,
    type: PropType.string
  }).isRequired,
  subtotal: PropType.number.isRequired,
  basket: PropType.arrayOf(PropType.object).isRequired,

};

export default withCheckout(Payment);
