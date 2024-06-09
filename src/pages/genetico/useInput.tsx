import { Button } from "@mui/material";
import { list } from "postcss";
import React, { useState } from "react";
import * as XLSX from "xlsx";

export const useInput = () => {
  const [file, setFile] = useState(null);
  const [disciplinas, setDisciplinas] = useState([{ disciplina: '', horarios: [], codigo: '' }]);

  const handleConvert = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setDisciplinas(getDisciplinaValida(json))
      };
      reader.readAsBinaryString(file);
    }
  };

  const getDisciplinaValida = (json) =>{
    let listDisciplina = []
    json.forEach(disciplina=>{
      let listHorario = convertHorarios(disciplina.horarios)
      let aulas = getAulas(listHorario, disciplina.sala, disciplina.professor, disciplina.codigo)
      listDisciplina.push({...disciplina, horarios: listHorario, aula: aulas})
    })
    return listDisciplina;
  }
  const getAulas =(listHorario, sala, professor, codigo)=>{
    return listHorario.map(e=> ({dia: e.dia, hr: e.hr, sala: sala, professor: professor, codigo: codigo}))
  }
  const convertHorarios = (horario) => {
    const listHorario = horario.replaceAll(' ', '').split('-')
    let horariosValidos = []
    Object.values(listHorario).forEach((e: String) => {
      const dia = e[0]
      const hr = e.substring(1, 3)
      horariosValidos.push({dia: dia, hr: hr})
    })
    return horariosValidos
  }

  const Input = () => {
    return (
      <div>
        <input
          type="file"
          accept=".xls,.xlsx"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Button variant='outlined' onClick={handleConvert}>Convert</Button>
      </div>
    )
  }
  return {
    disciplinas,
    Input
  }
}

