import React, { useState, useEffect } from 'react';

function Paciente() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('patientAppointments.txt');
        const data = await response.text(); // Ler o arquivo como texto
        const parsedData = JSON.parse(data); // Converter o texto para JSON
        setAppointments(parsedData);
      } catch (error) {
        console.error('Erro ao carregar as consultas:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Minhas Consultas</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id}>
            <strong>Data:</strong> {appointment.date}
            <br />
            <strong>Hora:</strong> {appointment.time}
            <br />
            <strong>Médico:</strong> {appointment.doctor}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Paciente;