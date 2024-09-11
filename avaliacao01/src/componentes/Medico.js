import React, { useState, useEffect } from 'react';

function Medico() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch('patients.txt');
      const data = await response.json();
      setPatients(data);
    };

    fetchPatients();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Pesquisar paciente" />
      <h2>Meus Pacientes</h2>
      <ul>
        {filteredPatients.map(patient => (
          <li key={patient.id}>{patient.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Medico;