export const ESTADOS_PAGO = {
  PENDIENTE: 'PENDIENTE',
  APROBADO: 'APROBADO',
  RECHAZADO: 'RECHAZADO',
}

export const METODOS_PAGO = {
  NEQUI: 'NEQUI',
  BRE_B: 'BRE_B',
  BANCOLOMBIA: 'BANCOLOMBIA',
}

export const MONEDAS = {
  COP: 'COP',
}

export const ESTADOS_COLORS = {
  [ESTADOS_PAGO.PENDIENTE]: 'warning',
  [ESTADOS_PAGO.APROBADO]: 'success',
  [ESTADOS_PAGO.RECHAZADO]: 'danger',
}

export const METODOS_COLORS = {
  [METODOS_PAGO.NEQUI]: 'info',
  [METODOS_PAGO.BRE_B]: 'primary',
  [METODOS_PAGO.BANCOLOMBIA]: 'success',
}
