import { ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons';
import { SocialLogin } from '@/components/common';
import { CustomInput } from '@/components/formik';
import { SIGNIN } from '@/constants/routes';
import { Field, Form, Formik } from 'formik';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import PropType from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '@/redux/actions/authActions';
import { setAuthenticating, setAuthStatus } from '@/redux/actions/miscActions';
import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email no valido.')
    .required('Email requerido.'),
  password: Yup.string()
    .required('Password requerido.')
    .min(8, 'Password debe tener un largo de al menos 8 letras.')
    .matches(/[A-Z\W]/g, 'Password debe contener al menos una letra mayuscula.'),
  fullname: Yup.string()
    .required('Nombre completo no ingresado.')
    .min(4, 'Nombre debe ser de al menos 4 letras.')
});

const SignUp = ({ history }) => {
  const { isAuthenticating, authStatus } = useSelector((state) => ({
    isAuthenticating: state.app.isAuthenticating,
    authStatus: state.app.authStatus
  }));
  const dispatch = useDispatch();

  useScrollTop();
  useDocumentTitle('Registro | Dolfino');

  useEffect(() => () => {
    dispatch(setAuthStatus(null));
    dispatch(setAuthenticating(false));
  }, []);

  const onClickSignIn = () => history.push(SIGNIN);

  const onFormSubmit = (form) => {
    dispatch(signUp({
      fullname: form.fullname.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password.trim()
    }));
  };

  return (
    <div className="auth-content">
      {authStatus?.success && (
        <div className="loader">
          <h3 className="toast-success auth-success">
            {authStatus?.message}
            <LoadingOutlined />
          </h3>
        </div>
      )}
      {!authStatus?.success && (
        <>
          {authStatus?.message && (
            <h5 className="text-center toast-error">
              {authStatus?.message}
            </h5>
          )}
          <div className={`auth ${authStatus?.message && (!authStatus?.success && 'input-error')}`}>
            <div className="auth-main">
              <h3>Registrate en Dolfino Tienda</h3>
              <Formik
                initialValues={{
                  fullname: '',
                  email: '',
                  password: ''
                }}
                validateOnChange
                validationSchema={SignInSchema}
                onSubmit={onFormSubmit}
              >
                {() => (
                  <Form>
                    <div className="auth-field">
                      <Field
                        disabled={isAuthenticating}
                        name="fullname"
                        type="text"
                        label="* Nombre completo"
                        placeholder="Juan Perez"
                        style={{ textTransform: 'capitalize' }}
                        component={CustomInput}
                      />
                    </div>
                    <div className="auth-field">
                      <Field
                        disabled={isAuthenticating}
                        name="email"
                        type="email"
                        label="* Correo electr&oacute;nico"
                        placeholder="correo@ejemplo.com"
                        component={CustomInput}
                      />
                    </div>
                    <div className="auth-field">
                      <Field
                        disabled={isAuthenticating}
                        name="password"
                        type="password"
                        label="* Contrase&ntilde;a"
                        placeholder="Tu contrase&ntilde;a"
                        component={CustomInput}
                      />
                    </div>
                    <br />
                    <div className="auth-field auth-action auth-action-signup">
                      <button
                        className="button auth-button"
                        disabled={isAuthenticating}
                        type="submit"
                      >
                        {isAuthenticating ? 'Registrando' : 'Registrarse'}
                        &nbsp;
                        {isAuthenticating ? <LoadingOutlined /> : <ArrowRightOutlined />}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="auth-divider">
              <h6>&Oacute;</h6>
            </div>
            <SocialLogin isLoading={isAuthenticating} />
          </div>
          <div className="auth-message">
            <span className="auth-info">
              <strong>&iquest;Ya tienes una cuenta?</strong>
            </span>
            <button
              className="button button-small button-border button-border-gray"
              disabled={isAuthenticating}
              onClick={onClickSignIn}
              type="button"
            >
              Iniciar sesi&oacute;n
            </button>
          </div>
        </>
      )}
    </div>
  );
};

SignUp.propTypes = {
  history: PropType.shape({
    push: PropType.func
  }).isRequired
};

export default SignUp;
