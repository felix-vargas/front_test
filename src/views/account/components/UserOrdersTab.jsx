import React from 'react';

const UserOrdersTab = () => {
  const dotStyle = {
    width: '10px',
    height: '10px',
    backgroundColor: '#000',
    borderRadius: '50%',
    animation: 'moveDot 4s linear infinite', // Animation to move the dot horizontally
  };

  return (
    <div className="loader" style={{ minHeight: '80vh' }}>
      <h3>Pedido: Polera Negra XL</h3>
      <h4>Aceptado - En Bodega - Salida de bodega - Despacho - Entregado</h4>
      <div style={dotStyle}></div> {/* Moving dot */}
      {/* Keyframe animation */}
      <style>{`
        @keyframes moveDot {
          0% {
            transform: translateX(-200px);
          }
          50% {
            transform: translateX(100px); /* Adjust distance as needed */
          }
          100% {
            transform: translateX(200px);
          }
        }
      `}</style>
    </div>
  );
};

export default UserOrdersTab;
