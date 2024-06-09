import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import MATRIZ_GRADE from "../../utils/MATRIZ_GRADE";
import algoritmoGenetico from "./AG";
import { useInput } from "./useInput";

const RenderDisciplinas = ({disciplinas})=>{
    return (
        <div className="w-[40%]">
        {disciplinas.map((dis, index)=>(
            <div key={index}>
                <p className=" text-[12px]">{dis.codigo} - {dis.disciplina} -  {getStringDiaHora(dis.horarios)}</p>
            </div>
        ))}
        </div>
    )
}
const getStringDiaHora =(horarios)=> horarios.map((e)=> e.dia +""+ e.hr+"-")

const Genetico: React.FC<any> = () => {
    const {disciplinas, Input } = useInput();    
    const [grade, setGrade] = useState([])
    
    const INDEX_HORARIOS ={'M1':1, 'M2':2, 'M3':3,'M4':4, 'M5':5, 'M6':6, 'T1':7, 'T2':8, 'T3':9,'T4':10, 'T5':11, 'T6':12 }
    
    const start =()=>{
        const aulasPorPeriodo = getAulasPorDiciplinasAgrupadas(agruparDisciplinasPorPeriodo(disciplinas))
        const horarioGerados = algoritmoGenetico(aulasPorPeriodo);
        setGrade(printGrade(horarioGerados)) 
    }

    const agruparDisciplinasPorPeriodo = (dis) => Object.groupBy(dis, ({periodo}: any) => periodo)
    const getAulasPorDiciplinasAgrupadas = (disciplinaGrupoPeriodo)=> Object.values(disciplinaGrupoPeriodo).map((e: any[]) => e.map(f => f.aula))
    
    const printGrade =(horariosGerados)=>{
        let gradePopulada = MATRIZ_GRADE

        horariosGerados.forEach(element=>{
            element.forEach(aula=>{
                if(aula.dia && aula.hr)
                    gradePopulada[INDEX_HORARIOS[aula.hr]][parseInt(aula.dia)] = aula.dia+''+aula.hr +'-'+aula.codigo
            })
        })
        return gradePopulada

    }
    useEffect(()=>{
        setGrade(MATRIZ_GRADE)
    }, [grade])  
    return(
        <div>
             <Button variant='outlined' onClick={start}>START</Button>
             <Button variant='outlined' onClick={()=> {}}>MOSTRAR GRADE</Button>
        <Input />
        <div className="flex flex-row">
        <RenderDisciplinas disciplinas={disciplinas} />
       
        <div className="border w-[45%] flex flex-col">
            { 
                grade.map((e, i)=> (
                    <div key={i} className="flex flex-row ">
                    {
                        e.map((f, index)=>( <div key={index} className={` w-[140px] h-[40] border ${f===null ? 'hidden': ''}`}>{f}</div>))
                    }
                    </div> 
                )) 
            }
          
        </div>
        </div>
      </div>
    )
}

export default Genetico