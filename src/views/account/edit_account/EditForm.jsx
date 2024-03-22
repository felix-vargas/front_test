import { ArrowLeftOutlined, CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { CustomInput, CustomMobileInput } from '@/components/formik';
import { ACCOUNT } from '@/constants/routes';
import { Field, useFormikContext } from 'formik';
import PropType from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

const EditForm = ({ isLoading, authProvider }) => {
  const history = useHistory();
  const { values, submitForm } = useFormikContext();

  return (
    <div className="user-profile-details">
      <Field
        disabled={isLoading}
        name="fullname"
        type="text"
        label="* Nombre completo"
        placeholder="Ingrese su nombre completo"
        component={CustomInput}
        style={{ textTransform: 'capitalize' }}
      />
      <Field
        disabled={authProvider !== 'password' || isLoading}
        name="email"
        type="email"
        label="* Email"
        placeholder="correo@ejemplo.com"
        component={CustomInput}
      />
      <Field
        disabled={isLoading}
        name="address"
        type="text"
        label="Direccion (Sera utilizado en despacho)"
        placeholder="Av. Francisco Villagra 4050, Nunoa"
        component={CustomInput}
        style={{ textTransform: 'capitalize' }}
      />
      <CustomMobileInput
        defaultValue={values.mobile}
        name="mobile"
        disabled={isLoading}
        label="Numero de telefono (Sera utilizado en despacho)"
      />
      <br />
      <div className="edit-user-action">
        <button
          className="button button-muted w-100-mobile"
          disabled={isLoading}
          onClick={() => history.push(ACCOUNT)}
          type="button"
        >
          <ArrowLeftOutlined />
          &nbsp;
          Volver
        </button>
        <button
          className="button w-100-mobile"
          disabled={isLoading}
          onClick={submitForm}
          type="button"
        >
          {isLoading ? <LoadingOutlined /> : <CheckOutlined />}
                    &nbsp;
          {isLoading ? 'Actualizando Perfil...' : 'Actualizar Perfil'}
        </button>
      </div>
    </div>
  );
};

EditForm.propTypes = {
  isLoading: PropType.bool.isRequired,
  authProvider: PropType.string.isRequired
};

export default EditForm;
