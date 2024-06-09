import HORARIO from "./HORARIO"
const DIA = ['', '', 'SEGUNDA-FEIRA', 'TERÇA-FEIRA', 'QUARTA-FEIRA', 'QUINTA-FERIA', 'SEXTA-FERIA', 'QUARTA-FERIA']
const MATRIZ_GRADE =[
    [ null , '',                    DIA[2],     DIA[3],     DIA[4],          DIA[5],     DIA[6]  ],
    [ null , HORARIO.get('M1'),    '',          ' ' ,       ' ' ,           ' ' ,       ' '      ],    
    [ null , HORARIO.get('M2'),    ' ' ,       ' ' ,       ' ' ,            ' ' ,       ' '      ],    
    [ null , HORARIO.get('M3'),    ' ' ,       ' ' ,       ' ' ,            ' ' ,       ' '      ],    
    [ null , HORARIO.get('M4'),    ' ' ,       ' ' ,       ' ' ,            ' ' ,       ' '      ],    
    [ null , HORARIO.get('M5'),    ' ' ,       ' ' ,       ' ' ,            ' ' ,       ' '      ],    
    [ null , HORARIO.get('M6'),    ' ' ,       ' ' ,       ' ' ,            ' ' ,       ' '      ],       
    [ null , HORARIO.get('T1'),    ' ' ,       ' ' ,       ' ' ,            ' ' ,       ' '      ],    
    [ null , HORARIO.get('T2'),    ' ' ,       ' ' ,       ' ' ,            ' ' ,       ' '      ],    
    [ null , HORARIO.get('T3'),    ' ' ,       ' ' ,       ' ' ,            ' ' ,       ' '      ],    
    [ null , HORARIO.get('T4'),    ' ' ,       ' ' ,       ' ' ,            ' ' ,       ' '      ],    
    [ null , HORARIO.get('T5'),    ' ' ,       ' ' ,       ' ' ,            ' ' ,       ' '      ],    
    [ null , HORARIO.get('T6'),    ' ' ,       ' ' ,       ' ' ,            ' ' ,       ' '      ],   
    [ null , HORARIO.get('N1'),    ' ' ,       ' ' ,       ' ' ,            ' ' ,       ' '      ],    
    [ null , HORARIO.get('N2'),    ' ' ,       ' ' ,       ' ' ,            ' ' ,       ' '      ],    
    [ null , HORARIO.get('N3'),    ' ' ,       ' ' ,       ' ' ,            ' ' ,       ' '      ],    
    [ null , HORARIO.get('N4'),    ' ' ,       ' ' ,       ' ' ,            ' ' ,       ' '      ],    
    [ null , HORARIO.get('N5'),    ' ' ,       ' ' ,       ' ' ,            ' ' ,       ' '      ],    
]
export default MATRIZ_GRADE