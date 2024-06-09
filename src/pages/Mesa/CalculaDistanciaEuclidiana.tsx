function calcularDistanciaEuclidiana(node1, end, value) {
    const [x1, y1] = node1.split('-').map(Number);
    const [x2, y2] = end.split('-').map(Number);
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    return [Math.sqrt(deltaX * deltaX + deltaY * deltaY), value, node1];
  }


export default calcularDistanciaEuclidiana