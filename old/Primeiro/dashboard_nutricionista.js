// Toggle do menu lateral
$("#menu-toggle").click(function (e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});

// Inicialização do FullCalendar
$(document).ready(function () {
  $("#calendar").fullCalendar({
    // Configurações do calendário
    events: [
      // Eventos de exemplo
      {
        title: "Consulta com João",
        start: "2023-10-01T10:00:00",
        end: "2023-10-01T11:00:00",
      },
      // Outros eventos
    ],
  });
});
