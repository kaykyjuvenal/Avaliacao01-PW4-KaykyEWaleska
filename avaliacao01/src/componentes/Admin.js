import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import './Admin.css'; // Crie um arquivo CSS para estilos específicos

function Admin() {
  // Estado para armazenar os usuários
  const [usuarios, setUsuarios] = useState([
    { usuario: 'admin1', tipoDeAcesso: 'Administrador' },
    { usuario: 'medico1', tipoDeAcesso: 'Medico' },
    { usuario: 'paciente1', tipoDeAcesso: 'Paciente' },
  ]);

  // Função para exportar os dados dos usuários em um arquivo admin.txt
  const exportarUsuarios = () => {
    const dados = usuarios.map(u => JSON.stringify(u)).join('\n');
    const blob = new Blob([dados], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'Admin.txt'); // Salva o arquivo como Admin.txt
  };

  // Função para importar dados de um arquivo específico Admin.txt
  const importarUsuarios = (event) => {
    const file = event.target.files[0]; // Obtém o arquivo selecionado pelo usuário

    if (file) {
      if (file.name !== 'Admin.txt') {
        alert('Por favor, selecione o arquivo Admin.txt.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const conteudo = e.target.result;
        const linhas = conteudo.split('\n');
        const novosUsuarios = linhas
          .filter(linha => linha.trim() !== '') // Remove linhas vazias
          .map(linha => JSON.parse(linha)); // Converte JSON de cada linha
        setUsuarios(novosUsuarios);
      };
      reader.readAsText(file); // Lê o conteúdo do arquivo como texto
    }
  };

  return (
    <div className="admin">
      <h1>Área do Administrador</h1>
      
      <div className="export-import">
        <button onClick={exportarUsuarios}>Exportar Usuários</button>
        <input 
          type="file" 
          accept=".txt" 
          onChange={importarUsuarios} 
          id="fileInput"
        />
        <label htmlFor="fileInput">Escolha o arquivo Admin.txt</label>
      </div>

      <h2>Lista de Usuários</h2>
      <ul>
        {usuarios.map((usuario, index) => (
          <li key={index}>
            {`Usuário: ${usuario.usuario}, Tipo de Acesso: ${usuario.tipoDeAcesso}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;