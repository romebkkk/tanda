/*! Tanda v1.0.0 — organizador de ahorro rotativo en grupo (tanda / junta / cundina / susu)
 *  by DataFlow Elegance · MIT · https://github.com/romebkkk/tanda
 *  100% en el navegador. Herramienta organizativa, NO un producto financiero.
 *  El ahorro rotativo se basa en la CONFIANZA del grupo; acordad las reglas antes.
 */
(function (global) {
  "use strict";

  function _addPeriodo(fecha, i, frecuencia) {
    var d = new Date(fecha.getTime());
    if (frecuencia === "semanal") d.setDate(d.getDate() + 7 * i);
    else if (frecuencia === "quincenal") d.setDate(d.getDate() + 14 * i);
    else d.setMonth(d.getMonth() + i); // mensual
    return d;
  }

  function _fmt(d) {
    var p = function (x) { return (x < 10 ? "0" : "") + x; };
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  }

  /**
   * Genera el calendario de una tanda.
   * @param {object} cfg - { participantes:[nombres], aportacion, frecuencia, inicio(YYYY-MM-DD) }
   */
  function generarTanda(cfg) {
    cfg = cfg || {};
    var participantes = (cfg.participantes || []).filter(function (p) { return String(p).trim() !== ""; });
    var aportacion = Number(cfg.aportacion) || 0;
    var frecuencia = cfg.frecuencia || "mensual";
    var inicio = cfg.inicio ? new Date(cfg.inicio + "T00:00:00") : new Date();

    var n = participantes.length;
    if (n < 2) return { error: "Se necesitan al menos 2 participantes.", calendario: [] };

    var pote = n * aportacion;
    var calendario = [];
    for (var i = 0; i < n; i++) {
      calendario.push({
        ronda: i + 1,
        fecha: _fmt(_addPeriodo(inicio, i, frecuencia)),
        recibe: participantes[i],
        importe_recibido: pote
      });
    }

    return {
      participantes: n,
      aportacion_por_ronda: aportacion,
      pote_por_ronda: pote,
      total_aportado_por_persona: aportacion * n,
      frecuencia: frecuencia,
      calendario: calendario,
      nota: "Cada persona aporta " + aportacion + " por ronda; en su turno recibe el bote (" + pote + "). Al final, todos aportan y reciben lo mismo: la ventaja es el momento en que te toca."
    };
  }

  global.Tanda = { version: "1.0.0", generarTanda: generarTanda };
})(typeof window !== "undefined" ? window : globalThis);
